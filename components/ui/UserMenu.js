// components/ui/UserMenu.js
'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslation } from '@/app/i18n/hooks/useTranslation';

export const UserMenu = ({ isMobile = false, onItemClick = () => {} }) => {
  const { data: session } = useSession();
  const [showDropdown, setShowDropdown] = useState(false);
  const { t } = useTranslation();
  
  const baseClasses = `text-black ${isMobile ? 'block w-full text-center' : 'text-xl'} hover:text-gray-700`;

  if (!session) {
    return (
      <Link href="/account" onClick={onItemClick} className={baseClasses}>
        {t('nav.account')}
      </Link>
    );
  }

  if (isMobile) {
    return (
      <div className="space-y-4 w-full text-center">
        <div className={baseClasses}>
          {t('nav.greeting')} {session.user.name}
        </div>
        <button 
          onClick={() => signOut()} 
          className={`${baseClasses} font-medium`}
        >
          {t('auth.logout')}
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={baseClasses}
      >
        {t('nav.greeting')} {session.user.name}
      </button>
      
      {showDropdown && (
        <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-50">
          <button
            onClick={() => {
              signOut();
              setShowDropdown(false);
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            {t('auth.logout')}
          </button>
        </div>
      )}
    </div>
  );
};