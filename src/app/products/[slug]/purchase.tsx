"use client";

import { useState } from "react";
import { useCart } from "@/components/CartContext";

export default function AddToCart({ productId }: { productId: string }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border rounded-md overflow-hidden border-black/10 dark:border-white/10">
        <button
          className="px-3 py-2 hover:bg-black/5 disabled:opacity-50"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <input
          type="number"
          min={1}
          value={qty}
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="w-14 text-center py-2 bg-transparent"
        />
        <button
          className="px-3 py-2 hover:bg-black/5"
          onClick={() => setQty((q) => q + 1)}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>
      <button
        onClick={() => add(productId, qty)}
        className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-5 py-2.5 font-medium hover:opacity-90"
      >
        Add to cart
      </button>
    </div>
  );
}
