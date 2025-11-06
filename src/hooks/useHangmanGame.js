import { useState, useCallback, useMemo, useRef } from 'react';

export function useHangmanGame(word, options = {}) {
  const { maxAttempts = 6, inputCooldownMs = 0 } = options;
  const [guessedLetters, setGuessedLetters] = useState(new Set());
  const [gameStatus, setGameStatus] = useState('playing');
  const lastGuessTimeRef = useRef(0);

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
    return maxAttempts - wrongLetters.length;
  }, [wrongLetters.length, maxAttempts]);

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
    const now = Date.now();
    if (inputCooldownMs > 0 && now - lastGuessTimeRef.current < inputCooldownMs) {
      return;
    }
    
    const upperLetter = letter.toUpperCase();
    if (guessedLetters.has(upperLetter)) return; 
    
    setGuessedLetters(prev => new Set([...prev, upperLetter]));
    lastGuessTimeRef.current = now;
  }, [guessedLetters, gameStatus, inputCooldownMs]);

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
    totalAttempts: maxAttempts,
    gameStatus,
    wordDisplay,
    
    isWon,
    isLost,
    isGameOver: gameStatus !== 'playing',
    
    guessLetter,
    resetGame
  };
}
