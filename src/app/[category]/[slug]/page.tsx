"use client";

import { useState, useEffect } from "react";
import * as React from 'react';
import { ProductSwiper } from "@/components/products/ProductSwiper";
import { Footer } from "@/components/footer/Footer";
import Link from "next/link";
import { ProductDetails } from "@/components/product/ProductDetails";
import { ProductFeatureCard } from "@/components/product/ProductFeatureCard";
import { ProductVideoCard } from "@/components/product/ProductVideoCard";
import { ProductEnergyCard } from "@/components/product/ProductEnergyCard";
import { ProductSeasonCard } from "@/components/product/ProductSeasonCard";
import { ProductRemoteCard } from "@/components/product/ProductRemoteCard";
import { ProductLEDCard } from "@/components/product/ProductLEDCard";
import { ProductAluminumBladeCard } from "@/components/product/ProductAluminumBladeCard";
import { ProductAirDeliveryCard } from "@/components/product/ProductAirDeliveryCard";
import { ProductRobustMotorCard } from "@/components/product/ProductRobustMotorCard";
import { ProductDoubleBearingCard } from "@/components/product/ProductDoubleBearingCard";
import { YouTubeVideoCard } from '@/components/product/YouTubeVideoCard';
import { ProductPremiumAestheticsCard } from "@/components/product/ProductPremiumAestheticsCard";
import productsData, { Product } from "@/lib/products";
import { DigiShieldSection } from "@/components/DigiShieldSection";
import { ARViewSection } from "@/components/ARViewSection";
import ProductSchema from "@/components/schema/ProductSchema";

// Map of product slugs to their Amazon links
const amazonLinks: { [key: string]: string } = {
  airogeometry: "https://www.amazon.in/dp/B0D7D1G6MG?th=1",
  airojewel: "https://www.amazon.in/dp/B0D7D127ZV?th=1",
  airoserenade: "https://www.amazon.in/dp/B0D7CWN7W4",
  airosleek: "https://www.amazon.in/dp/B0D7CYXX9C?th=1",
  airozephyr: "https://www.amazon.in/dp/B0D7CZP5Y8?th=1"
};

// Map of product slugs to their dimensions
const productDimensions: { [key: string]: string } = {
  airoquad: "574mm X 260mm X 264mm (Length X Width X Height)",
  airoelevate: "652mm X 238mm X 258mm (Length X Width X Height)",
  airojewel: "578mm X 270mm X 295mm (Length X Width X Height)",
  airogeometry: "578mm X 270mm X 295mm (Length X Width X Height)",
  vayuultra: "258mm X 200mm X 285mm (Length X Width X Height)",
  vayuprohs: "260mm X 210mm X 165mm (Length X Width X Height)",
  airofreshnew: "267mm X 212mm X 160mm (Length X Width X Height)"
};

// Category mapping - now more flexible to handle the actual data structure
const isProductInCategory = (product: Product, categorySlug: string): boolean => {
  // Check by product type field first (more reliable)
  const productType = product.specifications?.type?.toLowerCase() || '';
  
  switch (categorySlug) {
    case 'ceiling-fans':
      return productType.includes('bldc ceiling fan') && 
             !productType.includes('smart') && 
             !productType.includes('decorative');
    
    case 'smart-fans':
      return productType.includes('smart') || 
             product.categories.includes('smart') ||
             product.slug.includes('smart');
    
    case 'decorative-fans':
      return productType.includes('decorative') || 
             product.fullName.toLowerCase().includes('decorative');
    
    case 'economy-fans':
      return productType.includes('economy') || 
             product.fullName.toLowerCase().includes('vayupro') ||
             product.fullName.toLowerCase().includes('vayuultra') ||
             product.fullName.toLowerCase().includes('airofresh');
    
    default:
      return false;
  }
};

// Define a type for route params
type ProductPageParams = {
  category: string;
  slug: string;
};

