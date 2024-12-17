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
    <div className="w-full max-w-4xl">
      {/* Welcome Section */}
      <div className="bg-[#2d3748] rounded-lg p-8 mb-8 text-white">
        <h1 className="text-3xl font-bold mb-6 text-[#F7CE3E]">
          Welcome to CABEN!
        </h1>
        <p className="text-gray-300 mb-4">
          This is your personal student account — your one-stop hub for everything 
          you need to succeed in your Academic and Business English journey.
        </p>
      </div>

      {/* Features Grid avec effets hover */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#2d3748] rounded-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#374151] cursor-pointer">
          <h2 className="text-xl font-semibold mb-3 text-[#F7CE3E]">
            View Your Schedule
          </h2>
          <p className="text-gray-300">
            Stay on top of your classes with an easy-to-access schedule that keeps 
            you informed about upcoming lessons and important dates.
          </p>
        </div>

        <div className="bg-[#2d3748] rounded-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#374151] cursor-pointer">
          <h2 className="text-xl font-semibold mb-3 text-[#F7CE3E]">
            Access Your Billing Information
          </h2>
          <p className="text-gray-300">
            View payment details, download receipts, and track your payment history 
            for complete transparency.
          </p>
        </div>

        <div className="bg-[#2d3748] rounded-lg p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-[#374151] cursor-pointer">
          <h2 className="text-xl font-semibold mb-3 text-[#F7CE3E]">
            Explore the Resource Center
          </h2>
          <p className="text-gray-300">
            Get access to exclusive learning materials, study guides, and other 
            valuable resources to help you master your course content.
          </p>
        </div>
      </div>

      {/* Login Form */}
      <div className="bg-[#2d3748] rounded-lg p-8 text-white">
        <h2 className="text-2xl font-bold mb-8 text-[#F7CE3E] text-center">
          {t('auth.title')}
        </h2>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
          <div>
            <label 
              htmlFor="email" 
              className="block text-lg mb-2 text-gray-300"
            >
              
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#1f2937] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:border-[#F7CE3E] focus:ring-1 focus:ring-[#F7CE3E] transition-colors"
              placeholder={t('auth.emailPlaceholder')}
            />
          </div>

          {error && (
            <div className="bg-red-900/50 text-red-200 p-4 rounded-md text-center border border-red-500">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#F7CE3E] text-black rounded-md text-lg font-medium hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? t('auth.loading') : t('auth.submitButton')}
          </button>
        </form>
      </div>

      {/* Nouvelle section "Anything Else?" */}
      <div className="bg-[#2d3748] rounded-lg p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4 text-[#F7CE3E]">
          Anything Else?
        </h2>
        <p className="text-gray-300 mb-6">
          We&apos;re always looking for ways to improve your experience. If there&apos;s something 
          you&apos;d like to see added to your account, let us know!
        </p>
        <a 
          href="mailto:contact@caben.com"
          className="inline-block bg-[#F7CE3E] text-black px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}

// Page principale qui enveloppe le formulaire dans Suspense
export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#1f2937] py-12 px-4">
      <div className="container mx-auto flex justify-center">
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
    </div>
  );
}