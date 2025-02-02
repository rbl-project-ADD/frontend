import axios from 'axios';
import type { TranslationRequest, FlashcardResponse, GrammarResponse } from '../types/api';

const API_BASE_URL = 'http://localhost:8000';

export const translateText = async (data: TranslationRequest) => {
  const response = await axios.post(`${API_BASE_URL}/translate/file`, data);
  return response.data;
};

export const generateFlashcards = async (data: TranslationRequest) => {
  const response = await axios.post<FlashcardResponse[]>(`${API_BASE_URL}/flashcards/generate`, data);
  return response.data;
};

export const generateGrammarExercises = async (data: TranslationRequest) => {
  const response = await axios.post<GrammarResponse>(`${API_BASE_URL}/grammar/generate`, data);
  console.log(response.data);
  return response.data;
};