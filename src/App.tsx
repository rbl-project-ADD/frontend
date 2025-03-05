import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Translate from './pages/Translate';
import Flashcards from './pages/Flashcards';
import Grammar from './pages/Grammar';
import { Book } from 'lucide-react';
import ImageRecognition from './pages/ImageRecognition';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/" className="flex items-center">
                  <Book className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">
                    Sanskrit Learning
                  </span>
                </Link>
              </div>
              <div className="flex space-x-8">
                <Link
                  to="/translate"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
                >
                  Translate
                </Link>
                <Link
                  to="/flashcards"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
                >
                  Flashcards
                </Link>
                <Link
                  to="/grammar"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
                >
                  Grammar
                </Link>
                <Link
                  to="/image"
                  className="inline-flex items-center px-1 pt-1 text-gray-900 hover:text-indigo-600"
                >
                  Image
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/translate" element={<Translate />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/image" element={<ImageRecognition />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;