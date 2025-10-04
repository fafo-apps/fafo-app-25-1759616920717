"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

const BRAND = "Protein Bar Co"; // Update to your brand name

export default function Navbar() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg tracking-tight">
          {BRAND}
        </Link>
        <div className="flex items-center gap-5 text-sm">
          <Link href="/products" className="hover:underline">
            Products
          </Link>
          <Link href="/cart" className="relative hover:underline">
            Cart
            {count > 0 && (
              <span className="ml-2 inline-flex items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black text-[10px] h-5 min-w-5 px-1">
                {count}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
