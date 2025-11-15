import { useCallback, useEffect, useRef } from 'react';
import { useHangmanGame } from './useHangmanGame';
import { useWordList } from './useWordList';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectSettings } from '../store/slices/settingsSlice';
import { recordCountryResult } from '../store/slices/resultsSlice';
import { selectCurrentPlayer, updatePlayerStats } from '../store/slices/usersSlice';

export function useGameManager(onGameEnd = null) {
  const dispatch = useAppDispatch();
  const wordList = useWordList();
  const settings = useAppSelector(selectSettings);
  const currentPlayer = useAppSelector(selectCurrentPlayer);
  const recordedRef = useRef(false);
  const gameState = useHangmanGame(wordList.currentWord, {
    maxAttempts: settings.maxAttempts,
    inputCooldownMs: settings.inputCooldownMs,
  });

  useEffect(() => {
    if (gameState.isGameOver) {
      if (!recordedRef.current) {
        dispatch(recordCountryResult({
          country: wordList.currentWord,
          won: gameState.isWon,
        }));
        
        if (currentPlayer) {
          dispatch(updatePlayerStats({
            username: currentPlayer,
            stats: {
              won: gameState.isWon,
              attempts: gameState.wrongLetters.length,
            },
          }));
        }
        
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
  }, [gameState.isGameOver, gameState.isWon, gameState.wrongLetters.length, wordList.currentWord, onGameEnd, dispatch, currentPlayer]);

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
