import type { Product } from "../types"

export const products: Product[] = [
  {
    id: "creatine-core",
    name: "Creatine Core",
    brand: "GAMva Lab",
    price: 36,
    compareAtPrice: 42,
    category: "Supplements",
    image:
      "https://images.unsplash.com/photo-1697638087672-3a314baf8c61?auto=format&fit=crop&w=900&q=80",
    imageAlt: "نمونه نمایشی یک بطری مکمل ورزشی روی پس‌زمینه تیره",
    options: ["Unflavored", "Citrus"],
    description:
      "A demo marketplace listing for a daily training supplement. Product claims and composition require seller verification before launch.",
    highlights: [
      "30 demo servings",
      "Resealable container",
      "Seller verification pending",
    ],
    specs: {
      Format: "Powder",
      Servings: "30 (demo)",
      Flavor: "Unflavored / Citrus",
      Verification: "Pending",
    },
    demoRating: 4.8,
    demoReviews: 126,
    tag: "Demo bestseller",
  },
  {
    id: "resistance-kit",
    name: "Motion Band Kit",
    brand: "FlexCore",
    price: 34.99,
    category: "Equipment",
    image:
      "https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?auto=format&fit=crop&w=900&q=80",
    imageAlt: "نمونه نمایشی تجهیزات تمرین مقاومتی",
    options: ["Starter Kit", "Pro Kit"],
    description:
      "A portable demo training kit with multiple resistance levels. Final materials and warranty must be confirmed by the seller.",
    highlights: ["Five resistance levels", "Travel pouch", "Demo listing"],
    specs: {
      Format: "Band set",
      Pieces: "8",
      Material: "Seller confirmation pending",
      Verification: "Pending",
    },
    demoRating: 4.6,
    demoReviews: 89,
    tag: "New",
  },
  {
    id: "omega-daily",
    name: "Omega Daily",
    brand: "NovaNutrients",
    price: 28.99,
    category: "Supplements",
    image:
      "https://images.unsplash.com/photo-1618498732683-49d1025cc9af?auto=format&fit=crop&w=900&q=80",
    imageAlt: "نمونه نمایشی بطری محصول سلامت",
    options: ["30 capsules", "60 capsules"],
    description:
      "Demo-only wellness product listing. Nutrition facts, purity, certifications, and health claims are not verified.",
    highlights: [
      "Demo catalog item",
      "Two pack sizes",
      "No verified health claims",
    ],
    specs: {
      Format: "Capsule",
      Quantity: "30 / 60",
      Certification: "Not verified",
      Verification: "Pending",
    },
    demoRating: 4.7,
    demoReviews: 204,
    tag: "Popular",
  },
  {
    id: "recovery-roller",
    name: "Recovery Roller",
    brand: "RecoverWell",
    price: 42,
    category: "Recovery",
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=80",
    imageAlt: "نمونه نمایشی وسیله ریکاوری در فضای تمرینی",
    options: ["Standard", "Firm"],
    description:
      "A demo recovery accessory listing. Dimensions and materials are placeholders until seller onboarding is complete.",
    highlights: [
      "Two density options",
      "Textured surface",
      "Demo specification",
    ],
    specs: {
      Format: "Foam roller",
      Length: "33 cm (demo)",
      Density: "Standard / Firm",
      Verification: "Pending",
    },
    demoRating: 4.5,
    demoReviews: 61,
    tag: "Recovery",
  },
]

export const getProduct = (id: string) =>
  products.find((product) => product.id === id)

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    value,
  )
