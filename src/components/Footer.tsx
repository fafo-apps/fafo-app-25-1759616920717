import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 mt-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 grid gap-6 sm:grid-cols-3 text-sm">
        <div>
          <p className="font-semibold">Protein Bar Co</p>
          <p className="text-black/70 dark:text-white/70 mt-2">Clean fuel. Real flavor. Built for your day.</p>
        </div>
        <div>
          <p className="font-semibold">Explore</p>
          <ul className="mt-2 space-y-1">
            <li><Link className="hover:underline" href="/">Home</Link></li>
            <li><Link className="hover:underline" href="/products">Products</Link></li>
            <li><Link className="hover:underline" href="/cart">Cart</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-semibold">Legal</p>
          <ul className="mt-2 space-y-1">
            <li>All rights reserved © {new Date().getFullYear()}</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
