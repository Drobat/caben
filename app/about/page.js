'use client';

import { useTranslation } from '@/app/i18n/hooks/useTranslation';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#1f2937] text-white py-16">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-[#F7CE3E]">
          The Center for Academic and Business English
        </h1>

        <div className="space-y-8">
          <section className="bg-[#2d3748] p-8 rounded-lg shadow-xl">
            <p className="text-lg leading-relaxed mb-6">
              Born from the COVID-19 shift to online learning, CABEN offers real-time, 
              interactive classes for Academic and Business English. Our goal is to make 
              high-quality language education accessible, flexible, and effective.
            </p>
          </section>

          <section className="bg-[#2d3748] p-8 rounded-lg shadow-xl">
            <p className="text-lg leading-relaxed mb-6">
              Students join live classes with certified teachers, all of whom hold 
              master&apos;s degrees in ESL/EFL and have extensive teaching experience. 
              They engage in dynamic lessons using Zoom, AI-driven tools, and learning 
              management systems. This approach provides personalized, efficient learning 
              experiences that go beyond traditional methods.
            </p>
          </section>

          <section className="bg-[#2d3748] p-8 rounded-lg shadow-xl">
            <p className="text-lg leading-relaxed">
              CABEN&apos;s courses fit any schedule, from short workshops to in-depth programs, 
              with certificates marking progress. Our belief is simple: learning should be 
              accessible, interactive, and adaptable. Whether it&apos;s IELTS preparation, 
              business communication, or academic writing, CABEN is here to support your 
              journey to success.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}