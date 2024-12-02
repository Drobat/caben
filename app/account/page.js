// app/account/page.js
'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

// Composant qui utilise useSearchParams
function AccountForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();

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
        setError(`No account is associated with this email address. 
To log in, please use the email address that was used to purchase your course. 
If the issue persists, please contact our support team at contact@caben.com`);
        return;
      }

      if (result?.ok) {
        router.push('/account/verify');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setError('Une erreur inattendue est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Accéder à mon compte
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label 
            htmlFor="email" 
            className="block text-lg mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md text-gray-900"
            placeholder="votre@email.com"
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
          {loading ? 'Envoi en cours...' : 'Recevoir le lien de connexion'}
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