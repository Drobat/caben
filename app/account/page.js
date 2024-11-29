// app/account/page.js
'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // On envoie la demande de connexion avec callbackUrl pour la redirection après vérification
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/dashboard', // Page où rediriger après connexion réussie
      });

      if (!result?.ok) {
        // Vérifions plus précisément la nature de l'erreur
        if (result?.error === 'Email not found') {
          setError('Ce compte n\'existe pas. Contactez-nous pour accéder à nos services.');
        } else {
          setError('Une erreur est survenue lors de la connexion. Veuillez réessayer.');
        }
      } else {
        // Si tout va bien, on redirige vers la page de vérification
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
    <div className="min-h-screen bg-[#1f2937] flex items-center justify-center px-4">
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
    </div>
  );
}