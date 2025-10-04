"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProductById, type Product } from "@/lib/products";

export type CartItem = {
  productId: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

const CartContext = createContext<{
  state: CartState;
  add: (productId: string, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotalCents: number;
  detailedItems: Array<CartItem & { product: Product; lineTotalCents: number }>; 
}>({
  state: { items: [] },
  add: () => {},
  remove: () => {},
  setQuantity: () => {},
  clear: () => {},
  count: 0,
  subtotalCents: 0,
  detailedItems: [],
});

const STORAGE_KEY = "cart:v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<CartState>({ items: [] });

  // Load from localStorage on client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as CartState;
        if (Array.isArray(parsed.items)) setState(parsed);
      }
    } catch {}
  }, []);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const api = useMemo(() => {
    return {
      add(productId: string, quantity: number = 1) {
        setState((prev) => {
          const existing = prev.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: prev.items.map((i) =>
                i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { items: [...prev.items, { productId, quantity }] };
        });
      },
      remove(productId: string) {
        setState((prev) => ({ items: prev.items.filter((i) => i.productId !== productId) }));
      },
      setQuantity(productId: string, quantity: number) {
        setState((prev) => ({
          items: prev.items
            .map((i) => (i.productId === productId ? { ...i, quantity } : i))
            .filter((i) => i.quantity > 0),
        }));
      },
      clear() {
        setState({ items: [] });
      },
    };
  }, []);

  const detailedItems = useMemo(() => {
    return state.items
      .map((i) => {
        const product = getProductById(i.productId);
        if (!product) return undefined;
        return {
          ...i,
          product,
          lineTotalCents: i.quantity * product.priceCents,
        };
      })
      .filter(Boolean) as Array<CartItem & { product: Product; lineTotalCents: number }>;
  }, [state.items]);

  const subtotalCents = useMemo(
    () => detailedItems.reduce((sum, i) => sum + i.lineTotalCents, 0),
    [detailedItems]
  );
  const count = useMemo(() => state.items.reduce((sum, i) => sum + i.quantity, 0), [state.items]);

  const value = { state, ...api, detailedItems, subtotalCents, count } as const;

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
