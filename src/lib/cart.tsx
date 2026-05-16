import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./products";

export type CartItem = { product: Product; qty: number };

type CartCtx = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ms-cart");
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem("ms-cart", JSON.stringify(items)); } catch {}
  }, [items]);

  const value = useMemo<CartCtx>(() => ({
    items, open, setOpen,
    add: (p, qty = 1) => {
      setItems((prev) => {
        const existing = prev.find((i) => i.product.id === p.id);
        if (existing) return prev.map((i) => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i);
        return [...prev, { product: p, qty }];
      });
      setOpen(true);
    },
    remove: (id) => setItems((prev) => prev.filter((i) => i.product.id !== id)),
    setQty: (id, qty) => setItems((prev) => prev.map((i) => i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
    clear: () => setItems([]),
    count: items.reduce((n, i) => n + i.qty, 0),
    total: items.reduce((n, i) => n + i.qty * i.product.price, 0),
  }), [items, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
};
