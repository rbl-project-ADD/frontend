import React from 'react';

interface LanguageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  languages?: string[];
}

export default function LanguageSelector({ value, onChange, languages = ['English', 'Hindi', 'Sanskrit'] }: LanguageSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="block w-full px-4 py-2 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
    >
      {languages.map((lang) => (
        <option key={lang} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}