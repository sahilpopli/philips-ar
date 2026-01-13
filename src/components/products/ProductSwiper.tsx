'use client'

import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { useState, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Product } from '@/lib/products'

// Interface for slider images
interface SliderImages {
  [key: string]: string[]
  default?: string[]
}

// Extend the Product type to include optional sliderImages
interface ProductWithSliderImages extends Product {
  sliderImages?: SliderImages
}

interface ProductSwiperProps {
  images: string[] // Fallback images
  slug: string
  selectedColor: string
  productData?: Product // Product data from products.json
}

export const ProductSwiper = ({ images, slug, selectedColor, productData }: ProductSwiperProps) => {
  const [sliderImages, setSliderImages] = useState<string[]>(images)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load slider images based on product data and selected color
    const loadSliderImages = () => {
      if (!productData) {
        // If no product data provided, use fallback images
        setSliderImages(images)
        setLoading(false)
        return
      }

      // Check if product has hardcoded slider images
      if ('sliderImages' in productData) {
        const productWithSliderImages = productData as ProductWithSliderImages
        const sliderImagesData = productWithSliderImages.sliderImages
        
        // If product has color-specific slider images
        if (selectedColor && sliderImagesData && sliderImagesData[selectedColor]) {
          console.log(`Loading hardcoded slider images for color: ${selectedColor}`)
          setSliderImages(sliderImagesData[selectedColor])
          setLoading(false)
        }
        // Otherwise use default slider images if available
        else if (sliderImagesData && sliderImagesData.default) {
          console.log('Loading hardcoded default slider images')
          setSliderImages(sliderImagesData.default)
          setLoading(false)
        }
        // Fall back to gallery images
        else {
          console.log('No hardcoded slider images found, using fallback')
          setSliderImages(images)
          setLoading(false)
        }
      } 
      // If no slider images defined, use fallback
      else {
        console.log('No slider images defined, using fallback')
        setSliderImages(images)
        setLoading(false)
      }
    }
    
    loadSliderImages()
  }, [slug, selectedColor, images, productData])

  if (loading) {
    return (
      <div className="animate-pulse h-[360px] lg:h-[550px] w-full bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
    )
  }

  return (
    <div className="product-swiper">
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        className="md:rounded-lg overflow-hidden"
      >
        {sliderImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative min-h-[360px] h-full aspect-square  lg:min-h-[550px] w-full">
              <Image
                src={image}
                alt={`Product image ${index + 1}`}
                quality={100}
                fill
                className="object-contain w-full aspect-square"
                onError={(e) => {
                  // If an image fails to load, hide it
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
} 