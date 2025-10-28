import { useState, useCallback } from 'react';
import { COUNTRIES, getRandomCountry } from '../data/countries';

export function useWordList() {
  const [currentWord, setCurrentWord] = useState(() => getRandomCountry());

  const getRandomWord = useCallback(() => {
    const newWord = getRandomCountry();
    setCurrentWord(newWord);
    return newWord;
  }, []);

  return {
    currentWord,
    getRandomWord
  };
}