"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const Header: React.FC = () => {
  const { cart, updateQuantity } = useCartStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white relative z-50">
     
      <div className="flex items-center gap-6">
        <img src="/images/logo.png" alt="Logo" width={120} height={40} />

        <nav className="flex items-center gap-4 font-medium">
          <Link href="/">Home</Link>
          <Link
            href={`/category?category=${encodeURIComponent("men's clothing")}`}
          >
            Mens
          </Link>
          <Link
            href={`/category?category=${encodeURIComponent("women's clothing")}`}
          >
            Womens
          </Link>
          <Link href={`/category?category=${encodeURIComponent("jewelery")}`}>
            Jewelery
          </Link>
          <Link
            href={`/category?category=${encodeURIComponent("electronics")}`}
          >
            Electronics
          </Link>
        </nav>
      </div>

      
      <div className="flex items-center gap-6 relative">
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="flex items-center gap-1 cursor-pointer select-none">
            🛒 <span>Cart ({totalItems})</span>
          </div>

         {showDropdown && (
  <div className="absolute right-0 mt-3 w-[420px] bg-white border border-gray-200 shadow-2xl rounded-xl overflow-hidden transition-all z-50">
    {cart.length === 0 ? (
      <div className="p-6 text-center text-gray-500 text-sm">
        Your cart is empty 🛒
      </div>
    ) : (
      <>
        <div className="max-h-[400px] overflow-y-auto px-4 py-3 divide-y divide-gray-100">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 py-3"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-contain rounded-md border"
              />
              <div className="flex-1">
                <p className="font-semibold text-sm line-clamp-2">{item.title}</p>
                <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>

                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-2 py-1 border rounded-md hover:bg-gray-100"
                    >
                      −
                    </button>
                    <span className="min-w-[24px] text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded-md hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-semibold text-gray-700 text-sm">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t bg-gray-50 p-4 sticky bottom-0 flex flex-col gap-3">
          <div className="flex justify-between font-semibold text-base">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <Link
            href="/cart"
            className="w-full bg-blue-600 text-white py-2 rounded-md text-center hover:bg-blue-700 transition"
          >
            View Cart
          </Link>

          <button
            disabled
            className="w-full bg-green-600 text-white py-2 rounded-md opacity-70 cursor-not-allowed"
          >
            Proceed to Checkout
          </button>
        </div>
      </>
    )}
  </div>
)}
        </div>

       
        <Link href="/Wish-list" className="text-pink-500 text-lg">
          ♥
        </Link>
      </div>
    </header>
  );
};

export default Header;
