"use client";

import React from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";

const Header: React.FC = () => {
  const { cart } = useCartStore();

  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="flex items-center justify-between p-4 shadow-md bg-white">
      <div className="flex items-center gap-6">
        <img src="/images/logo.png" alt="Logo" width={120} height={40} />

        <nav className="flex items-center gap-4">
          <Link href="/">Home</Link>
          <Link href={`/category?category=${encodeURIComponent("men's clothing")}`}>Mens</Link>
          <Link href={`/category?category=${encodeURIComponent("women's clothing")}`}>Womens</Link>
          <Link href={`/category?category=${encodeURIComponent("jewelery")}`}>Jewelery</Link>
          <Link href={`/category?category=${encodeURIComponent("electronics")}`}>Electronics</Link>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/Cart" className="relative flex items-center">
          🛒
          <span className="ml-1">Cart({totalItems})</span>
         
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>

        <Link href="/Wish-list" className="text-pink-500 text-lg">
          ♥
        </Link>
      </div>
    </header>
  );
};

export default Header;
