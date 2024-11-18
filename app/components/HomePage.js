import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div 
    className="home-page h-screen bg-cover bg-center"
    style={{ backgroundImage: "url('/bg.jpg')" }}
  >
      <div className="flex flex-col justify-start items-center h-full">

        <Image
          src="/logo-owl.jpeg"
          alt="Logo Owl"
          width={500}
          height={500}
          className="mt-0" // Assurez-vous qu'il n'y a pas de marge au-dessus
          priority
        />
<Link 
  href="/courses"
  className="
    mt-8 
    bg-[#F7CE3E] 
    text-black 
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
  Accéder aux cours
</Link>

      </div>
    </div>
  );
}
