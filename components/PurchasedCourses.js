'use client';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import CourseCard from './CourseCard';

export default function PurchasedCourses() {
  const { data: session } = useSession();
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPurchasedProducts() {
      if (session?.user?.id) {
        try {
          const response = await fetch(`/api/user/purchases`);
          const data = await response.json();
          setPurchasedProducts(data.products || []);
        } catch (error) {
          console.error('Error fetching purchased products:', error);
        } finally {
          setLoading(false);
        }
      }
    }

    fetchPurchasedProducts();
  }, [session]);

  if (!session) return null;
  if (loading) return <div className="text-center">Loading...</div>;
  if (purchasedProducts.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Mes cours</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {purchasedProducts.map((product) => (
          <CourseCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 