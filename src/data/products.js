export const SIZES = ["S", "M", "L", "XL", "2XL"];

export const PRODUCTS = [
  {
    id: "psalms-91",
    name: "Psalms 91 Jersey",
    verse: "PSALMS 91",
    category: "White",
    color: "White / Black",
    price: 68,
    image: "/images/psalmsBack.jpg",
    frontImage: "/images/whiteFront.jpg",
    description: "A reminder of shelter, refuge, and being covered. The Psalms 91 jersey pairs an oversized athletic fit with black block numerals and a clean white colorway.",
    quote: "He who dwells in the shelter of the Most High.",
    badge: "The Protection Verse",
    featured: true,
  },
  {
    id: "philippians-4",
    name: "Philippians 4 Jersey",
    verse: "PHILIPPIANS 4",
    category: "Black",
    color: "Black / White",
    price: 68,
    image: "/images/philBack.jpg",
    frontImage: "/images/blackFront.jpg",
    description: "Built around strength through every season. This black match-cut jersey features contrast white trim and a bold scripture-inspired back print.",
    quote: "I can do all things through Christ who strengthens me.",
    badge: "The Strength Verse",
    featured: true,
  },
];

export const formatPrice = (amount) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(amount);
