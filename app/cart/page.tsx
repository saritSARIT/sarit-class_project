"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (cart.length === 0) {
    return <p className="p-6 text-lg">Your cart is empty.</p>;
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>

      <ul className="space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center justify-between border-b pb-2">
            <div className="flex items-center gap-4">
              <img src={item.image} alt={item.title} className="w-16 h-16 object-contain" />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p>${item.price} × {item.quantity}</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-6 text-right">
        <p className="font-bold text-xl">Total: ${total.toFixed(2)}</p>
        <button
          onClick={clearCart}
          className="bg-gray-700 text-white px-4 py-2 mt-2 rounded-md hover:bg-gray-800"
        >
          Clear Cart
        </button>
      </div>
    </main>
  );
}
