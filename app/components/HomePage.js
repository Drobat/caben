import Image from 'next/image';

export default function HomePage() {
  return (
    <div
      className="h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="flex flex-col justify-start items-center h-full">
        {/* Image logo collée sous la navbar */}
        <Image
          src="/logo-owl.jpeg"
          alt="Logo Owl"
          width={300}
          height={300}
          className="mt-0" // Assurez-vous qu'il n'y a pas de marge au-dessus
          priority
        />
  
      </div>
    </div>
  );
}
