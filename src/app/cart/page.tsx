"use client";

import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { formatCents } from "@/lib/money";

export default function CartPage() {
  const { detailedItems, subtotalCents, setQuantity, remove } = useCart();

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Your Cart</h1>
      {detailedItems.length === 0 ? (
        <div className="mt-8">
          <p>Your cart is empty.</p>
          <Link href="/products" className="inline-block mt-4 underline">Continue shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-[2fr_1fr] gap-8 mt-8">
          <ul className="space-y-4">
            {detailedItems.map((item) => (
              <li key={item.productId} className="border rounded-lg p-4 flex items-center gap-4 border-black/10 dark:border-white/10">
                <div className={`w-20 h-16 rounded-md bg-gradient-to-br ${item.product.color}`} />
                <div className="flex-1">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm opacity-70">{formatCents(item.product.priceCents)}</p>
                  </div>
                  <p className="text-xs opacity-70 mt-1">{item.product.proteinGrams}g protein • {item.product.calories} kcal</p>
                  <div className="mt-3 flex items-center gap-3">
                    <label className="text-sm opacity-80">Qty</label>
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => setQuantity(item.productId, Math.max(1, Number(e.target.value) || 1))}
                      className="w-16 text-center py-1 border rounded-md bg-transparent border-black/10 dark:border-white/10"
                    />
                    <button onClick={() => remove(item.productId)} className="text-sm underline opacity-80">
                      Remove
                    </button>
                  </div>
                </div>
                <div className="font-medium">{formatCents(item.lineTotalCents)}</div>
              </li>
            ))}
          </ul>
          <aside className="border rounded-lg p-4 h-fit border-black/10 dark:border-white/10">
            <h2 className="font-semibold">Order Summary</h2>
            <div className="mt-3 flex items-center justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCents(subtotalCents)}</span>
            </div>
            <div className="mt-1 flex items-center justify-between text-sm opacity-70">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <Link
              href="/checkout"
              className="mt-4 block text-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2.5 font-medium hover:opacity-90"
            >
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </main>
  );
}
