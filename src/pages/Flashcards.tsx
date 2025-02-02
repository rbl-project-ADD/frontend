import React, { useState, useEffect } from "react";
import { generateFlashcards } from "../services/api";
import { Car as Cards, ChevronLeft, ChevronRight, Repeat } from "lucide-react";
import type { FlashcardResponse } from "../types/api";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Demo flashcards data
const demoFlashcards: FlashcardResponse[] = [
  {
    front: { English: "Hello", Hindi: "नमस्ते", Sanskrit: null },
    back: { English: null, Hindi: null, Sanskrit: "नमस्कार" },
  },
  {
    front: { English: "Thank you", Hindi: "धन्यवाद", Sanskrit: null },
    back: { English: null, Hindi: null, Sanskrit: "धन्यवादः" },
  },
  {
    front: { English: "Good morning", Hindi: "सुप्रभात", Sanskrit: null },
    back: { English: null, Hindi: null, Sanskrit: "सुप्रभातम्" },
  },
  {
    front: { English: "Welcome", Hindi: "स्वागत", Sanskrit: null },
    back: { English: null, Hindi: null, Sanskrit: "स्वागतम्" },
  },
  {
    front: { English: "How are you?", Hindi: "आप कैसे हैं?", Sanskrit: null },
    back: { English: null, Hindi: null, Sanskrit: "कथमस्ति भवान्?" },
  },
];

export default function Flashcards() {
  const [frontLanguage1, setFrontLanguage1] =
    useState<keyof FlashcardResponse["front"]>("English");
  const [frontLanguage2, setFrontLanguage2] =
    useState<keyof FlashcardResponse["front"]>("Hindi");
  const [backLanguage, setBackLanguage] =
    useState<keyof FlashcardResponse["back"]>("Sanskrit");
  const [cards, setCards] = useState<FlashcardResponse[]>([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null
  );

  useEffect(() => {
    setCards(demoFlashcards);
  }, []);

  const handleGenerate = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await generateFlashcards({
        prompt: `5 cards front to be in ${frontLanguage1} and ${frontLanguage2} only and back in ${backLanguage} only`,
      });
      setCards(result);
      setCurrentCard(0);
      setIsFlipped(false);
      setSlideDirection(null);
    } catch (err) {
      setError("Failed to generate flashcards. Please try again.");
      console.log(err);
      setCards(demoFlashcards);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(cards, "cards");

  const nextCard = () => {
    if (currentCard < cards.length - 1) {
      setIsFlipped(false);
      setSlideDirection("left");
      setTimeout(() => {
        setCurrentCard((curr) => curr + 1);
        setTimeout(() => {
          setSlideDirection(null);
        }, 10);
      }, 200);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setIsFlipped(false);
      setSlideDirection("right");
      setTimeout(() => {
        setCurrentCard((curr) => curr - 1);
        setTimeout(() => {
          setSlideDirection(null);
        }, 10);
      }, 200);
    }
  };

  const getSlideClass = () => {
    if (!slideDirection) return "";
    return slideDirection === "left"
      ? "-translate-x-full opacity-0"
      : "translate-x-full opacity-0";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Cards className="w-12 h-12 mx-auto text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Flashcards</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Front Language 1
              </label>
              <Select
                value={frontLanguage1}
                onValueChange={(value) =>
                  setFrontLanguage1(value as typeof frontLanguage1)
                }
              >
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
              <label className="text-sm font-medium text-gray-700">
                Front Language 2
              </label>
              <Select
                value={frontLanguage2}
                onValueChange={(value) =>
                  setFrontLanguage2(value as typeof frontLanguage2)
                }
              >
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
              <label className="text-sm font-medium text-gray-700">
                Back Language
              </label>
              <Select
                value={backLanguage}
                onValueChange={(value) =>
                  setBackLanguage(value as keyof FlashcardResponse["back"])
                }
              >
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
            {isLoading ? "Generating..." : "Generate New Flashcards"}
          </Button>

          {cards.length > 0 && (
            <div className="mt-8">
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative w-full h-80 cursor-pointer perspective-1000"
              >
                <div
                  className={`absolute w-full h-full transition-all duration-500 transform-style-preserve-3d ${
                    isFlipped ? "rotate-y-180" : ""
                  } ${getSlideClass()} hover:scale-105`}
                >
                  {/* Front of card */}
                  <div className="absolute w-full h-full bg-white rounded-lg shadow-lg p-6 backface-hidden">
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="text-xl font-medium text-gray-600">
                        {frontLanguage1}:
                      </div>
                      <p className="text-2xl font-medium text-gray-900">
                        {cards[currentCard].front[frontLanguage1]}
                      </p>
                      <div className="text-xl font-medium text-gray-600 mt-4">
                        {frontLanguage2}:
                      </div>
                      <p className="text-2xl font-medium text-gray-900">
                        {cards[currentCard].front[frontLanguage2]}
                      </p>
                    </div>
                  </div>
                  {/* Back of card */}
                  <div className="absolute w-full h-full bg-indigo-600 rounded-lg shadow-lg p-6 backface-hidden rotate-y-180">
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="text-xl font-medium text-indigo-100">
                        {backLanguage}:
                      </div>
                      <p className="text-2xl font-medium text-white">
                        {cards[currentCard].back[backLanguage]}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6">
                <Button
                  onClick={prevCard}
                  disabled={currentCard === 0}
                  variant="outline"
                  size="icon"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setIsFlipped(!isFlipped)}
                  variant="outline"
                  className="flex items-center px-4"
                >
                  <Repeat className="w-4 h-4 mr-2" />
                  Flip Card
                </Button>
                <Button
                  onClick={nextCard}
                  disabled={currentCard === cards.length - 1}
                  variant="outline"
                  size="icon"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-center mt-4 text-sm text-gray-600">
                Card {currentCard + 1} of {cards.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
