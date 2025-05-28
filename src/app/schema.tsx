// Server component for home page schema
export default function HomePageSchema() {
  // ItemList schema
  const productListItems = [
    {
      "@type": "ListItem",
      "position": 1,
      "url": "https://fans.ecolinklighting.in/ceiling-fans/airoelevate"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "url": "https://fans.ecolinklighting.in/ceiling-fans/airoquad"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "url": "https://fans.ecolinklighting.in/ceiling-fans/airojewel"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "url": "https://fans.ecolinklighting.in/ceiling-fans/airogeometry"
    },
    {
      "@type": "ListItem",
      "position": 5,
      "url": "https://fans.ecolinklighting.in/ceiling-fans/stardustbldc"
    },
    {
      "@type": "ListItem",
      "position": 6,
      "url": "https://fans.ecolinklighting.in/smart-fans/airojewelsmart"
    },
    {
      "@type": "ListItem",
      "position": 7,
      "url": "https://fans.ecolinklighting.in/smart-fans/airogeometrysmart"
    },
    {
      "@type": "ListItem",
      "position": 8,
      "url": "https://fans.ecolinklighting.in/decorative-fans/airozephyr"
    },
    {
      "@type": "ListItem",
      "position": 9,
      "url": "https://fans.ecolinklighting.in/decorative-fans/airoserenade"
    },
    {
      "@type": "ListItem",
      "position": 10,
      "url": "https://fans.ecolinklighting.in/decorative-fans/airosleek"
    },
    {
      "@type": "ListItem",
      "position": 11,
      "url": "https://fans.ecolinklighting.in/economy-fans/vayuprohs"
    },
    {
      "@type": "ListItem",
      "position": 12,
      "url": "https://fans.ecolinklighting.in/economy-fans/vayuultra"
    }
  ];

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": productListItems
  };

  // Breadcrumb schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://fans.ecolinklighting.in/"
      }
    ]
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
    </>
  );
} 