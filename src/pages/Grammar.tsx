import React, { useState, useEffect } from 'react';
import { generateGrammarExercises } from '../services/api';
import { GraduationCap, Check, X } from 'lucide-react';
import type { GrammarQuestion } from '../types/api';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Demo grammar questions
const demoQuestions: GrammarQuestion[] = [
  {
    difficulty: "beginner",
    explanation: "In Sanskrit, the verb agrees with the subject in person and number. 'पठति' is the correct form for 'he/she reads'.",
    grammaticalConcept: "Subject-Verb Agreement",
    options: [
      { isCorrect: true, text: "पठति" },
      { isCorrect: false, text: "पठामि" },
      { isCorrect: false, text: "पठन्ति" },
      { isCorrect: false, text: "पठसि" }
    ],
    question: "बालकः पुस्तकं _____। (The boy ___ a book.)"
  },
  {
    difficulty: "beginner",
    explanation: "The instrumental case (तृतीया विभक्ति) is used to show the instrument with which an action is performed.",
    grammaticalConcept: "Case Usage",
    options: [
      { isCorrect: false, text: "लेखनी" },
      { isCorrect: true, text: "लेखन्या" },
      { isCorrect: false, text: "लेखनीम्" },
      { isCorrect: false, text: "लेखन्याः" }
    ],
    question: "छात्रः _____ लिखति। (The student writes with a pen.)"
  },
  {
    difficulty: "beginner",
    explanation: "When two nouns are in apposition, they must agree in case. Here, 'नगरी' (city) and 'अयोध्या' must be in the same case.",
    grammaticalConcept: "Case Agreement",
    options: [
      { isCorrect: false, text: "अयोध्यायाः" },
      { isCorrect: false, text: "अयोध्यायाम्" },
      { isCorrect: true, text: "अयोध्या" },
      { isCorrect: false, text: "अयोध्याम्" }
    ],
    question: "_____ नगरी रामस्य जन्मभूमिः। (Ayodhya city is Ram's birthplace.)"
  }
];

export default function Grammar() {
  const [language, setLanguage] = useState('English');
  const [difficulty, setDifficulty] = useState('Easy');
  const [questions, setQuestions] = useState<GrammarQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load demo data initially
  useEffect(() => {
    setQuestions(demoQuestions);
  }, []);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await generateGrammarExercises({
        prompt: `Generate 5 ${difficulty} grammar questions in ${language}`,
      });
      setQuestions(result[language as keyof typeof result]);
      setCurrentQuestion(0);
      setScore(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } catch (err) {
      setError('Failed to generate grammar exercises. Please try again.');
      console.log(err);
      setQuestions(demoQuestions); // Fallback to demo data
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    setShowExplanation(true);
    const isCorrect = questions[currentQuestion].options.find(
      (opt) => opt.text === answer
    )?.isCorrect;
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
        setIsAnimating(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <GraduationCap className="w-12 h-12 mx-auto text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Grammar Exercises</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Language</label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Sanskrit">Sanskrit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Difficulty</label>
              <Select value={difficulty} onValueChange={setDifficulty}>
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-4 text-red-700 bg-red-100 rounded-md">
              {error}
            </div>
          )}

          <Button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Generating...' : 'Generate New Exercises'}
          </Button>

          {questions.length > 0 && (
            <div className="mt-8">
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  Score: {score}/{questions.length}
                </p>
              </div>

              <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}`}>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {questions[currentQuestion].question}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {questions[currentQuestion].grammaticalConcept}
                  </p>

                  <div className="space-y-2">
                    {questions[currentQuestion].options.map((option) => (
                      <button
                        key={option.text}
                        onClick={() => handleAnswer(option.text)}
                        disabled={selectedAnswer !== null}
                        className={`w-full p-4 text-left rounded-md transition-all duration-300 ${
                          selectedAnswer === option.text
                            ? option.isCorrect
                              ? 'bg-green-100 border-green-500'
                              : 'bg-red-100 border-red-500'
                            : 'bg-white hover:bg-gray-50'
                          } border ${
                            selectedAnswer === null
                              ? 'border-gray-300'
                              : option.isCorrect
                              ? 'border-green-500'
                              : 'border-gray-300'
                          } transform hover:scale-[1.02] active:scale-[0.98]`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{option.text}</span>
                          {selectedAnswer === option.text && (
                            option.isCorrect ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {showExplanation && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-md animate-fade-in">
                    <h4 className="font-medium text-gray-900 mb-2">Explanation</h4>
                    <p className="text-gray-700">
                      {questions[currentQuestion].explanation}
                    </p>
                  </div>
                )}

                {selectedAnswer && currentQuestion < questions.length - 1 && (
                  <Button
                    onClick={nextQuestion}
                    className="w-full animate-fade-in"
                  >
                    Next Question
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}