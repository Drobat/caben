// app/courses/page.js
import { prisma } from '@/lib/prisma';
import CourseCard from '../../components/CourseCard';

export default async function CoursesPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
  });

  return (
    <div className="container mx-auto px-4 py-8 bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 bg-transparent">
        {products.map((product) => (
          <CourseCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}