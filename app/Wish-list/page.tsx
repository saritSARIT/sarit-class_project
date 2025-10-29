"use client";

import React from "react";
import { useWishlistStore } from "@/store/wishListStore";

export default function WishListPage() {
  const { items, toggleWishlist, isInWishlist } = useWishlistStore();

  if (!items || items.length === 0) {
    return (
      <main className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
        <p>No items in your wishlist.</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition"
          >
            <img
              src={product.image}
              alt={product.title}
              className="h-48 object-contain mx-auto mb-4"
            />

            <div className="flex-1 text-center">
              <h3 className="font-bold text-lg">{product.title}</h3>
              <p className="text-gray-700 mt-2 text-sm">${product.price}</p>
            </div>

            <button
              onClick={() => toggleWishlist(product)}
              className={`mt-4 px-3 py-1 rounded-md border transition-colors duration-200 ${
                isInWishlist(product.id)
                  ? "bg-pink-500 text-white border-pink-500"
                  : "bg-white text-pink-500 border-pink-500"
              }`}
            >
              ♥ Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
