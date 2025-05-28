export function HomeSchema() {
  // ItemList schema
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "EcoLink AiroElevate BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/ceiling-fans/airoelevate"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "EcoLink AiroQuad BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/ceiling-fans/airoquad"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "EcoLink AiroJewel BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/ceiling-fans/airojewel"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "EcoLink AiroGeometry BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/ceiling-fans/airogeometry"
      },
      {
        "@type": "ListItem",
        "position": 5,
        "name": "EcoLink Stardust BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/ceiling-fans/stardustbldc"
      },
      {
        "@type": "ListItem",
        "position": 6,
        "name": "EcoLink AiroJewel BLDC Smart Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/smart-fans/airojewelsmart"
      },
      {
        "@type": "ListItem",
        "position": 7,
        "name": "EcoLink AiroGeometry BLDC Smart Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/smart-fans/airogeometrysmart"
      },
      {
        "@type": "ListItem",
        "position": 8,
        "name": "EcoLink AiroZephyr Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/decorative-fans/airozephyr"
      },
      {
        "@type": "ListItem",
        "position": 9,
        "name": "EcoLink AiroSerenade Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/decorative-fans/airoserenade"
      },
      {
        "@type": "ListItem",
        "position": 10,
        "name": "EcoLink AiroSleek Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/decorative-fans/airosleek"
      },
      {
        "@type": "ListItem",
        "position": 11,
        "name": "EcoLink VayuPro High Speed Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/economy-fans/vayuprohs"
      },
      {
        "@type": "ListItem",
        "position": 12,
        "name": "EcoLink VayuUltra Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/economy-fans/vayuultra"
      },
      {
        "@type": "ListItem",
        "position": 13,
        "name": "EcoLink Airofresh New BLDC Ceiling Fan",
        "url": "https://fans.ecolinklighting.in/economy-fans/airofreshnew"
      }
    ]
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

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "EcoLink",
    "url": "https://fans.ecolinklighting.in",
    "logo": "https://fans.ecolinklighting.in/faviconn.png",
    "sameAs": [
      "https://www.facebook.com/ecolinklighting",
      "https://twitter.com/ecolinklighting",
      "https://www.instagram.com/ecolinklighting/",
      "https://www.youtube.com/channel/ecolinklighting"
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
} 