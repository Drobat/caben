// app/cancel/page.js
'use client';

import Link from 'next/link';
import { useTranslation } from '@/app/i18n/hooks/useTranslation';

export default function CancelPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#1f2937] text-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4 py-8">
        <div className="mb-6">
          <svg 
            className="mx-auto w-16 h-16 text-red-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M6 18L18 6M6 6l12 12" 
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('cancel.title')}</h1>
        <p className="text-gray-300 mb-8">
          {t('cancel.message')}
        </p>
        <div className="space-y-4">
          <Link 
            href="/courses"
            className="
              inline-block
              bg-[#F7CE3E]
              text-black
              px-6
              py-3
              rounded-lg
              font-bold
              hover:bg-opacity-90
              transition-duration-300
              w-full
              mb-4
            "
          >
            {t('cancel.tryAgain')}
          </Link>
          <Link 
            href="mailto:support@example.com"
            className="
              inline-block
              bg-gray-600
              text-white
              px-6
              py-3
              rounded-lg
              font-bold
              hover:bg-opacity-90
              transition-duration-300
              w-full
            "
          >
            {t('cancel.contactSupport')}
          </Link>
        </div>
      </div>
    </div>
  );
}