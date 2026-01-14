'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BackgroundPattern } from './BackgroundPattern';

export const CatalogSection = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <section className="relative">
      <BackgroundPattern>
        {isMobile ? (
          // Mobile version
          <div className="px-4 py-8">
            <a href="/brochure/Ecolink-Fans-New-Brochure-2026.pdf" target="_blank" rel="noopener noreferrer">
              <Image
                src="/home/2026-brochure-mobile.png?V=1"
                alt="Fans Catalog - Mobile"
                width={1000}
                height={1000}
                className="w-full rounded-lg shadow-md cursor-pointer hover:opacity-90 transition-opacity"
              />
            </a>
          </div>
        ) : (
          // Desktop version
          <div className="container mx-auto px-4 py-16">
            <div className="w-full">
              <a href="/brochure/Ecolink-Fans-New-Brochure-2026.pdf" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/home/2026-brochure-desktop.jpg?V=1"
                  alt="Fans Catalog - Desktop"
                  width={1000}
                  height={1000}
                  className="w-full rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                />
              </a>
            </div>
          </div>
        )}
      </BackgroundPattern>
    </section>
  );
};