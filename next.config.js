/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  async headers() {
    return [
      {
        source: '/ar-data/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
      // Add CORS headers for GLB model files with proper MIME type
      {
        source: '/models/:path*.glb',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Content-Type',
            value: 'model/gltf-binary',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Add CORS headers for GLB model files
      {
        source: '/models/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)\\.glb', // Target all .glb files
        headers: [
          {
            key: 'Cross-Origin-Resource-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
      // Add headers for static assets to ensure proper handling
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
        has: [
          {
            type: 'header',
            key: 'accept',
            value: '(image|font|application).*',
          },
        ],
      },
    ]
  },
  // Add redirects configuration to handle old URL structure
  async redirects() {
    // Define all product slugs for redirect mapping
    const productSlugs = [
      'airoelevate', 'airoquad', 'airogeometry', 'airojewel', 'stardustbldc',
      'airojewelsmart', 'airogeometrysmart',
      'airozephyr', 'airoserenade', 'airosleek',
      'vayuprohs', 'vayuultra', 'airofreshnew'
    ];

    // Create redirect rules for old direct slug URLs (previous website structure)
    // Use the has condition to only apply to HTML pages, not to assets
    const oldSlugRedirects = productSlugs.map(slug => {
      // Determine the correct category for each product
      let category;
      if (['airojewelsmart', 'airogeometrysmart'].includes(slug)) {
        category = 'smart-fans';
      } else if (['airozephyr', 'airoserenade', 'airosleek'].includes(slug)) {
        category = 'decorative-fans';
      } else if (['vayuprohs', 'vayuultra', 'airofreshnew'].includes(slug)) {
        category = 'economy-fans';
      } else {
        category = 'ceiling-fans';
      }

      return {
        source: `/${slug}`,
        destination: `/${category}/${slug}`,
        permanent: true, // 301 redirects for SEO benefit
        has: [
          {
            type: 'header',
            key: 'accept',
            value: 'text/html.*',
          }
        ]
      };
    });

    return [
      // Old direct slug redirects (previous website structure)
      ...oldSlugRedirects,
      
      // BLDC Ceiling Fans redirects (/products/* structure)
      {
        source: '/products/airoelevate',
        destination: '/ceiling-fans/airoelevate',
        permanent: true,
      },
      {
        source: '/products/airoquad',
        destination: '/ceiling-fans/airoquad',
        permanent: true,
      },
      {
        source: '/products/airogeometry',
        destination: '/ceiling-fans/airogeometry',
        permanent: true,
      },
      {
        source: '/products/airojewel',
        destination: '/ceiling-fans/airojewel',
        permanent: true,
      },
      {
        source: '/products/stardustbldc',
        destination: '/ceiling-fans/stardustbldc',
        permanent: true,
      },
      
      // Smart Fans redirects
      {
        source: '/products/airojewelsmart',
        destination: '/smart-fans/airojewelsmart',
        permanent: true,
      },
      {
        source: '/products/airogeometrysmart',
        destination: '/smart-fans/airogeometrysmart',
        permanent: true,
      },
      
      // Decorative Fans redirects
      {
        source: '/products/airozephyr',
        destination: '/decorative-fans/airozephyr',
        permanent: true,
      },
      {
        source: '/products/airoserenade',
        destination: '/decorative-fans/airoserenade',
        permanent: true,
      },
      {
        source: '/products/airosleek',
        destination: '/decorative-fans/airosleek',
        permanent: true,
      },
      
      // Economy Fans redirects
      {
        source: '/products/vayuprohs',
        destination: '/economy-fans/vayuprohs',
        permanent: true,
      },
      {
        source: '/products/vayuultra',
        destination: '/economy-fans/vayuultra',
        permanent: true,
      },
      {
        source: '/products/airofreshnew',
        destination: '/economy-fans/airofreshnew',
        permanent: true,
      },
      
      // Generic redirect for any other /products/* URLs to home page
      {
        source: '/products/:slug*',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Add rewrites configuration to fix static asset resolution from product pages
  async rewrites() {
    return [
      // Handle static assets requested from /products/* paths
      {
        source: '/products/home/:path*',
        destination: '/home/:path*',
      },
      {
        source: '/products/images/:path*',
        destination: '/images/:path*',
      },
      {
        source: '/products/fonts/:path*',
        destination: '/fonts/:path*',
      },
      {
        source: '/products/models/:path*',
        destination: '/models/:path*',
      },
      {
        source: '/products/textures/:path*',
        destination: '/textures/:path*',
      },
      {
        source: '/products/sliders/:path*',
        destination: '/sliders/:path*',
      },
      {
        source: '/products/logo.svg',
        destination: '/logo.svg',
      },
      {
        source: '/products/faviconn.png',
        destination: '/faviconn.png',
      },
      {
        source: '/products/:path*/:file.svg',
        destination: '/:path*/:file.svg',
      },
      {
        source: '/products/:path*/:file.png',
        destination: '/:path*/:file.png',
      },
      {
        source: '/products/:path*/:file.jpg',
        destination: '/:path*/:file.jpg',
      }
    ];
  }
}

module.exports = nextConfig