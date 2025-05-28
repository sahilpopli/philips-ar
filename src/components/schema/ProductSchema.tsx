import { generateProductUrl } from "@/lib/categoryUtils";

interface ProductSchemaProps {
  slug: string;
  category: string;
  productName: string;
  price: number;
  description: string;
  imageUrl: string;
  starRating: number;
  brand?: string;
}

export default function ProductSchema({ 
  slug, 
  category,
  productName, 
  price, 
  description, 
  imageUrl, 
  starRating, 
  brand = "EcoLink" 
}: ProductSchemaProps) {
  const productUrl = generateProductUrl(slug, category);
  
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": description,
    "image": imageUrl,
    "brand": {
      "@type": "Brand",
      "name": brand
    },
    "url": `https://fans.ecolinklighting.in${productUrl}`,
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": starRating,
      "ratingCount": 1
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
} 