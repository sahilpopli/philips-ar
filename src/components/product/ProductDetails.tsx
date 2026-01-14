'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface ColorOption {
  label: string;
  value: string;
}

interface SizeOption {
  label: string;
  value: string;
}

interface ProductDetailsProps {
  name: string;
  slug: string;
  regularPrice: number;
  colorOptions: ColorOption[];
  sizeOptions: SizeOption[];
  amazonLink?: string;
  onColorChange?: (colorValue: string) => void;
}

export const ProductDetails = ({
  name,
  slug,
  regularPrice,
  colorOptions,
  sizeOptions,
  amazonLink,
  onColorChange,
}: ProductDetailsProps) => {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]?.value || '');
  const [selectedSize, setSelectedSize] = useState(sizeOptions[0]?.value || '');

  const handleColorSelect = (colorValue: string) => {
    setSelectedColor(colorValue);
    // Notify parent component about color change if callback is provided
    if (onColorChange) {
      onColorChange(colorValue);
    }
  };

  return (
    <div className="px-4 py-4">
      {/* Product Details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-xl md:text-5xl font-medium dark:text-white text-[#3A3A5B] mb-4">
            {name}
          </h1>
        
        </div>

        {/* Price, Color, Size in one row */}
        <div className="flex flex-col  md:items-start md:justify-between mt-8 gap-8">
          {/* Pricing */}
          <div className="md:w-1/3">
            <span className="text-lg dark:text-neutral-400 text-gray-500 block mb-1">
              MRP
            </span>
            <span className="text-xl md:text-3xl font-medium text-[#427437] dark:text-white">
              ₹{regularPrice.toLocaleString('en-IN', {
                maximumFractionDigits: 0,
              })}
            </span>
          </div>

          {/* Color Selection */}
          <div className="md:w-1/2">
            <h3 className="dark:text-white text-[#3A3A5B]  text-lg mb-3">Color</h3>
            <div className="flex gap-4">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleColorSelect(color.value)}
                  className={` rounded-[4px]  p-2 ${
                    selectedColor === color.value
                      ? `ring-2 ring-[#582C83] shadow-md`
                      : "border border-gray-300"
                  }`}
                  aria-label={`Select ${color.label} color`}
                >
                  <div 
                    className="w-8 h-8 rounded-full hidden" 
                    style={{ backgroundColor: color.value }}
                  />
                  <span className="text-xs">{color.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {slug.includes('airojewelsmart') && slug.includes('airogeometrysmart') && (
            <div className="md:w-1/3 ">
              <h3 className="dark:text-white text-[#3A3A5B] text-lg mb-3">Size</h3>
              <div className="flex gap-4">
                {sizeOptions.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => setSelectedSize(size.value)}
                    className={`px-4 py-2 rounded-full text-base ${
                      selectedSize === size.value
                        ? "border border-[#582C83] bg-white text-[#3A3A5B]"
                        : "border border-gray-200 dark:border-[#DBDBDB]/10 dark:text-white text-[#3A3A5B]"
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Warranty Section */}
        {!slug.includes('airozephyr') && !slug.includes('airoserenade') && !slug.includes('airosleek') && !slug.includes('stardust') && !slug.includes('vayuultra') && !slug.includes('vayuprohs') && (

        <div className="mt-8 dark:border-gray-700 w-auto inline-block rounded-lg ">
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="relative">
               
                <Image
                  src="/home/icons/warrenty.svg"
                  alt="Extended Warranty"
                  width={300}
                  height={52}
                />
              </div>
            </div>
            {/* <div className="ml-4">
              <p className="text-base font-medium dark:text-white text-[#3A3A5B] uppercase tracking-wide">
                GET 3+2 YEAR*<br />
                EXTENDED WARRANTY
              </p>
            </div> */}
          </div>
        </div>

            )}

        {/* Buy Buttons */}
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 lg:mt-16">
          {/* Amazon Button - Only show if amazonLink exists */}
          {amazonLink && (
            <Link 
              href={amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (typeof window !== 'undefined' && window.gtag) {
                  window.gtag('event', 'conversion', {
                    'send_to': 'AW-17871754184/S7dOCKvN3eIbEMin9clC',
                    'value': 1.0,
                    'currency': 'INR'
                  });
                }
              }}
              className="w-full bg-[#582C83] text-white py-4 text-center rounded-lg flex items-center justify-center gap-2 hover:bg-[#4A2570] transition-colors"
            >
              <Image
                src="/home/buy-on-amazon.svg"
                alt="Amazon"
                width={250}
                height={27}
              />
            </Link>
          )}
          
          {/* Store Button */}
          <Link 
            href="/store-locator" 
            onClick={() => {
              if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'conversion', {
                  'send_to': 'AW-17871754184/S7dOCKvN3eIbEMin9clC',
                  'value': 1.0,
                  'currency': 'INR'
                });
              }
            }}
            className={`w-full border-2 border-[#582C83] dark:text-white text-[#582C83] py-4 text-center rounded-lg flex items-center justify-center gap-2 hover:bg-[#582C83]/5 transition-colors ${!amazonLink ? 'md:w-1/2 ' : ''}`}
          >
            <span className="text-lg font-medium">BUY FROM STORE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}; 