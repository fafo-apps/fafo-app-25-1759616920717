import Link from "next/link";
import { getAllProducts } from "@/lib/products";
import { formatCents } from "@/lib/money";

export default function Home() {
  const products = getAllProducts().slice(0, 3);
  return (
    <main>
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Clean protein bars that taste incredible
            </h1>
            <p className="mt-4 text-lg text-black/70 dark:text-white/70">
              Real ingredients. High protein. Low sugar. Fuel your day without the crash.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-3 font-medium hover:opacity-90"
              >
                Shop bars
              </Link>
              <Link href="#featured" className="underline">
                See flavors
              </Link>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 text-sm opacity-80">
              <div>
                <p className="font-semibold">15–17g</p>
                <p>Protein</p>
              </div>
              <div>
                <p className="font-semibold">3–4g</p>
                <p>Sugar</p>
              </div>
              <div>
                <p className="font-semibold">Gluten Free</p>
                <p>Ingredients</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {products.map((p) => (
              <div key={p.id} className={`h-40 rounded-xl bg-gradient-to-br ${p.color}`} />
            ))}
          </div>
        </div>
      </section>

      <section id="featured" className="bg-black/[.03] dark:bg-white/[.06] py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-xl font-semibold tracking-tight">Featured flavors</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {products.map((p) => (
              <li key={p.id} className="border rounded-lg overflow-hidden border-black/10 dark:border-white/10">
                <Link href={`/products/${p.slug}`} className="block">
                  <div className={`h-36 bg-gradient-to-br ${p.color}`} />
                  <div className="p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-semibold">{p.name}</h3>
                      <span className="text-sm text-black/70 dark:text-white/70">{formatCents(p.priceCents)}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
