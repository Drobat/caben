// components/ui/NavLinks.js
import Link from 'next/link';

/**
 * Composant qui gère les liens de navigation principaux
 * @param {boolean} isMobile - Indique si le composant est affiché en version mobile
 * @param {Function} onItemClick - Fonction appelée lors du clic sur un lien (utile pour fermer le menu mobile)
 */
export const NavLinks = ({ isMobile = false, onItemClick = () => {}, t }) => {
  const baseClasses = `
    text-black 
    ${isMobile ? 'text-xl text-center w-full py-2' : 'text-xl'} 
    hover:text-gray-700
    transition-colors
  `;
  
  return (
    <div className={`
      ${isMobile ? 'flex flex-col space-y-4 w-full items-center' : 'flex space-x-4'}
    `}>
      <Link href="/" onClick={onItemClick} className={baseClasses}>
        {t('nav.home')}
      </Link>
      <Link href="/courses" onClick={onItemClick} className={baseClasses}>
        {t('nav.courses')}
      </Link>
      <Link href="/about" onClick={onItemClick} className={baseClasses}>
        {t('nav.about')}
      </Link>
    </div>
  );
};