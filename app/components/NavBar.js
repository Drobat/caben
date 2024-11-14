"use client";

import { useState } from 'react';
import Link from 'next/link';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-yellow-400 p-4 relative">
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold">The English School</div>

                <div className="hidden md:flex space-x-4 ml-auto">
                    <Link href="/" className="text-black hover:text-gray-700">Home</Link>
                    <Link href="/courses" className="text-black hover:text-gray-700">Courses</Link>
                    <Link href="/about" className="text-black hover:text-gray-700">About Us</Link>
                    <Link href="/signin" className="text-black hover:text-gray-700">Access Account</Link>
                   
                </div>

                <button
                    onClick={toggleMenu}
                    className="md:hidden text-black text-3xl z-50 relative"
                    style={{ color: "black", zIndex: 50 }}
                >
                    &#9776;
                </button>
            </div>

 
            {isOpen && (
                <div className="absolute top-[4rem] left-0 w-full bg-white shadow-lg md:hidden z-40">
                    <ul className="flex flex-col items-center py-4 space-y-4">
                        <li>
                            <Link href="/" onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700">Home</Link>
                        </li>
                        <li>
                            <Link href="/courses" onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700">Courses</Link>
                        </li>
                        <li>
                            <Link href="/about" onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700">About Us</Link>
                        </li>
                        <li>
                            <Link href="/signin" onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700">Access Account</Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;
