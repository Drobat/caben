// app/success/page.js
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getSession } from '@/lib/actions/getSession';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      if (sessionId) {
        const details = await getSession(sessionId);
        setPaymentDetails(details);
      }
      setLoading(false);
    }

    fetchSession();
  }, [sessionId]);

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
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        
        {paymentDetails && (
          <div className="mb-8 text-left bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Payment Details</h2>
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="font-semibold">Email:</span>{' '}
                {paymentDetails.email}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Amount Paid:</span>{' '}
                €{paymentDetails.amount.toFixed(2)}
              </p>
              <p className="text-gray-300">
                <span className="font-semibold">Status:</span>{' '}
                <span className="text-green-500 capitalize">
                  {paymentDetails.status}
                </span>
              </p>
            </div>
          </div>
        )}

        <p className="text-gray-300 mb-8">
          Course access details have been sent to your email.
          You will receive your login credentials shortly.
        </p>

        <Link 
          href="/courses"
          className="
            inline-block
            bg-[#F7CE3E]
            text-black
            px-6
            py-3
            rounded-lg
            font-bold
            hover:bg-opacity-90
            transition-duration-300
          "
        >
          Return to Courses
        </Link>
      </div>
    </div>
  );
}