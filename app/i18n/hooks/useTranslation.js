'use client';

import { useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { en } from '../locales/en';
import { fr } from '../locales/fr';
import { zh } from '../locales/zh';

const translations = { en, fr, zh };

export function useTranslation() {
  const router = useRouter();
  const pathname = usePathname();
  
  // Récupérer la langue depuis localStorage ou utiliser l'anglais par défaut
  const getCurrentLocale = useCallback(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('locale') || 'en';
    }
    return 'en';
  }, []);

  const t = useCallback((key) => {
    const locale = getCurrentLocale();
    const keys = key.split('.');
    let translation = translations[locale];
    
    for (const k of keys) {
      translation = translation?.[k];
    }
    
    return translation || key;
  }, [getCurrentLocale]);

  const changeLocale = useCallback((locale) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', locale);
      router.refresh();
    }
  }, [router]);

  return { t, changeLocale, getCurrentLocale };
} 