// app/components/CourseCard.js
'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from './ui/Button';
import { createCheckoutSession } from '@/lib/actions/payment';

export default function CourseCard({ product }) {
  console.log('Product data:', product);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEnrollClick = async () => {
    try {
      setError('');
      setLoading(true);
      const result = await createCheckoutSession(product);
      
      if (result?.url) {
        window.location.href = result.url;
      } else {
        throw new Error('URL de paiement non disponible');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setError(error.message || 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (!product) return null;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-[#1f2937] text-white h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={product.imageUrl || "/test.svg"}
          alt={product.name}
          width={700}
          height={400}
          className="w-full h-full"
          priority
        />
      </div>
      <div className="px-6 py-4 flex-1 flex flex-col">
        <div>
          <div className="text-yellow-500 font-bold text-xl mb-4">{product.duration} HOURS</div>
          <h2 className="font-bold text-3xl mb-4">{product.name}</h2>
          <p className="text-gray-300 mb-6">
            {product.description}
          </p>
          <p className="text-gray-300 mb-6">
            Start Date: {product.startDate}
          </p>
        </div>

        <div className="mt-auto">
          {error && (
            <div className="bg-red-500 text-white p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <Button
            onClick={handleEnrollClick}
            loading={loading}
          >
            {loading ? 'Processing...' : `ENROLL NOW - €${(product.price / 100).toFixed(2)}`}
          </Button>
        </div>
      </div>
    </div>
  );
}