export default function ProductPage({ params }: { params: Promise<ProductPageParams> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  
  // Properly await the params Promise in Next.js 15
  const resolvedParams = React.use(params);
  const { category, slug } = resolvedParams;

  useEffect(() => {
    try {
      // Find the product that matches the slug
      const foundProduct = productsData.products.find(p => p.slug === slug);
      
      if (foundProduct) {
        // Validate that the product belongs to the correct category using the new function
        if (isProductInCategory(foundProduct, category)) {
          // Update dimensions if available
          if (productDimensions[slug]) {
            foundProduct.specifications.dimensions = productDimensions[slug];
          }
          setProduct(foundProduct);
          // Set the default selected color to the first color option
          if (foundProduct.colors && foundProduct.colors.length > 0) {
            setSelectedColor(foundProduct.colors[0].name);
          }
        } else {
          setError(`Product "${slug}" not found in category "${category}"`);
        }
      } else {
        setError(`Product with slug "${slug}" not found`);
      }
    } catch (err) {
      setError("Error loading product data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [category, slug]);

  // Handle color selection change
  const handleColorChange = (colorValue: string) => {
    if (product) {
      const newSelectedColor = product.colors.find(c => c.primary === colorValue)?.name || "";
      setSelectedColor(newSelectedColor);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold text-red-500 mb-4">Error</h1>
        <p className="text-gray-700 dark:text-gray-300">{error || "Product not found"}</p>
        <Link href="/" className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Back to Home
        </Link>
      </div>
    );
  }

  // Transform color options for the product details component
  const colorOptions = product.colors.map(color => ({
    label: color.name,
    value: color.primary
  }));

  return (
    <>
      <ProductSchema
        slug={slug}
        category={category}
        productName={product.fullName}
        price={product.price}
        description={product.description}
        imageUrl={`https://fans.ecolinklighting.in${product.images.main}`}
        starRating={product.starRating}
        brand={product.specifications.brand}
      />
      <main className="min-h-screen py-2 lg:py-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {/* Product Images */}
            <div>
              <ProductSwiper 
                images={product.images.gallery} 
                slug={slug}
                selectedColor={selectedColor}
                productData={product}
              />
            </div>

            {/* Product Details */}
            <ProductDetails
              name={product.fullName}
              slug={slug}
              regularPrice={product.price}
              colorOptions={colorOptions}
              sizeOptions={product.sizes}
              amazonLink={amazonLinks[slug]}
              onColorChange={handleColorChange}
            />
          </div>
        </div>

        <div className="container mx-auto px-4 py-10">

        {product.keyFeature &&
          <ProductFeatureCard
            imageSrc={slug === 'airoelevate' ? '/home/UNIQUE-HOLLOW-HUB.png?v=3' : product.images.main}
            title={product.keyFeature}
            description={product.description}
            imageWidth={250}
            imageHeight={250}
            className="md:min-h-[300px] mb-4"
            darkBgClass="dark:bg-gradient-to-b dark:from-[#6E4427] dark:to-[#2B1D12]"
            lightBgClass="bg-radial-purple"
          />
        }

          {/* Featured Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10">
           
          {product.energyEfficiency.icon && product.energyEfficiency.title &&
            <ProductEnergyCard
              imageSrc={product.images.main}
              iconSrc={product.energyEfficiency.icon}
              title={product.energyEfficiency.title}
              description={`${product.fullName}, features a powerful BLDC motor, maximizing energy savings and cooling performance.`}
              badgeText={`RUNS 3X LONGER`}
              className="h-full"
              priority={true}
            />}

          {product.aesthetics.title && 
            <ProductVideoCard
              bgImageSrc={product.images.main}
              videoSrc={product.videos.promotional}
              title={product.aesthetics.title}
              description={product.aesthetics.description}
              className="max-w-3xl mx-auto"
              priority={true}
            />
          }
          
          {product.ledFeature && product.ledFeature.title && 
            <ProductLEDCard
              title={product.ledFeature.title}
              description={product.ledFeature.description}
              imageSrc={product.ledFeature.image}
              className="h-full"
              priority={true}
            />
          }

          {product.aluminumBladeFeature && product.aluminumBladeFeature.title && 
            <ProductAluminumBladeCard
              title={product.aluminumBladeFeature.title}
              description={product.aluminumBladeFeature.description}
              imageSrc={product.aluminumBladeFeature.image}
              className="h-full"
              priority={true}
            />
          }

          {product.airDeliveryFeature && product.airDeliveryFeature.title && 
            <ProductAirDeliveryCard
              title={product.airDeliveryFeature.title}
              description={product.airDeliveryFeature.description}
              imageSrc={product.airDeliveryFeature.image}
              className="h-full"
              priority={true}
            />
          }

          {product.robustMotorFeature && product.robustMotorFeature.title && 
            <ProductRobustMotorCard
              title={product.robustMotorFeature.title}
              description={product.robustMotorFeature.description}
              imageSrc={product.robustMotorFeature.image}
              className="h-full"
              priority={true}
            />
          }

          {product.doubleBearingFeature && product.doubleBearingFeature.title && 
            <ProductDoubleBearingCard
              title={product.doubleBearingFeature.title}
              description={product.doubleBearingFeature.description}
              imageSrc={product.doubleBearingFeature.image}
              className="h-full"
              priority={true}
            />
          }

          {product.remoteFeatures.title && 
            <ProductRemoteCard
              title={product.remoteFeatures.title}
              description={product.remoteFeatures.description}
              className="h-full"
              priority={true}
            />
          }

          {product.seasonalFeatures.summer.image && 
            <ProductSeasonCard
              summerImage={product.seasonalFeatures.summer.image}
              winterImage={product.seasonalFeatures.winter.image}
              title="Enjoy benefits of 2-way rotation!"
              description={`Experience year-round comfort with ${product.fullName}, featuring 2-way rotation- a reverse mode to circulate warm air during winter.`}
              className="max-w-3xl mx-auto"
              priority={true}
            />
          }

          </div>

          {/* ProductPremiumAestheticsCard - conditional based on slug */}
          {!slug.includes('vayuprohs') && !slug.includes('vayuultra') && (
            <div className="py-10">
              <ProductPremiumAestheticsCard
                className="mx-auto"
                priority={true}
                productId={product.id}
              />
            </div>
          )}

          {/* YouTube Video Cards - hardcoded for specific products */}
          {slug === 'airoquad' && (
            <div className="py-10">
              <YouTubeVideoCard
                videoSrc="https://www.youtube.com/watch?v=9erDEx8NSA4"
                className=""
                gradientClass="bg-gradient-to-t from-black/30 via-black/20 to-transparent"
              />
            </div>
          )}

          {slug === 'airoelevate' && (
            <div className="py-10">
              <YouTubeVideoCard
                videoSrc="https://www.youtube.com/watch?v=e7k7TqKlbsQ"
                className=""
                gradientClass="bg-gradient-to-t from-black/30 via-black/20 to-transparent"
              />
            </div>
          )}

          {(slug === 'airojewel' || slug === 'airogeometry') && (
            <div className="py-10">
              <YouTubeVideoCard
                videoSrc="https://www.youtube.com/watch?v=Pcqcr2ePBlk"
                className=""
                gradientClass="bg-gradient-to-t from-black/30 via-black/20 to-transparent"
              />
            </div>
          )}

          {/* DigiShield and AR Section - conditional */}
          <section className="grid grid-cols-1 gap-4 py-10">
            {!slug.includes('airozephyr') && !slug.includes('airoserenade') && !slug.includes('airosleek') && !slug.includes('stardust') && !slug.includes('vayuultra') && !slug.includes('vayuprohs') && (
              <div className="col-span-1 h-full">
                <DigiShieldSection />
              </div>
            )}

            {product.arLink && (
              <div className="col-span-1 h-full">
                <ARViewSection arLink={product.arLink} />
              </div>
            )}
          </section>

          {/* Product Specifications Section */}
          <section className="py-16">
            <h2 className="text-4xl font-bold text-white mb-8">
              Product specifications
            </h2>

            <div className="rounded-2xl bg-black/20 backdrop-blur-sm p-8 border border-white/70">
              <div className="space-y-4">
                {[
                  { label: "Brand", value: product.specifications.brand },
                  { label: "Model", value: product.modelName },
                  {
                    label: "Color",
                    value: product.colors.map(c => c.name).join(', ')
                  },
                  { label: "Type", value: product.specifications.type },
                  { label: "Star rating", value: `${product.starRating} star` },
                  { label: "Sweep Size", value: product.specifications.sweepSize },
                  { label: "Speed", value: product.specifications.speed },
                  { label: "Air Delivery (CMM)", value: product.specifications.airDelivery },
                  { label: "Power", value: product.specifications.power },
                  { label: "Warranty", value: slug.includes('airozephyr') || slug.includes('airoserenade') || slug.includes('airosleek') || slug.includes('stardust') || slug.includes('vayuultra') || slug.includes('vayuprohs') ? "2 years" : `${product.warranty.standard}+${product.warranty.extended}* years` },
                  ...(product.specifications.dimensions !== "xx mm X yy mm X zz mm (length X width X height)" ? [{ label: "Dimensions", value: product.specifications.dimensions }] : []),
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row py-4 border-b border-white/10"
                  >
                    <div className="w-full sm:w-1/3 text-white/70">
                      {spec.label}
                    </div>
                    <div className="w-full sm:w-2/3 text-white">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>

              {!slug.includes('airozephyr') && !slug.includes('airoserenade') && !slug.includes('airosleek') && !slug.includes('stardust') && !slug.includes('vayuultra') && !slug.includes('vayuprohs') && (
                <p className="text-sm text-white/50 mt-6">
                  * {product.warranty.note}
                </p>
              )}
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </>
  );
} 