import { useState, useCallback, useMemo } from 'react';

const MAX_ATTEMPTS = 6;

export function useHangmanGame(word) {
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [gameStatus, setGameStatus] = useState('playing');

  const correctLetters = useMemo(() => {
    return Array.from(guessedLetters).filter(letter => 
      word.toUpperCase().includes(letter.toUpperCase())
    );
  }, [guessedLetters, word]);

  const wrongLetters = useMemo(() => {
    return Array.from(guessedLetters).filter(letter => 
      !word.toUpperCase().includes(letter.toUpperCase())
    );
  }, [guessedLetters, word]);

  const remainingAttempts = useMemo(() => {
    return MAX_ATTEMPTS - wrongLetters.length;
  }, [wrongLetters.length]);

  const isWon = useMemo(() => {
    return word.toUpperCase().split('').every(letter => 
      guessedLetters.has(letter.toUpperCase())
    );
  }, [word, guessedLetters]);

  const isLost = useMemo(() => {
    return remainingAttempts <= 0;
  }, [remainingAttempts]);

  useMemo(() => {
    if (isWon && gameStatus !== 'won') {
      setGameStatus('won');
    } else if (isLost && gameStatus !== 'lost') {
      setGameStatus('lost');
    }
  }, [isWon, isLost, gameStatus]);

  const guessLetter = useCallback((letter) => {
    if (gameStatus !== 'playing') return;
    
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.has(upperLetter)) return; 
    
    setGuessedLetters(prev => new Set([...prev, upperLetter]));
  }, [guessedLetters, gameStatus]);

  const resetGame = useCallback(() => {
    setGuessedLetters(new Set());
    setGameStatus('playing');
  }, []);

  const wordDisplay = useMemo(() => {
    return word.toUpperCase().split('').map(letter => 
      guessedLetters.has(letter) ? letter : '_'
    ).join(' ');
  }, [word, guessedLetters]);

  return {
    guessedLetters: Array.from(guessedLetters),
    correctLetters,
    wrongLetters,
    remainingAttempts,
    gameStatus,
    wordDisplay,
    
    isWon,
    isLost,
    isGameOver: gameStatus !== 'playing',
    
    guessLetter,
    resetGame
  };
}
