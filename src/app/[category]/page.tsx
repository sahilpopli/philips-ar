"use client";

import { useState, useEffect } from "react";
import * as React from 'react';
import { Footer } from "@/components/footer/Footer";
import { ProductCard } from "@/components/fans/ProductCard";
import CategorySchema from "@/components/schema/CategorySchema";
import { 
  bldcFans, 
  smartbldcFans, 
  decorativeFans, 
  economyFansPro, 
  economyFansHS 
} from "@/lib/categoryUtils";

// Define a type for route params
type CategoryPageParams = {
  category: string;
};

export default function CategoryPage({ params }: { params: Promise<CategoryPageParams> }) {
  const [loading, setLoading] = useState(true);
  
  // Properly await the params Promise in Next.js 15
  const resolvedParams = React.use(params);
  const { category } = resolvedParams;

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Same feature arrays as home page
  const productFeatures = [
    {
      icon: "/home/icons/bldc.svg",
      text: "BLDC Technology",
    },
    {
      icon: "/home/icons/inverter.svg",
      text: "Premium Aesthetic",
    },
    {
      icon: "/home/icons/asthetics.svg",
      text: "2 Way Rotation",
    },
    {
      icon: "/home/icons/reverse.svg",
      text: "2 Way Rotation",
    },
  ];

  const decorativeproductFeatures = [
    {
      icon: "/home/icons/air-delivery.svg",
      text: "Superior Air Delivery",
    },
    {
      icon: "/home/icons/100-coppor-motor.svg",
      text: "100% Copper Motor",
    },
    {
      icon: "/home/icons/aluminium-blades.svg",
      text: "Aluminium Blades",
    },
    {
      icon: "/home/icons/double-ball-bearing.svg",
      text: "Double Ball Bearing",
    },
  ];

  const VayuProFeatures = [
    {
      icon: "/home/icons/effic-performence.svg",
      text: "Efficient Performance",
    },
    {
      icon: "/home/icons/100-coppor-motor.svg",
      text: "100% Copper Motor",
    },
    {
      icon: "/home/icons/double-ball-bearing.svg",
      text: "Double Ball Bearing",
    },
  ];

  const VayuHSFeatures = [
    {
      icon: "/home/icons/high-spped-fan.svg",
      text: "High Speed Fan",
    },
    {
      icon: "/home/icons/100-coppor-motor.svg",
      text: "100% Copper Motor",
    },
    {
      icon: "/home/icons/double-ball-bearing.svg",
      text: "Double Ball Bearing",
    },
  ];

  // Get category-specific data and heading
  const getCategoryData = (categorySlug: string) => {
    switch (categorySlug) {
      case 'ceiling-fans':
        return {
          fans: bldcFans,
          features: productFeatures,
          badgeImage: "/home/icons/badge.svg",
          heading: "Explore our BLDC Ceiling Fans"
        };
      case 'smart-fans':
        return {
          fans: smartbldcFans,
          features: productFeatures,
          badgeImage: "/home/icons/badge.svg",
          heading: "Explore our Smart Ceiling Fans"
        };
      case 'decorative-fans':
        return {
          fans: decorativeFans,
          features: decorativeproductFeatures,
          badgeImage: "/home/icons/1-star-badge.svg",
          heading: "Explore our Decorative Ceiling fans"
        };
      case 'economy-fans':
        return {
          fans: [...economyFansHS, ...economyFansPro],
          features: null, // Will handle mixed features
          badgeImage: "/home/icons/1-star-badge.svg",
          heading: "Explore our Economy Ceiling fans"
        };
      default:
        return {
          fans: [],
          features: productFeatures,
          badgeImage: "/home/icons/badge.svg",
          heading: "Ceiling Fans"
        };
    }
  };

  const categoryData = getCategoryData(category);

  if (categoryData.fans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Category Not Found</h1>
        <p className="text-gray-700 dark:text-gray-300">The category {category} does not exist.</p>
      </div>
    );
  }

  return (
    <>
      <CategorySchema category={category} />
      <main className="my-[50px]">
        {/* Category Section - Same structure as home page */}
        <section className="container mx-auto px-4 py-16" id="products">
          <h2 className="text-3xl md:text-4xl font-bold section-heading mb-8 text-center">
            {categoryData.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {category === 'economy-fans' ? (
              // Handle economy fans with mixed features
              <>
                {economyFansHS.map((fan, index) => (
                  <ProductCard
                    key={index}
                    name={fan.name}
                    features={VayuHSFeatures}
                    price={fan.price}
                    badgeImage={categoryData.badgeImage}
                    productImage={fan.image}
                    slug={fan.slug}
                    category={fan.category}
                  />
                ))}
                {economyFansPro.map((fan, index) => (
                  <ProductCard
                    key={index}
                    name={fan.name}
                    features={VayuProFeatures}
                    price={fan.price}
                    badgeImage={categoryData.badgeImage}
                    productImage={fan.image}
                    slug={fan.slug}
                    category={fan.category}
                  />
                ))}
              </>
            ) : (
              // Handle other categories with uniform features
              categoryData.fans.map((fan, index) => (
                <ProductCard
                  key={index}
                  name={fan.name}
                  features={categoryData.features}
                  price={fan.price}
                  badgeImage={categoryData.badgeImage}
                  productImage={fan.image}
                  slug={fan.slug}
                  category={fan.category}
                />
              ))
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}