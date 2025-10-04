import { getProductBySlug } from "@/lib/products";
import { formatCents } from "@/lib/money";
import { notFound } from "next/navigation";
import AddToCart from "./purchase";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return { title: `${product.name} | Protein Bar Co`, description: product.description };
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) return notFound();
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className={`rounded-xl overflow-hidden h-72 bg-gradient-to-br ${product.color}`} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
          <p className="mt-2 text-black/70 dark:text-white/70">{product.description}</p>
          <div className="mt-3 text-sm opacity-80">{product.proteinGrams}g protein • {product.calories} kcal</div>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xl font-semibold">{formatCents(product.priceCents)}</span>
          </div>
          <div className="mt-6">
            <AddToCart productId={product.id} />
          </div>
        </div>
      </div>
    </main>
  );
}
