// components/ui/MobileMenu.js
import { NavLinks } from './NavLinks';
import { UserMenu } from './UserMenu';
import { LanguageSwitcher } from './LanguageSwitcher';

/**
 * Composant qui gère l'affichage du menu en version mobile
 * @param {boolean} isOpen - État d'ouverture du menu mobile
 * @param {Function} onItemClick - Fonction pour fermer le menu lors d'un clic
 */
export const MobileMenu = ({ isOpen, onItemClick, t }) => {
  // Si le menu n'est pas ouvert, on ne rend rien
  if (!isOpen) return null;

  return (
    // Le conteneur principal utilise absolute pour se positionner sous la navbar
    <div className="absolute top-[4rem] left-0 w-full bg-white shadow-lg md:hidden z-40">
      {/* Conteneur flex pour organiser verticalement les éléments */}
      <div className="flex flex-col w-full p-6 space-y-6">
        {/* Ajout d'un conteneur spécifique pour les drapeaux */}
        <div className="flex justify-center">
          <LanguageSwitcher isMobile />
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col items-center space-y-4">
          <NavLinks isMobile onItemClick={onItemClick} t={t} />
        </div>
        <div className="border-t border-gray-200 pt-6 flex justify-center">
          <UserMenu isMobile onItemClick={onItemClick} t={t} />
        </div>
      </div>
    </div>
  );
};