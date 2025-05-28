import { MetadataRoute } from 'next';
import productsData from '@/lib/products';
import { generateProductUrl } from '@/lib/categoryUtils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fans.ecolinklighting.in';
  
  // Static routes
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/store-locator`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/product-features`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ar`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ] as MetadataRoute.Sitemap;

  // Dynamic product routes using new category-based URLs
  const productRoutes = productsData.products.map((product) => {
    const productUrl = generateProductUrl(product.slug);
    return {
      url: `${baseUrl}${productUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  }) as MetadataRoute.Sitemap;

  return [...staticRoutes, ...productRoutes];
} 