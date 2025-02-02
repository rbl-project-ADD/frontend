import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Car as Cards, GraduationCap, Languages } from 'lucide-react';

const features = [
  {
    icon: <Languages className="w-8 h-8" />,
    title: 'Translation',
    description: 'Translate between Sanskrit, Hindi, and English with ease.',
    path: '/translate',
  },
  {
    icon: <Cards className="w-8 h-8" />,
    title: 'Flashcards',
    description: 'Create and study flashcards to memorize vocabulary and concepts.',
    path: '/flashcards',
  },
  {
    icon: <GraduationCap className="w-8 h-8" />,
    title: 'Grammar Exercises',
    description: 'Practice grammar with interactive exercises and instant feedback.',
    path: '/grammar',
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Book className="w-16 h-16 mx-auto text-indigo-600" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900 sm:text-5xl">
            Sanskrit Learning Platform
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Your journey to mastering Sanskrit starts here
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <Link
              key={feature.path}
              to={feature.path}
              className="relative group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Learning Tips
          </h2>
          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full"></span>
              <span className="ml-3">Start with basic vocabulary and common phrases</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full"></span>
              <span className="ml-3">Practice pronunciation with audio resources</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 w-1.5 h-1.5 mt-2 bg-indigo-500 rounded-full"></span>
              <span className="ml-3">Regular practice with flashcards enhances retention</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}