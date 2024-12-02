// components/ui/NavLinks.js
import Link from 'next/link';

/**
 * Composant qui gère les liens de navigation principaux
 * @param {boolean} isMobile - Indique si le composant est affiché en version mobile
 * @param {Function} onItemClick - Fonction appelée lors du clic sur un lien (utile pour fermer le menu mobile)
 */
export const NavLinks = ({ isMobile = false, onItemClick = () => {}, className = '', linkClassName = '' }) => {
  const baseClasses = `text-black ${isMobile ? 'block w-full' : 'text-xl'} hover:text-gray-700 ${linkClassName}`;
  
  return (
    <div className={`${className} ${isMobile ? '' : 'flex space-x-4'}`}>
      <Link href="/" onClick={onItemClick} className={baseClasses}>
        Home
      </Link>
      <Link href="/courses" onClick={onItemClick} className={baseClasses}>
        Courses
      </Link>
      <Link href="/about" onClick={onItemClick} className={baseClasses}>
        About Us
      </Link>
    </div>
  );
};