import { create } from "zustand";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("wishlist") || "[]")
      : [],

  toggleWishlist: (product) => {
    const { items } = get();
    const exists = items.some((p) => p.id === product.id);
    const updated = exists
      ? items.filter((p) => p.id !== product.id)
      : [...items, product];

    set({ items: updated });
    localStorage.setItem("wishlist", JSON.stringify(updated));
  },

  isInWishlist: (id) => get().items.some((p) => p.id === id),
}));