// components/NavBar.js
"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();
    const welcomeMessage = session?.user?.name 
    ? `Hi, ${session.user.name}!` 
    : "Hi!";
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="p-4 relative" style={{ backgroundColor: '#F7CE3E' }}>
            <div className="flex justify-between items-center">
                <div className="text-2xl font-bold text-black">CABEN</div>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-4 ml-auto">
                    <Link href="/" className="text-black text-xl hover:text-gray-700">Home</Link>
                    <Link href="/courses" className="text-black text-xl hover:text-gray-700">Courses</Link>
                    <Link href="/about" className="text-black text-xl hover:text-gray-700">About Us</Link>
                    {status === 'loading' ? (
                        <span className="text-black text-xl">...</span>
                    ) : session ? (
                        <>
                            <Link href="/account" className="text-black text-xl hover:text-gray-700">
                                Mon Compte
                            </Link>
                            <button
                                onClick={() => {
                                    console.log("Déconnexion demandée");
                                    signOut().then(() => {
                                        console.log("Déconnexion réussie");
                                    }).catch((error) => {
                                        console.error("Erreur lors de la déconnexion:", error);
                                    });
                                }}
                                className="text-black text-xl hover:text-gray-700"
                            >
                                Déconnexion
                            </button>
                        </>
                    ) : (
                        <Link href="/account" className="text-black text-xl hover:text-gray-700">
                            Account
                        </Link>
                    )}
                </div>

                {/* Hamburger Menu */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden text-black text-3xl z-50 relative"
                >
                    &#9776;
                </button>
            </div>

            {/* Mobile Menu */}
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
                        {status === 'loading' ? (
                            <li>
                                <span className="text-black">...</span>
                            </li>
                        ) : session ? (
                            <>
                                <li>
                                    <Link href="/account" onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700">
                                        Mon Compte
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={() => {
                                            console.log("Déconnexion demandée");
                                            signOut().then(() => {
                                                console.log("Déconnexion réussie");
                                            }).catch((error) => {
                                                console.error("Erreur lors de la déconnexion:", error);
                                            });
                                        }}
                                        className="text-black hover:text-gray-700"
                                    >
                                        Déconnexion
                                    </button>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link href="/account" onClick={() => setIsOpen(false)} className="text-black hover:text-gray-700">
                                    Account
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default NavBar;