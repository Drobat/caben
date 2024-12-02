'use client';

import { useTranslation } from '@/app/i18n/hooks/useTranslation';

export default function VerifyPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#1f2937] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-4">
          {t('verify.title')}
        </h2>
        <div className="text-center text-gray-600">
          <p className="mb-4">
            {t('verify.message')}
          </p>
          <p>
            {t('verify.checkSpam')}
          </p>
        </div>
      </div>
    </div>
  );
}