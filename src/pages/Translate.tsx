import React, { useState } from 'react';
import { translateText } from '../services/api';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Translate() {
  const [fromLang, setFromLang] = useState('English');
  const [toLang, setToLang] = useState('Sanskrit');
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setIsLoading(true);
      const result = await translateText({ prompt: `please translate this ${inputText} from ${fromLang} to ${toLang}` });
      setTranslation(result);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <Languages className="w-12 h-12 mx-auto text-indigo-600" />
          <h1 className="mt-4 text-3xl font-bold text-gray-900">Translation Tool</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">From</label>
              <Select value={fromLang} onValueChange={setFromLang}>
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
              <label className="text-sm font-medium text-gray-700">To</label>
              <Select value={toLang} onValueChange={setToLang}>
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

          <div className="space-y-4">
            <div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to translate..."
                className="w-full h-32 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200"
              />
            </div>

            <Button
              onClick={handleTranslate}
              disabled={isLoading || !inputText}
              className="w-full"
            >
              {isLoading ? 'Translating...' : 'Translate'}
            </Button>

            {translation && (
              <div className="mt-6 animate-fade-in">
                <label className="block text-sm font-medium text-gray-700 mb-2">Translation</label>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="text-gray-900">{translation}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}