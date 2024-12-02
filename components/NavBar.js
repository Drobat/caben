// components/NavBar.js
"use client";

import { useState } from 'react';
import { NavLinks } from './ui/NavLinks';
import { UserMenu } from './ui/UserMenu';
import { MobileMenu } from './ui/MobileMenu';
import { LanguageSwitcher } from './ui/LanguageSwitcher';
import { useTranslation } from '@/app/i18n/hooks/useTranslation';

/**
 * Composant principal de la barre de navigation
 * Gère l'affichage responsive et l'état du menu mobile
 */
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="p-4 relative bg-[#F7CE3E]">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-black">CABEN</div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <LanguageSwitcher />
          <NavLinks t={t} />
          <UserMenu t={t} />
        </div>

        {/* Bouton Menu Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-black text-3xl z-50 relative"
          aria-label={t('nav.toggleMenu')}
        >
          &#9776;
        </button>
      </div>

      {/* Menu Mobile */}
      <MobileMenu isOpen={isOpen} onItemClick={() => setIsOpen(false)} t={t} />
    </nav>
  );
};

export default NavBar;