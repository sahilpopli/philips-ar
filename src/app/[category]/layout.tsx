import { ReactNode } from 'react';
import { Metadata } from 'next';

interface CategoryLayoutProps {
  children: ReactNode;
  params: { category: string };
}

// Generate metadata for category pages
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  
  const getCategoryMetadata = (categorySlug: string) => {
    switch (categorySlug) {
      case 'ceiling-fans':
        return {
          title: 'BLDC Ceiling Fans - Energy Efficient Premium Fans | EcoLink',
          description: 'Explore EcoLink\'s premium BLDC ceiling fans with energy-efficient technology, modern design, and superior performance. Perfect for contemporary homes.',
          keywords: ['BLDC ceiling fans', 'energy efficient fans', 'premium ceiling fans', 'EcoLink fans', 'modern ceiling fans']
        };
      case 'smart-fans':
        return {
          title: 'Smart WiFi Ceiling Fans - App & Voice Control | EcoLink',
          description: 'Discover EcoLink\'s smart ceiling fans with WiFi connectivity, app control, and voice assistant compatibility. Control your comfort from anywhere.',
          keywords: ['smart ceiling fans', 'WiFi fans', 'app controlled fans', 'voice control fans', 'smart home fans']
        };
      case 'decorative-fans':
        return {
          title: 'Decorative Ceiling Fans - Elegant Design & Performance | EcoLink',
          description: 'Beautiful decorative ceiling fans that enhance your interior decor while delivering superior air circulation and performance.',
          keywords: ['decorative ceiling fans', 'elegant fans', 'designer fans', 'stylish ceiling fans', 'interior decor fans']
        };
      case 'economy-fans':
        return {
          title: 'Economy Ceiling Fans - Affordable Quality Fans | EcoLink',
          description: 'High-quality economy ceiling fans that offer excellent value without compromising on performance and reliability.',
          keywords: ['economy ceiling fans', 'affordable fans', 'budget ceiling fans', 'value fans', 'cost effective fans']
        };
      default:
        return {
          title: 'Ceiling Fans | EcoLink',
          description: 'Premium ceiling fans for modern homes',
          keywords: ['ceiling fans', 'EcoLink']
        };
    }
  };

  const categoryMeta = getCategoryMetadata(category);
  
  return {
    title: categoryMeta.title,
    description: categoryMeta.description,
    keywords: categoryMeta.keywords,
    openGraph: {
      title: categoryMeta.title,
      description: categoryMeta.description,
      url: `https://fans.ecolinklighting.in/${category}`,
      type: 'website',
      images: [
        {
          url: '/home/sliders/desktop/01.png',
          width: 1200,
          height: 630,
          alt: 'EcoLink Ceiling Fans',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: categoryMeta.title,
      description: categoryMeta.description,
      images: ['/home/sliders/desktop/01.png'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function CategoryLayout({ children }: CategoryLayoutProps) {
  return (
    <>
      {children}
    </>
  );
} 