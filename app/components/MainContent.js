// app/components/MainContent.js
import React from 'react';

const MainContent = () => {
  return (
    <main className="flex flex-col items-center bg-yellow-400 h-[calc(100vh-4rem)] pt-8"> 
      <div className="text-3xl md:text-4xl font-bold text-center mb-6">The English School</div>
      <div className="w-full h-full bg-gray-300"></div>
    </main>
  );
};

export default MainContent;
