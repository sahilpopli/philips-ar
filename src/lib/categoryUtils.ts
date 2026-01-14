export interface ProductCategoryInfo {
  name: string;
  price: number;
  image: string;
  slug: string;
  category: string;
}

// Product data arrays from home page
export const bldcFans = [

  
  {
    name: "EcoLink AiroQuad 3B BLDC Ceiling Fan",
    price: 7000,
    image: "/home/product/airoquad3b.png",
    slug: "airoquad3b",
    category: "ceiling-fans"
  },
  {
    name: "EcoLink AiroTrio BLDC Ceiling Fan",
    price: 6150,
    image: "/home/product/airotrio.png",
    slug: "airotrio",
    category: "ceiling-fans"
  },
  {
    name: "EcoLink AiroKristal BLDC Ceiling Fan",
    price: 6150,
    image: "/home/product/airokristal.png",
    slug: "airokristal",
    category: "ceiling-fans"
  },
  {
    name: "EcoLink AiroTurbo BLDC Ceiling Fan",
    price: 4500,
    image: "/home/product/airoturbo.png",
    slug: "airoturbo",
    category: "ceiling-fans"
  },
  {
    name: "EcoLink AiroElevate BLDC Ceiling Fan",
    price: 8700,
    image: "/home/product/AiroElevate.png?v=1",
    slug: "airoelevate",
    category: "ceiling-fans"
  },
  {
    name: "EcoLink AiroQuad BLDC Ceiling Fan",
    price: 7400,
    image: "/home/product/AiroQuad.png",
    slug: "airoquad",
    category: "ceiling-fans"
  },
  {
    name: "EcoLink AiroJewel BLDC Ceiling Fan",
    price: 5850,
    image: "/home/product/AiroJewel.png?v=1",
    slug: "airojewel",
    category: "ceiling-fans"
  },
  {
    name: "EcoLink AiroGeometry BLDC Ceiling Fan",
    price: 5850,
    image: "/home/product/AiroGeometry.png?v=1",
    slug: "airogeometry",
    category: "ceiling-fans"
  },
  {
    name: "EcoLink Stardust BLDC Ceiling Fan",
    price: 6499,
    image: "/home/product/StarDust.png",
    slug: "stardustbldc",
    category: "ceiling-fans"
  }
  

   


  
];

export const smartbldcFans = [
  {
    name: "EcoLink AiroElevate Smart Ceiling Fan",
    price: 9600,
    image: "/home/product/AiroElevate.png",
    slug: "airoelevatesmart",
    category: "smart-fans"
  },
  {
    name: "EcoLink AiroQuad Smart Ceiling Fan",
    price: 8300,
    image: "/home/product/AiroQuad.png",
    slug: "airoquadsmart",
    category: "smart-fans"
  },
  
  {
    name: "EcoLink AiroJewel BLDC Smart Ceiling Fan",
    price: 6950,
    image: "/home/product/AiroJewel.png?v=1",
    slug: "airojewelsmart",
    category: "smart-fans"
  },
  {
    name: "EcoLink AiroGeometry BLDC Smart Ceiling Fan",
    price: 6950,
    image: "/home/product/AiroGeometry.png?v=1",
    slug: "airogeometrysmart",
    category: "smart-fans"
  }
  
];

export const decorativeFans = [
  {
    name: "EcoLink AiroZephyr Ceiling Fan",
    price: 4395,
    image: "/home/product/AiroZephyr.png",
    slug: "airozephyr",
    category: "decorative-fans"
  },
  {
    name: "EcoLink AiroSerenade Ceiling Fan",
    price: 4395,
    image: "/home/product/AiroSerenada.png",
    slug: "airoserenade",
    category: "decorative-fans"
  },
  {
    name: "EcoLink AiroSleek Ceiling Fan",
    price: 4395,
    image: "/home/product/AiroSleek.png",
    slug: "airosleek",
    category: "decorative-fans"
  }
];

export const economyFansPro = [
  {
    name: "EcoLink VayuPro High Speed Ceiling Fan",
    price: 2350,
    image: "/home/product/vayuprofan.png",
    slug: "vayuprohs",
    category: "economy-fans"
  }
];

export const economyFansHS = [
  {
    name: "EcoLink VayuUltra Ceiling Fan",
    price: 2350,
    image: "/home/product/VayuUltra.png",
    slug: "vayuultra",
    category: "economy-fans"
  },
];

// Utility function to generate product URL based on category and slug
export const generateProductUrl = (slug: string, category?: string): string => {
  if (category) {
    return `/${category}/${slug}`;
  }
  
  // Fallback: find the category based on slug
  const allProducts = [
    ...bldcFans,
    ...smartbldcFans,
    ...decorativeFans,
    ...economyFansPro,
    ...economyFansHS
  ];
  
  const product = allProducts.find(p => p.slug === slug);
  if (product) {
    return `/${product.category}/${slug}`;
  }
  
  // Final fallback to old structure
  return `/products/${slug}`;
};

// Utility function to get category by slug
export const getCategoryBySlug = (slug: string): string | null => {
  const allProducts = [
    ...bldcFans,
    ...smartbldcFans,
    ...decorativeFans,
    ...economyFansPro,
    ...economyFansHS
  ];
  
  const product = allProducts.find(p => p.slug === slug);
  return product?.category || null;
}; 