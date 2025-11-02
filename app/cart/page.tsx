"use client";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartStore();

  const total = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);

  if (cart.length === 0) {
    return (
      <main className="p-10 text-center">
        <h1 className="text-2xl font-semibold mb-4">Your cart is empty 🛒</h1>
        <p className="text-gray-500">Start adding products to see them here!</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Shopping Cart</h1>

      <ul className="space-y-6">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain"
              />
              <div>
                <p className="font-semibold text-lg">{item.title}</p>
                <p className="text-gray-600">${item.price.toFixed(2)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                -
              </button>
              <span className="font-semibold">{item.quantity}</span>
              <button
                onClick={() => increaseQuantity(item.id)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 text-right">
        <p className="text-2xl font-bold mb-3">Total: ${total.toFixed(2)}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={clearCart}
            className="bg-gray-600 text-white px-5 py-2 rounded-md hover:bg-gray-700"
          >
            Clear Cart
          </button>

          <button className="bg-green-600 text-white px-5 py-2 rounded-md hover:bg-green-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </main>
  );
}
