"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";
import { formatCents } from "@/lib/money";

export default function CheckoutPage() {
  const { detailedItems, subtotalCents, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", address: "" });

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setPlaced(true);
    clear();
  };

  if (detailedItems.length === 0 && !placed) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
        <p className="mt-4">Your cart is empty.</p>
      </main>
    );
  }

  if (placed) {
    return (
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight">Thank you!</h1>
        <p className="mt-2">Your order has been placed. A confirmation email will be sent shortly.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
      <form onSubmit={placeOrder} className="grid md:grid-cols-[2fr_1fr] gap-8 mt-8">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Full name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="mt-1 w-full border rounded-md px-3 py-2 bg-transparent border-black/10 dark:border-white/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="mt-1 w-full border rounded-md px-3 py-2 bg-transparent border-black/10 dark:border-white/10"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Shipping address</label>
            <textarea
              required
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
              rows={4}
              className="mt-1 w-full border rounded-md px-3 py-2 bg-transparent border-black/10 dark:border-white/10"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-black text-white dark:bg.white dark:text-black px-4 py-2.5 font-medium hover:opacity-90"
          >
            Place order
          </button>
        </div>
        <aside className="border rounded-lg p-4 h-fit border-black/10 dark:border-white/10">
          <h2 className="font-semibold">Order Summary</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {detailedItems.map((i) => (
              <li key={i.productId} className="flex items-center justify-between">
                <span>
                  {i.product.name} × {i.quantity}
                </span>
                <span>{formatCents(i.lineTotalCents)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between text-sm">
            <span>Subtotal</span>
            <span>{formatCents(subtotalCents)}</span>
          </div>
          <div className="mt-1 flex items-center justify-between text-sm opacity-70">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="mt-2 border-t pt-2 flex items-center justify-between font-medium">
            <span>Total</span>
            <span>{formatCents(subtotalCents)}</span>
          </div>
        </aside>
      </form>
    </main>
  );
}
