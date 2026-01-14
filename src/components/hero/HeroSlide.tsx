import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Feature {
  icon: string
  text: string
}

interface HeroSlideProps {
  type?: 'image' | 'video'
  videoUrl?: string
  desktopBg: string
  mobileBg: string
  heading: string
  subheading: string
  buttonText: string
  buttonLink: string
  features?: Feature[] | null
}

export const HeroSlide = ({
  type = 'image',
  videoUrl,
  desktopBg,
  mobileBg,
  heading,
  subheading,
  buttonText,
  buttonLink,
  features
}: HeroSlideProps) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (type === 'video' && videoUrl) {
    return (
      <div className="relative w-full h-screen">
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <iframe
          src={`https://www.youtube.com/embed/${new URL(videoUrl).searchParams.get('v')}?autoplay=1&mute=1&controls=1&showinfo=0&rel=0&loop=0&modestbranding=1&playsinline=1&enablejsapi=1`}
          className="absolute inset-0 w-full h-full"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="eager"
          style={{ border: 'none' }}
        />
      </div>
    )
  }

  if (!heading) {
    return (
      <div className={`relative w-full  h-screen `}>
        {buttonLink ? (
          <Link href={buttonLink} className="block w-full h-full">
            <Image
              src={isMobile ? mobileBg : desktopBg}
              alt="Slide background"
              fill
              priority
              className="object-cover"
              quality={100}
            />
          </Link>
        ) : (
          <Image
            src={isMobile ? mobileBg : desktopBg}
            alt="Slide background"
            fill
            priority
            className="object-cover"
            quality={100}
          />
        )}
      </div>
    )
  }

  return (
    <div className="relative w-full h-screen">
      {/* Background Image */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 z-[1]"></div> */}

      <Image
        src={isMobile ? mobileBg : desktopBg}
        alt={heading}
        fill
        priority
        className="object-cover"
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 z-[1]">
        <div className="container mx-auto px-4 h-full flex flex-col justify-end">
          <div className="max-w-2xl">
          <p className="text-xl md:text-2xl text-white/90 mb-2 ">
              {subheading}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              {heading}
            </h1>
           
            
            <Link 
              href={buttonLink}
              className="inline-block border border-white text-white px-8 py-3 rounded-xl 
                        font-semibold hover:bg-white/90 hover:text-black transition-colors"
            >
              {buttonText}
            </Link>
            
            {/* Features */}
            {features && (
              <div className="mt-12 mb-12 flex gap-2 md:gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center"
                    role="img"
                    aria-label={feature.text}
                  >
                    <Image
                      src={feature.icon}
                      alt={feature.text}
                      width={120}
                      height={40}
                      className=""
                    />
                    <span className="sr-only">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 