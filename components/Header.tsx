import React from 'react';
import Link from 'next/link';


interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({ }) => {
    return (
        <header className="flex items-center justify-between p-4">
            <div className="flex items-center gap-6">
                <img src="/images/logo.png" alt="Logo" width={120} height={40} />

                <nav className="flex items-center gap-4">
                    <Link href="/">Home</Link>
                    <Link href={`/category?category=${encodeURIComponent("men's clothing")}`}>Mens</Link>
                    <Link href={`/category?category=${encodeURIComponent("women's clothing")}`}>Womens</Link>
                    <Link href={`/category?category=${encodeURIComponent('jewelery')}`}>Jewelery</Link>
                    <Link href={`/category?category=${encodeURIComponent('electronics')}`}>Electronics</Link>
                </nav>
            </div>
            <div className="flex items-center gap-4">
                <Link href="/Cart">Cart()</Link>
                <Link href="/Wish-list">♥</Link>
            </div>
        </header>
    );
};

export default Header;

