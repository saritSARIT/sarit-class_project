import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  quantity?: number;
}

interface CartState {
  items: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (product) => {
    const items = get().items;
    const existing = items.find(p => p.id === product.id);
    const updated = existing
      ? items.map(p => p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p)
      : [...items, { ...product, quantity: 1 }];
    set({ items: updated });
  },
  removeFromCart: (id) => set({ items: get().items.filter(p => p.id !== id) }),
}));

