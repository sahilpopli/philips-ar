import productsData, { Product } from "@/lib/products";
import { generateProductUrl } from "@/lib/categoryUtils";

// This is a server component that will generate the schema for products
export default async function ProductPageSchema({ params }: { params: Promise<{ slug: string }> }) {
  // Correctly await the params in Next.js 15
  const { slug } = await params;
  
  // Find the product data
  const product = productsData.products.find(p => p.slug === slug);
  
  if (!product) {
    // If product not found, return a minimal breadcrumb
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                "name": "Products",
                "item": "https://fans.ecolinklighting.in/"
              }
            ]
          })
        }}
      />
    );
  }

  // Determine the correct category for this product
  const getProductCategory = (product: Product) => {
    const productType = product.specifications?.type?.toLowerCase() || '';
    
    if (productType.includes('smart') || product.categories.includes('smart') || product.slug.includes('smart')) {
      return 'smart-fans';
    } else if (productType.includes('decorative') || product.fullName.toLowerCase().includes('decorative')) {
      return 'decorative-fans';
    } else if (productType.includes('economy') || product.fullName.toLowerCase().includes('vayupro') || product.fullName.toLowerCase().includes('vayuultra') || product.fullName.toLowerCase().includes('airofresh')) {
      return 'economy-fans';
    } else {
      return 'ceiling-fans';
    }
  };

  const category = getProductCategory(product);
  const newProductUrl = generateProductUrl(slug, category);
  
  // Create breadcrumb schema pointing to new URL structure
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
        "name": "Products",
        "item": "https://fans.ecolinklighting.in/"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.fullName,
        "item": `https://fans.ecolinklighting.in${newProductUrl}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
} 