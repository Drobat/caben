// app/courses/page.js
import CourseCard from '../../components/CourseCard';

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        {/* Ajoutez plus de cartes si nécessaire */}
      </div>
    </div>
  );
}