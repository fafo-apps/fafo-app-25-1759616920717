export type Product = {
  id: string;
  slug: string;
  name: string;
  priceCents: number; // store as integer cents
  description: string;
  proteinGrams: number;
  calories: number;
  color: string; // tailwind color class for card/image accent
};

const products: Product[] = [
  {
    id: "peanut-crunch",
    slug: "peanut-crunch",
    name: "Peanut Crunch",
    priceCents: 299,
    description:
      "Classic roasted peanut crunch with 15g protein and only 3g sugar. Perfect for post-workout or a mid-day boost.",
    proteinGrams: 15,
    calories: 210,
    color: "from-amber-300 to-amber-500",
  },
  {
    id: "chocolate-sea-salt",
    slug: "chocolate-sea-salt",
    name: "Chocolate Sea Salt",
    priceCents: 329,
    description:
      "Rich cocoa balanced with a hint of sea salt. 17g protein, gluten free, and ridiculously satisfying.",
    proteinGrams: 17,
    calories: 220,
    color: "from-stone-300 to-stone-500",
  },
  {
    id: "berry-blast",
    slug: "berry-blast",
    name: "Berry Blast",
    priceCents: 309,
    description:
      "Bright berries meet smooth chewy texture. 16g protein and antioxidants for clean energy.",
    proteinGrams: 16,
    calories: 205,
    color: "from-pink-300 to-rose-500",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
