"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useRouter } from 'next/navigation';

export default function SimpleAR() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cameraPermissionGranted, setCameraPermissionGranted] = useState(false);
  const [showPermissionPrompt, setShowPermissionPrompt] = useState(true);
  const [arSupported, setArSupported] = useState(false);
  const [arActive, setArActive] = useState(false);
  const cameraInitialized = useRef(false); // Track if camera has been initialized
  
  // Store scene elements in refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Group | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const requestRef = useRef<number | null>(null);

  // Check if WebXR is supported
  useEffect(() => {
    console.log('🔍 Checking WebXR support...');
    if (navigator.xr) {
      console.log('✅ navigator.xr is available');
      navigator.xr.isSessionSupported('immersive-ar')
        .then(supported => {
          setArSupported(supported);
          console.log('🔍 AR supported:', supported ? '✅ Yes' : '❌ No');
        })
        .catch(err => {
          console.error('❌ Error checking AR support:', err);
          setArSupported(false);
        });
    } else {
      console.log('❌ WebXR not supported in this browser');
      setArSupported(false);
    }
  }, []);

  // Function to create XR compatible WebGL context
  const createXRCompatibleWebGLContext = (canvas: HTMLCanvasElement) => {
    console.log('🔍 Creating XR-compatible WebGL context...');
    let context = null;
    
    // Try WebGL2 first
    try {
      console.log('🔍 Attempting WebGL2 context with xrCompatible:true');
      context = canvas.getContext('webgl2', { 
        alpha: true, 
        antialias: true,
        xrCompatible: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false,
        powerPreference: 'default'
      });
      if (context) {
        console.log('✅ WebGL2 context created successfully with xrCompatible flag');
        return context;
      }
    } catch (e) {
      console.warn('⚠️ WebGL2 not available:', e);
    }
    
    // Fall back to WebGL1
    try {
      console.log('🔍 Falling back to WebGL1 context with xrCompatible:true');
      context = canvas.getContext('webgl', { 
        alpha: true, 
        antialias: true,
        xrCompatible: true,
        premultipliedAlpha: true,
        preserveDrawingBuffer: false 
      });
      if (context) {
        console.log('✅ WebGL1 context created successfully with xrCompatible flag');
        return context;
      }
    } catch (e) {
      console.error('❌ WebGL not available:', e);
    }
    
    console.error('❌ Failed to create any WebGL context');
    return null;
  };

  // AR Session Start Function
  const startARSession = async () => {
    console.log('🔍 Starting AR session...');
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) {
      console.error('❌ Renderer, scene, or camera not initialized');
      setError('Unable to start AR: scene not initialized');
      return;
    }
    
    if (!arSupported) {
      console.error('❌ AR is not supported on this device');
      setError('AR is not supported on this device');
      return;
    }
    
    try {
      // Try different reference spaces if one fails
      const referenceSpaceTypes = ['local', 'local-floor', 'viewer', 'unbounded'];
      console.log('🔍 Available reference space types to try:', referenceSpaceTypes);
      
      // Make sure XR is enabled on the renderer
      console.log('🔍 Enabling XR on renderer', !!rendererRef.current?.xr);
      rendererRef.current.xr.enabled = true;
      
      // Request AR session with minimal features for compatibility
      console.log('🔍 Requesting AR session with empty optionalFeatures for maximum compatibility');
      const session = await navigator.xr.requestSession('immersive-ar', {
        optionalFeatures: []
      });
      console.log('✅ AR session created successfully:', session);
      
      // Set session
      console.log('🔍 Setting XR session on renderer');
      await rendererRef.current.xr.setSession(session);
      console.log('✅ XR session set on renderer');
      setArActive(true);
      
      // Try different reference spaces
      let referenceSpaceFound = false;
      for (const spaceType of referenceSpaceTypes) {
        try {
          console.log(`🔍 Trying reference space: ${spaceType}`);
          const referenceSpace = await session.requestReferenceSpace(spaceType as XRReferenceSpaceType);
          rendererRef.current.xr.setReferenceSpace(referenceSpace);
          console.log(`✅ Using reference space: ${spaceType}`);
          referenceSpaceFound = true;
          break;
        } catch (e) {
          console.warn(`⚠️ Failed to get reference space ${spaceType}:`, e);
          // Continue trying other space types
        }
      }
      
      if (!referenceSpaceFound) {
        console.error('❌ No compatible reference space found');
        setError('Failed to find a compatible AR reference space');
      }
      
      // Setup session end handling
      session.addEventListener('end', () => {
        setArActive(false);
        console.log('🔍 AR session ended');
      });
      
    } catch (error) {
      console.error('❌ Failed to start AR session:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('Error details:', errorMessage);
      setError(`Failed to start AR session: ${errorMessage}`);
    }
  };

  // Initialize camera stream and scene setup with useCallback
  const startCamera = useCallback(async () => {
    console.log('🔍 Starting camera and initializing scene...');
    
    // Prevent multiple initialization attempts
    if (cameraInitialized.current) {
      console.log('⚠️ Camera already initialized, skipping');
      return;
    }
    
    // First check if the ref is available
    if (!videoRef.current) {
      console.log('⚠️ Video ref not yet available, retrying in 500ms');
      setTimeout(() => startCamera(), 500);
      return;
    }
    
    try {
      setError(null);
      setShowPermissionPrompt(false);
      
      console.log('🔍 Requesting camera access...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      console.log('✅ Camera access granted');
      
      // Double check ref is still available before setting srcObject
      if (!videoRef.current) {
        console.error('❌ Video element disappeared after getting camera stream');
        setError('Video element not available. Please reload the page.');
        setShowPermissionPrompt(true);
        return;
      }
      
      videoRef.current.srcObject = stream;
      videoRef.current.play().catch(err => {
        console.error('❌ Error playing video:', err);
      });
      
      // Mark as initialized to prevent duplicate initialization
      cameraInitialized.current = true;
      setCameraPermissionGranted(true);
      console.log('✅ Camera started successfully');
      
      // Add a small delay before initializing 3D scene to ensure video element is stable
      setTimeout(() => {
        initializeScene();
      }, 500);
      
    } catch (err) {
      console.error('❌ Error accessing camera:', err);
      console.error('Error details:', err instanceof Error ? err.message : 'Unknown error');
      setError(err instanceof Error ? err.message : 'Failed to access camera');
      setShowPermissionPrompt(true);
    }
  }, []);
  
  // Separate scene initialization to make the code more maintainable
  const initializeScene = useCallback(() => {
    console.log('🔍 Initializing 3D scene after camera setup...');
    
    // Initialize the 3D scene now that we have camera permission
    if (containerRef.current && canvasRef.current) {
      setIsLoading(true);
      setError(null);
      
      console.log('🔍 Setting up 3D scene...');
      // Setup scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;
      console.log('✅ Scene created');
      
      // Setup camera - position it further away to see the entire model
      const aspectRatio = containerRef.current.clientWidth / containerRef.current.clientHeight;
      const camera = new THREE.PerspectiveCamera(45, aspectRatio, 0.1, 1000);
      camera.position.set(0, 0, 25); // Increased distance from 20 to 25 to zoom out more
      cameraRef.current = camera;
      console.log('✅ Camera created with position:', camera.position);
      
      // Create XR-compatible context and initialize renderer with it
      console.log('🔍 Creating WebGL context...');
      const glContext = createXRCompatibleWebGLContext(canvasRef.current);
      
      if (!glContext) {
        console.error('❌ Failed to create WebGL context');
        setError('Failed to create WebGL context');
        return;
      }
      console.log('✅ WebGL context created:', glContext);
      
      // Setup renderer with the XR-compatible context
      console.log('🔍 Creating renderer with XR-compatible context...');
      const renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current,
        context: glContext,
        alpha: true, // Transparent background
        antialias: true
      });
      
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      
      // Enable XR
      console.log('🔍 Enabling XR capabilities on renderer');
      renderer.xr.enabled = true;
      rendererRef.current = renderer;
      console.log('✅ Renderer created with XR enabled');
      
      // Add lights
      console.log('🔍 Setting up lights...');
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      console.log('✅ Lights added to scene');
      
      // Add OrbitControls with restricted rotation
      console.log('🔍 Setting up orbit controls...');
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.autoRotate = false; // Disable auto-rotation for this model
      
      // Set the target to the center of the model to ensure proper rotation axis
      controls.target.set(0, 0, 0);
      
      // Allow vertical rotation but restrict horizontal rotation
      controls.enableRotate = true;
      
      // Lock horizontal rotation - remove these if they're causing issues
      controls.minAzimuthAngle = 0; // Lock to front view
      controls.maxAzimuthAngle = 0; // Lock to front view
      
      // Strict zoom limits (95% to 105% of default view)
      controls.minDistance = 24; // 95% of default distance (25)
      controls.maxDistance = 26; // 105% of default distance (25)
      
      controls.minPolarAngle = Math.PI / 4; // 45 degrees from top
      controls.maxPolarAngle = Math.PI * 3/4; // 45 degrees from bottom
      
      // Disable panning to prevent user from moving the model
      controls.enablePan = false;
      
      controlsRef.current = controls;
      console.log('✅ Orbit controls configured');
      
      // Load model with simplified approach matching working AR viewer
      const loader = new GLTFLoader();
      
      // Simple direct path without environment checks or fallbacks
      const modelPath = '/models/resend-airo-quad.glb';
      console.log('🔍 Loading model from path:', modelPath);
      
      loader.load(
        modelPath,
        (gltf) => {
          try {
            console.log('✅ Model loaded successfully, processing...');
            const model = gltf.scene;
            
            // Traverse all materials to ensure they're properly processed
            console.log('🔍 Processing model materials...');
            model.traverse((object) => {
              if ((object as THREE.Mesh).isMesh) {
                const mesh = object as THREE.Mesh;
                if (mesh.material) {
                  // Make sure materials use correct color space
                  const material = mesh.material as THREE.MeshStandardMaterial;
                  if (material.map) material.map.colorSpace = THREE.SRGBColorSpace;
                  if (material.normalMap) material.normalMap.colorSpace = THREE.NoColorSpace;
                }
              }
            });
            console.log('✅ Materials processed');
            
            // Scale model
            console.log('🔍 Scaling model...');
            model.scale.set(0.01, 0.01, 0.01);
            console.log('✅ Model scaled:', model.scale);
            
            // Center model
            console.log('🔍 Centering model...');
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            console.log('   Model bounds:', box.min, box.max);
            console.log('   Model center:', center);
            
            // Instead of moving the model, set the orbital controls target to the center
            controls.target.set(center.x, center.y, center.z);
            console.log('✅ Orbit controls target set to model center');
            
            // Keep the position adjustment for height only
            console.log('🔍 Adjusting model position...');
            model.position.y = 4; // Move model up by 4 units
            console.log('✅ Model position set:', model.position);
            
            // Add model to scene
            console.log('🔍 Adding model to scene...');
            scene.add(model);
            modelRef.current = model;
            console.log('✅ Model added to scene');
            
            setIsLoading(false);
            console.log('✅ Model successfully loaded and set up');
          } catch (err) {
            console.error('❌ Error processing loaded model:', err);
            console.error('Error details:', err instanceof Error ? err.message : 'Unknown error');
            // Log model path to verify it's correct
            console.error('Failed model path:', modelPath);
            setError(`Error processing 3D model: ${err instanceof Error ? err.message : 'Unknown error'}`);
            setIsLoading(false);
          }
        },
        (xhr) => {
          // Progress callback
          const percentComplete = xhr.loaded / xhr.total * 100;
          console.log(`📊 Model loading: ${Math.round(percentComplete)}%`);
        },
        (err) => {
          // Error callback with simplified handling
          console.error('❌ Error loading model:', err);
          console.error('Error details:', err instanceof Error ? err.message : 'Unknown error');
          // Log model path to verify it's correct
          console.error('Failed model path:', modelPath);
          setError(`Failed to load 3D model: ${err instanceof Error ? err.message : 'Unknown error'}`);
          setIsLoading(false);
        }
      );
      
      // Animation loop - using requestAnimationFrame for better cleanup
      const animate = () => {
        if (controlsRef.current) {
          controlsRef.current.update();
        }
        
        if (!rendererRef.current?.xr.isPresenting && sceneRef.current && cameraRef.current && rendererRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        
        requestRef.current = requestAnimationFrame(animate);
      };
      
      // Start animation loop
      console.log('🔍 Starting animation loop');
      requestRef.current = requestAnimationFrame(animate);
      console.log('✅ Animation loop started');
      
      // Handle resize
      const handleResize = () => {
        if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
        
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        
        rendererRef.current.setSize(width, height);
        console.log('📱 Window resized, renderer and camera updated');
      };
      
      window.addEventListener('resize', handleResize);
      console.log('✅ Resize handler configured');
      
      // Set up cleanup for resize listener
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  // Stop camera stream and redirect to /quad
  const stopCamera = () => {
    console.log('🔍 Stopping camera and cleaning up...');
    if (!videoRef.current || !videoRef.current.srcObject) {
      console.log('⚠️ No video stream to stop');
      return;
    }
    
    const stream = videoRef.current.srcObject as MediaStream;
    const tracks = stream.getTracks();
    
    tracks.forEach(track => track.stop());
    videoRef.current.srcObject = null;
    cameraInitialized.current = false; // Reset initialization flag
    console.log('✅ Camera stopped');
    
    // End AR session if active
    if (rendererRef.current?.xr.isPresenting) {
      console.log('🔍 Ending active XR session');
      rendererRef.current.xr.getSession()?.end().catch(err => {
        console.error('❌ Error ending XR session:', err);
      });
    }
    
    // Redirect to /quad
    console.log('🔍 Redirecting to /quad');
    router.push('/quad');
  };
  
  // Auto-start camera when component mounts
  useEffect(() => {
    console.log('🔍 Component mounted, starting camera');
    
    // Only start camera if not already initialized
    if (!cameraInitialized.current) {
      startCamera();
    } else {
      console.log('⚠️ Camera already initialized, skipping startCamera');
    }
    
    // Clean up on unmount
    return () => {
      console.log('🔍 Component unmounting, cleaning up resources');
      // Save a reference to the current video element and stream
      const currentVideo = videoRef.current;
      const currentStream = currentVideo?.srcObject as MediaStream | null;
      
      // Clean up stream if it exists
      if (currentStream) {
        console.log('🔍 Stopping camera tracks');
        const tracks = currentStream.getTracks();
        tracks.forEach(track => track.stop());
        console.log('✅ Camera tracks stopped');
      }
      
      // End AR session if active
      if (rendererRef.current?.xr.isPresenting) {
        console.log('🔍 Ending active XR session during cleanup');
        rendererRef.current.xr.getSession()?.end().catch(err => {
          console.error('❌ Error ending XR session during cleanup:', err);
        });
      }
      
      if (requestRef.current !== null) {
        console.log('🔍 Canceling animation frame');
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
        console.log('✅ Animation frame canceled');
      }
      
      if (rendererRef.current) {
        console.log('🔍 Disposing renderer');
        rendererRef.current.dispose();
        console.log('✅ Renderer disposed');
      }
      
      if (controlsRef.current) {
        console.log('🔍 Disposing controls');
        controlsRef.current.dispose();
        console.log('✅ Controls disposed');
      }
      
      // Reset initialization flag on unmount
      cameraInitialized.current = false;
      
      console.log('✅ Cleanup complete');
    };
  }, [startCamera]); // Add startCamera as a dependency

  return (
    <div className="h-screen w-full bg-black">
      {/* Add Cross-Origin headers for better WebGL support */}
      
      
      <div 
        ref={containerRef} 
        className="relative w-full h-full"
      >
        {/* Camera Video Feed (background) */}
        <video
          ref={videoRef}
          className="absolute inset-0 object-cover w-full h-full mt-[-75px]"
          autoPlay
          playsInline
          muted
        />
        
        {/* WebGL Canvas (Overlay) - Only show when camera permission granted */}
        {cameraPermissionGranted && (
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 w-full h-full z-10"
          />
        )}
        
        {/* Permission Prompt */}
        {showPermissionPrompt && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-30">
            <div className="bg-white rounded-lg p-6 max-w-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Camera Access Required</h3>
              <p className="text-gray-600 mb-4">
                To experience AR view, we need access to your camera. 
                The 3D model will be displayed once camera access is granted.
              </p>
              <button
                onClick={startCamera}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
              >
                Grant Camera Access
              </button>
              <button
                onClick={() => router.push('/quad')}
                className="mt-3 px-6 py-2 text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        
        {/* Loading Indicator - Only show when camera permission granted */}
        {cameraPermissionGranted && isLoading && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}
        
        {/* Error Display */}
        {error && (
          <div className="absolute top-4 left-4 bg-red-500/90 text-white px-4 py-2 rounded-md z-30 max-w-xs">
            {error}
          </div>
        )}
        
        {/* AR Button - Only show when camera is active and AR is supported */}
        {cameraPermissionGranted && arSupported && !arActive && !isLoading && (
          <div className="fixed bottom-24 left-0 right-0  justify-center z-50 hidden">
            <button
              onClick={startARSession}
              className="px-8 py-4 rounded-full font-bold text-lg shadow-lg bg-blue-500 hover:bg-blue-600 text-white"
            >
              START AR
            </button>
          </div>
        )}
        
        {/* Camera Button - Only show when camera is active */}
        {cameraPermissionGranted && (
          <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50">
            <button
              onClick={stopCamera}
              className="px-8 py-4 rounded-full font-bold text-lg shadow-lg bg-red-500 hover:bg-red-600 text-white"
            >
              EXIT AR VIEW
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 