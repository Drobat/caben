// components/ui/MobileMenu.js
import { NavLinks } from './NavLinks';
import { UserMenu } from './UserMenu';

/**
 * Composant qui gère l'affichage du menu en version mobile
 * @param {boolean} isOpen - État d'ouverture du menu mobile
 * @param {Function} onItemClick - Fonction pour fermer le menu lors d'un clic
 */
export const MobileMenu = ({ isOpen, onItemClick }) => {
  // Si le menu n'est pas ouvert, on ne rend rien
  if (!isOpen) return null;

  return (
    // Le conteneur principal utilise absolute pour se positionner sous la navbar
    <div className="absolute top-[4rem] left-0 w-full bg-white shadow-lg md:hidden z-40">
      {/* Conteneur flex pour organiser verticalement les éléments */}
      <div className="flex flex-col w-full">
        {/* Suppression de la liste ul/li pour un contrôle plus direct du layout */}
        <div className="w-full border-b border-gray-200">
          <NavLinks 
            isMobile 
            onItemClick={onItemClick}
            // Ajout de classes spécifiques pour le style mobile
            className="flex flex-col w-full"
            linkClassName="text-black hover:bg-gray-100 px-6 py-4 text-lg w-full block text-left"
          />
        </div>
        
        <div className="w-full">
          <UserMenu 
            isMobile 
            onItemClick={onItemClick}
            // Styles cohérents avec NavLinks
            className="flex flex-col w-full"
            buttonClassName="text-black hover:bg-gray-100 px-6 py-4 text-lg w-full text-left"
          />
        </div>
      </div>
    </div>
  );
};