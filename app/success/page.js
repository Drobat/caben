import { Suspense } from 'react';
import SuccessContent from './success-content';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#1f2937] text-white">
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#1f2937] text-white flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </div>
  );
}