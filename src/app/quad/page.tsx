'use client'

import dynamic from 'next/dynamic';

const ARViewer = dynamic(() => import('@/components/ARViewer'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
  </div>
})



export default function AlternatePage() {


  return (
    <main className="h-screen w-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/ar-bg.jpg)' }}>
      <div className="container mx-auto">
        <div className="h-[600px] w-full">
          <ARViewer modelPath="/models/resend-airo-quad.glb" />
        </div>

       
      </div>
    </main>
  )
} 