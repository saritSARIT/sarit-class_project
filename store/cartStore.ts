import { create } from "zustand";

interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  addToCart: (product) => {
    const existing = get().cart.find((p) => p.id === product.id);
    if (existing) {
      
      set({
        cart: get().cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        ),
      });
    } else {
    
      set({
        cart: [...get().cart, { ...product, quantity: 1 }],
      });
    }
  },
  removeFromCart: (id) =>
    set({ cart: get().cart.filter((p) => p.id !== id) }),
  clearCart: () => set({ cart: [] }),
}));
