// app/components/CourseCard.js
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/Button';
import { createCheckoutSession } from '@/lib/actions/payment';

export default function CourseCard() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnrollClick = async () => {
    try {
      setError('');
      setLoading(true);
      
      const result = await createCheckoutSession();
      
      if (result.error) {
        throw new Error(result.error);
      }
      
      if (!result?.url) {
        throw new Error('URL de paiement non disponible');
      }

      window.location.href = result.url;
      
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#1f2937] text-white">
      <div className="relative h-48">
        <Image
          src="/test.svg"
          alt="Business English Course"
          width={700}
          height={400}
          className="w-full h-full"
          priority
        />
      </div>
      <div className="px-6 py-4">
        <div className="text-yellow-500 font-bold text-xl mb-4">250 HOURS</div>
        <h2 className="font-bold text-3xl mb-4">Business English</h2>
        <p className="text-gray-300 mb-6">
          Welcome to our courses in Business English. Here we offer you a range of premier English programs on everything from nursing to engineering to aviation. Whether your team requires test-preparation courses or those in...
        </p>

        {error && (
          <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleEnrollClick}
          disabled={loading}
          className="w-full"
        >
          {loading ? 'Processing...' : 'ENROLL NOW'}
        </Button>
      </div>
    </div>
  );
}