"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const Header: React.FC = () => {
  const { cart } = useCartStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white relative">
     
      <div className="flex items-center gap-6">
        <img src="/images/logo.png" alt="Logo" width={120} height={40} />

        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href={`/category?category=${encodeURIComponent("men's clothing")}`}>
            Mens
          </Link>
          <Link href={`/category?category=${encodeURIComponent("women's clothing")}`}>
            Womens
          </Link>
          <Link href={`/category?category=${encodeURIComponent("jewelery")}`}>
            Jewelery
          </Link>
          <Link href={`/category?category=${encodeURIComponent("electronics")}`}>
            Electronics
          </Link>
        </nav>
      </div>

     
      <div className="flex items-center gap-4 relative">
       
        <div
          className="relative"
          onMouseEnter={() => setShowDropdown(true)}
          onMouseLeave={() => setShowDropdown(false)}
        >
          <Link href="/cart" className="flex items-center gap-1">
            🛒 <span>Cart ({totalItems})</span>
          </Link>

         
          {showDropdown && cart.length > 0 && (
            <div className="absolute right-0 mt-2 w-64 bg-white border shadow-lg rounded-lg z-50">
              <div className="p-2 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 mb-2 border-b pb-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-10 h-10 object-contain"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-semibold truncate">{item.title}</p>
                      <p>${item.price} × {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t text-center">
                <Link
                  href="/cart"
                  className="inline-block bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                >
                  View Cart
                </Link>
              </div>
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
