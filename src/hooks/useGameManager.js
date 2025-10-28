import { useCallback, useEffect } from 'react';
import { useHangmanGame } from './useHangmanGame';
import { useWordList } from './useWordList';

export function useGameManager(onGameEnd) {
  const wordList = useWordList();
  const gameState = useHangmanGame(wordList.currentWord);

  useEffect(() => {
    if (gameState.isGameOver && onGameEnd) {
      const result = {
        won: gameState.isWon,
        word: wordList.currentWord,
        attempts: gameState.wrongLetters.length,
        totalAttempts: 6
      };
      
      onGameEnd(result);
    }
  }, [gameState.isGameOver, gameState.isWon, gameState.wrongLetters.length, wordList.currentWord, onGameEnd]);

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
