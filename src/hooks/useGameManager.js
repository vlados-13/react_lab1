import { useCallback, useEffect, useRef } from 'react';
import { useHangmanGame } from './useHangmanGame';
import { useWordList } from './useWordList';
import { useSettings } from '../context/SettingsContext.jsx';
import { useStats } from './useStats';

export function useGameManager(onGameEnd) {
  const wordList = useWordList();
  const { settings } = useSettings();
  const { recordResult } = useStats();
  const recordedRef = useRef(false);
  const gameState = useHangmanGame(wordList.currentWord, {
    maxAttempts: settings.maxAttempts,
    inputCooldownMs: settings.inputCooldownMs,
  });

  useEffect(() => {
    if (gameState.isGameOver) {
      if (!recordedRef.current) {
        recordResult(wordList.currentWord, gameState.isWon);
        recordedRef.current = true;
      }
    } else {
      recordedRef.current = false;
    }

    if (gameState.isGameOver && onGameEnd) {
      const result = {
        won: gameState.isWon,
        word: wordList.currentWord,
        attempts: gameState.wrongLetters.length,
        totalAttempts: gameState.totalAttempts
      };
      
      onGameEnd(result);
    }
  }, [gameState.isGameOver, gameState.isWon, gameState.wrongLetters.length, wordList.currentWord, onGameEnd, recordResult]);

  const startNewGame = useCallback(() => {
    wordList.getRandomWord();
    gameState.resetGame();
  }, [wordList, gameState]);

  const resetCurrentGame = useCallback(() => {
    gameState.resetGame();
  }, [gameState]);

  return {
    ...gameState,
    currentWord: wordList.currentWord,
    startNewGame,
    resetCurrentGame
  };
}
