import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { formatCents } from "@/lib/money";

export const metadata = {
  title: "Products | Protein Bar Co",
};

export default function ProductsPage() {
  const products = getAllProducts();
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Protein Bars</h1>
      <p className="text-black/70 dark:text-white/70 mt-2">High-protein, low sugar. Choose your flavor.</p>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <li key={p.id} className="border rounded-lg overflow-hidden border-black/10 dark:border-white/10">
            <Link href={`/products/${p.slug}`} className="block">
              <div className={`h-40 bg-gradient-to-br ${p.color}`} />
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h2 className="font-semibold">{p.name}</h2>
                  <span className="text-sm text-black/70 dark:text-white/70">{formatCents(p.priceCents)}</span>
                </div>
                <p className="text-sm text-black/70 dark:text-white/70 mt-1 line-clamp-2">{p.description}</p>
                <div className="text-xs mt-2 opacity-70">{p.proteinGrams}g protein • {p.calories} kcal</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
