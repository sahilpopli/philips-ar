import { generateProductUrl } from "@/lib/categoryUtils";
import productsData from "@/lib/products";

interface CategorySchemaProps {
  category: string;
}

export default function CategorySchema({ category }: CategorySchemaProps) {
  // Get category information
  const getCategoryInfo = (categorySlug: string) => {
    switch (categorySlug) {
      case 'ceiling-fans':
        return {
          name: 'BLDC Ceiling Fans',
          description: 'Energy-efficient BLDC ceiling fans with premium aesthetics and superior performance',
          url: 'https://fans.ecolinklighting.in/ceiling-fans'
        };
      case 'smart-fans':
        return {
          name: 'Smart Ceiling Fans',
          description: 'WiFi-enabled smart ceiling fans with app control and voice assistant compatibility',
          url: 'https://fans.ecolinklighting.in/smart-fans'
        };
      case 'decorative-fans':
        return {
          name: 'Decorative Ceiling Fans',
          description: 'Elegant decorative ceiling fans with distinctive design and superior air delivery',
          url: 'https://fans.ecolinklighting.in/decorative-fans'
        };
      case 'economy-fans':
        return {
          name: 'Economy Ceiling Fans',
          description: 'Affordable ceiling fans without compromising on quality and performance',
          url: 'https://fans.ecolinklighting.in/economy-fans'
        };
      default:
        return {
          name: 'Ceiling Fans',
          description: 'Premium ceiling fans for modern homes',
          url: 'https://fans.ecolinklighting.in'
        };
    }
  };

  // Filter products by category
  const getProductsInCategory = (categorySlug: string) => {
    return productsData.products.filter(product => {
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
    });
  };

  const categoryInfo = getCategoryInfo(category);
  const categoryProducts = getProductsInCategory(category);

  // Create ItemList schema for products in this category
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": categoryInfo.name,
    "description": categoryInfo.description,
    "url": categoryInfo.url,
    "itemListElement": categoryProducts.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": product.fullName,
      "url": `https://fans.ecolinklighting.in${generateProductUrl(product.slug, category)}`
    }))
  };

  // Create breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fans.ecolinklighting.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryInfo.name,
        "item": categoryInfo.url
      }
    ]
  };

  // Create CollectionPage schema
  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": categoryInfo.name,
    "description": categoryInfo.description,
    "url": categoryInfo.url,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": categoryProducts.length,
      "itemListElement": categoryProducts.map((product, index) => ({
        "@type": "Product",
        "position": index + 1,
        "name": product.fullName,
        "description": product.description,
        "url": `https://fans.ecolinklighting.in${generateProductUrl(product.slug, category)}`,
        "image": `https://fans.ecolinklighting.in${product.images.main}`,
        "brand": {
          "@type": "Brand",
          "name": product.specifications.brand
        },
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock"
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
    </>
  );
} 