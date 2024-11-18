// app/components/CourseCard.js
import Image from 'next/image';
import Link from 'next/link';

export default function CourseCard() {
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

        <Link 
          href="/enroll"
          className="
            block
            w-full
            text-center
            bg-[#F7CE3E]
            text-black
            font-bold
            py-4
            rounded-lg
            border-2
            border-black
            hover:bg-opacity-90
            transition-duration-300
          "
        >
          ENROLL NOW
        </Link>
      </div>
    </div>
  );
}