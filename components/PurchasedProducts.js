'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useTranslation } from '@/app/i18n/hooks/useTranslation';

export default function PurchasedProducts() {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session, status } = useSession();
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchPurchasedProducts() {
      if (status === 'authenticated' && session?.user) {
        try {
          const response = await fetch('/api/user/purchases', {
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include'
          });
          
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          console.log('Fetched products:', data);
          setPurchasedProducts(data.products || []);
        } catch (error) {
          console.error('Error fetching purchased products:', error);
        }
      }
      setIsLoading(false);
    }

    fetchPurchasedProducts();
  }, [session, status]);

  const handleStartLearning = () => {
    // Redirection vers Zoom
    window.open('https://zoom.us/j/your-meeting-id', '_blank');
  };

  if (status === 'loading' || isLoading) {
    return null;
  }

  if (status !== 'authenticated') {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4 flex flex-col items-center">
      {purchasedProducts.length > 0 && (
        <div className="space-y-4 w-full max-w-md">
          {purchasedProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-[#1f2937] rounded-lg p-6 shadow-lg text-white hover:bg-[#2d3748] transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-300">{product.startDate}</p>
              <p className="text-yellow-500 mt-2">
                Duration: {product.duration} hours
              </p>
              <button
                onClick={handleStartLearning}
                className="mt-4 w-full bg-[#F7CE3E] text-black py-2 px-4 rounded-md hover:bg-opacity-90 transition-all font-medium"
              >
                START LEARNING
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 