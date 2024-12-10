'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/hooks/useTranslation';
import PurchasedProducts from './PurchasedProducts';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <div 
      className="home-page h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="flex flex-col justify-start items-center h-full pb-12 overflow-y-auto">
        <Image
          src="/logo-owl.jpeg"
          alt="Logo Owl"
          width={500}
          height={500}
          className="mt-0"
          priority
        />
        <Link 
          href="/courses"
          className="
            mt-8 
            w-64
            bg-[#F7CE3E] 
            text-black 
            text-center
            border-2
            border-black 
            px-6 py-3 
            rounded-full 
            font-bold 
            hover:bg-opacity-90 
            transition-all 
            duration-300 
            shadow-lg 
            hover:shadow-xl 
            active:scale-95
            focus:outline-none 
            focus:ring-2 
            focus:ring-yellow-400 
            focus:ring-opacity-50
            inline-block
          "
        >
          {t('home.startLearning')}
        </Link>
        <PurchasedProducts />
      </div>
    </div>
  );
}