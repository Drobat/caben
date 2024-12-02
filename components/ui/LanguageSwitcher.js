'use client';

import { useTranslation } from '@/app/i18n/hooks/useTranslation';

export const LanguageSwitcher = ({ isMobile }) => {
  const { changeLocale, getCurrentLocale } = useTranslation();
  const currentLocale = getCurrentLocale();

  const buttonClasses = `
    p-2 
    rounded 
    transition-all 
    duration-200 
    hover:bg-gray-100
    ${isMobile ? 'text-2xl' : 'text-3xl'}
  `;

  return (
    <div className={`flex items-center ${isMobile ? 'justify-center space-x-4' : 'space-x-3'}`}>
      <button
        onClick={() => changeLocale('en')}
        className={`${buttonClasses} ${currentLocale === 'en' ? 'bg-gray-200' : ''}`}
        aria-label="English"
      >
        🇬🇧
      </button>
      <button
        onClick={() => changeLocale('zh')}
        className={`${buttonClasses} ${currentLocale === 'zh' ? 'bg-gray-200' : ''}`}
        aria-label="中文"
      >
        🇨🇳
      </button>
      <button
        onClick={() => changeLocale('fr')}
        className={`${buttonClasses} ${currentLocale === 'fr' ? 'bg-gray-200' : ''}`}
        aria-label="Français"
      >
        🇫🇷
      </button>
    </div>
  );
}; 