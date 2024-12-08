// app/success/success-content.js
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/actions/getSession';
import { useTranslation } from '@/app/i18n/hooks/useTranslation';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SuccessContent() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    async function fetchSession() {
      if (sessionId) {
        const details = await getSession(sessionId);
        setPaymentDetails(details);

        if (details?.email && !session) {
          try {
            // Tentative de connexion automatique
            const result = await signIn('email', {
              email: details.email,
              redirect: false,
            });

            if (result?.error) {
              console.error('Erreur de connexion:', result.error);
            }
          } catch (error) {
            console.error('Erreur lors de la connexion automatique:', error);
          }
        }
      }
      setLoading(false);
    }

    fetchSession();
  }, [sessionId, session]);

  // Redirection si déjà connecté
  useEffect(() => {
    if (session) {
      const timer = setTimeout(() => {
        router.push('/courses');
      }, 5000); // Redirection après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [session, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1f2937] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1f2937] text-white flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4 py-8">
        <div className="mb-6">
          <svg
            className="mx-auto w-16 h-16 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4">{t('success.title')}</h1>

        {paymentDetails && (
          <div className="mb-8 text-left bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">{t('success.paymentDetails')}</h2>
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="font-semibold">{t('success.email')}:</span>{' '}
                {paymentDetails.email}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">{t('success.amountPaid')}:</span>{' '}
                €{paymentDetails.amount.toFixed(2)}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">{t('success.status')}:</span>{' '}
                <span className="text-green-500 capitalize">
                  {paymentDetails.status}
                </span>
              </p>
            </div>
          </div>
        )}

        <p className="text-gray-300 mb-8">
          {t('success.accessCreated')}
        </p>

        {session && (
          <p className="text-green-500 mt-4">
            Vous êtes connecté ! Redirection automatique...
          </p>
        )}

        <div className="space-y-4">
          <Link
            href={session ? "/courses" : "/account"}
            className="inline-block bg-[#F7CE3E] text-black px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-duration-300 w-full"
          >
            {session ? t('success.backToCourses') : t('success.accessAccount')}
          </Link>

          {!session && (
            <Link
              href="/courses"
              className="inline-block bg-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-opacity-90 transition-duration-300 w-full"
            >
              {t('success.backToCourses')}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}