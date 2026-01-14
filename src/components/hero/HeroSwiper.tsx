import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper/modules'
import { HeroSlide } from './HeroSlide'
import 'swiper/css'
import 'swiper/css/navigation'
import { useEffect, useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'

interface Feature {
  icon: string
  text: string
}

interface HeroSwiperProps {
  slides: Array<{
    type?: 'image' | 'video'
    videoUrl?: string
    desktopBg: string
    mobileBg: string
    heading: string
    subheading: string
    buttonText: string
    buttonLink: string
    features?: Feature[] | null
  }>
}

export const HeroSwiper = ({ slides }: HeroSwiperProps) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    if (swiperRef.current && slides[currentSlide]?.type === 'video') {
      const timer = setTimeout(() => {
        swiperRef.current?.slideNext()
      }, 8000)
      
      return () => clearTimeout(timer)
    }
  }, [currentSlide, slides])

  return (
    <div className="relative">
      <Swiper
        modules={[EffectFade,Navigation]}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex)
        }}
        className="relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <HeroSlide {...slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button className="swiper-button-prev absolute left-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors">
       
      </button>
      <button className="swiper-button-next absolute right-4 top-1/2 z-10 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-colors">
        
      </button>
    </div>
  )
} 