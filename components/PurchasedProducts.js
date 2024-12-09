'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export default function PurchasedProducts() {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchPurchasedProducts() {
      if (session?.user) {
        try {
          const response = await fetch('/api/purchased-products');
          const data = await response.json();
          setPurchasedProducts(data);
        } catch (error) {
          console.error('Error fetching purchased products:', error);
        }
      }
      setIsLoading(false);
    }

    fetchPurchasedProducts();
  }, [session]);

  // Ne rien afficher s'il n'y a pas de session ou pas de produits
  if (!session || !isLoading && purchasedProducts.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 px-4">
      {purchasedProducts.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Your Purchased Courses
          </h2>
          <div className="space-y-4">
            {purchasedProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-[#1f2937] rounded-lg p-6 shadow-lg text-white"
              >
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-2">{product.description}</p>
                <p className="text-yellow-500">
                  Duration: {product.duration} hours
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
} 