'use client';

import Image from 'next/image';
import { FC } from 'react';
import { motion } from 'framer-motion';

export interface ProductFeatureCardProps {
  imageSrc: string;
  title: string;
  description: string;
  className?: string;
  imageWidth?: number;
  imageHeight?: number;
  priority?: boolean;
  darkBgClass?: string;
  lightBgClass?: string;
}

export const ProductFeatureCard: FC<ProductFeatureCardProps> = ({
  imageSrc,
  title,
  description,
  className = '',
  imageWidth = 400,
  imageHeight = 400,
  priority = false,
  darkBgClass = 'dark:bg-radial-black',
  lightBgClass = 'bg-radial-purple',
}) => {
  return (
    <motion.div 
      className={`rounded-2xl overflow-hidden aspect-square md:aspect-auto shadow-lg ${className} ${lightBgClass} ${darkBgClass}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center p-6 md:p-10 text-center h-full">
        <div className="relative mb-4 flex-1 md:mb-8 lg:p-4 flex items-center justify-center">
          <Image
            src={imageSrc}
            alt={title}
            width={imageWidth}
            height={imageHeight}
            priority={priority}
            className="object-contain lg:w-[450px] lg:h-[250px] xs:w-[250px] xs:h-[150px] scale-110 lg:scale-150 lg:p-4"
            quality={100}
          />
        </div>
        <h3 className="sm:text-xl xs:text-lg md:text-2xl lg:text-3xl font-bold mb-2 text-white dark:text-white">{title}</h3>
        <p className="text-sm md:text-lg text-white dark:text-white/80">{description}</p>
      </div> 
    </motion.div>
  );
};
