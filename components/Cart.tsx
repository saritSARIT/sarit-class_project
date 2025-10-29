"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishListStore";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200); 
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col justify-between shadow-md hover:shadow-lg transition">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 object-contain mx-auto mb-4"
      />

      <div className="flex-1">
        <h3 className="font-bold text-lg">{product.title}</h3>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
        <p className="font-semibold text-lg mt-2">${product.price}</p>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={handleAddToCart}
          className={`px-3 py-1 rounded-md text-white transition ${
            added ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {added ? "Added!" : "Add to Cart"}
        </button>

        <button
          onClick={() => toggleWishlist(product)}
          className={`px-3 py-1 rounded-md border ${
            isInWishlist(product.id)
              ? "bg-pink-500 text-white"
              : "text-pink-500 border-pink-500"
          }`}
        >
          ♥
        </button>
      </div>
    </div>
  );
}
