// app/account/page.js
'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from '@/app/i18n/hooks/useTranslation';

// Composant qui utilise useSearchParams
function AccountForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  const { t } = useTranslation();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/'
      });

      if (result?.error) {
        setError(t('auth.error'));
        return;
      }

      if (result?.ok) {
        router.push('/account/verify');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError(t('auth.error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">
        {t('auth.title')}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="email" 
            className="block text-lg mb-2 text-gray-900"
          >
            {t('auth.emailLabel')}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-900"
            placeholder={t('auth.emailPlaceholder')}
          />
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-[#F7CE3E] text-black rounded-md text-lg font-medium hover:bg-opacity-90 transition-all"
        >
          {loading ? t('auth.loading') : t('auth.submitButton')}
        </button>
      </form>
    </div>
  );
}

// Page principale qui enveloppe le formulaire dans Suspense
export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#1f2937] flex items-center justify-center px-4">
      <Suspense fallback={
        <div className="w-full max-w-md bg-white rounded-lg p-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-8"></div>
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      }>
        <AccountForm />
      </Suspense>
    </div>
  );
}