// components/ui/UserMenu.js
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

/**
 * Composant qui gère l'affichage du menu utilisateur et l'état de connexion
 * @param {boolean} isMobile - Indique si le composant est affiché en version mobile
 * @param {Function} onItemClick - Fonction appelée lors du clic sur un élément du menu
 */
export const UserMenu = ({ isMobile = false, onItemClick = () => {}, className = '', buttonClassName = '' }) => {
  const { data: session, status } = useSession();
  const baseClasses = `text-black ${isMobile ? 'block w-full' : 'text-xl'} hover:text-gray-700 ${buttonClassName}`;
  
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

  // Affichage pour un utilisateur connecté
  return (
    <div className={`${className} ${isMobile ? '' : 'flex space-x-4'}`}>
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
};