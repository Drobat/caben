// components/ui/UserMenu.js
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

/**
 * Composant qui gère l'affichage du menu utilisateur et l'état de connexion
 * @param {boolean} isMobile - Indique si le composant est affiché en version mobile
 * @param {Function} onItemClick - Fonction appelée lors du clic sur un élément du menu
 */
export const UserMenu = ({ isMobile = false, onItemClick = () => {}, className = '', buttonClassName = '' }) => {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const baseClasses = `text-black ${isMobile ? 'block w-full' : 'text-xl'} hover:text-gray-700 ${buttonClassName}`;
  
  // Ferme le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Affichage pendant le chargement de la session
  if (status === 'loading') {
    return <span className={baseClasses}>Account</span>;
  }

  // Affichage pour un utilisateur non connecté
  if (!session) {
    return (
      <Link href="/account" onClick={onItemClick} className={baseClasses}>
        Account
      </Link>
    );
  }

  if (isMobile) {
    return (
      <div className={`${className}`}>
        <Link href="/account" onClick={onItemClick} className={baseClasses}>
          Hi, {session.user.name}!
        </Link>
        <button 
          onClick={() => {
            signOut();
            onItemClick();
          }} 
          className={baseClasses}
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`${baseClasses} flex items-center`}
      >
        Hi, {session.user.name}!
      </button>
      
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <button
            onClick={() => {
              signOut();
              setIsDropdownOpen(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};