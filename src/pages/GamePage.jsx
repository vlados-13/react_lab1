import { useEffect } from "react";
import Header from "../components/Header";
import HangmanDrawing from "../components/HangmanDrawing";
import Keyboard from "../components/Keyboard";
import ScoreBoard from "../components/ScoreBoard";
import WordDisplay from "../components/WordDisplay";
import { useGameManager } from "../hooks/useGameManager";

export default function GamePage({ onGameEnd }) {
  const game = useGameManager(onGameEnd);

  useEffect(() => {
    game.startNewGame();
  }, []);

  return (
    <div className="game-page">
      <Header />
      
      <HangmanDrawing lives={game.remainingAttempts} />
      
      <WordDisplay word={game.wordDisplay} />
      
      <Keyboard 
        onLetterClick={game.guessLetter}
        guessedLetters={game.guessedLetters}
        disabled={game.isGameOver}
      />
      
      <ScoreBoard wrongLetters={game.wrongLetters} />
      
      {game.isGameOver && (
        <div className="game-over">
          <h2>{game.isWon ? "🎉 Congratulations! You won!" : "💀 Game Over! You lost!"}</h2>
          <p>The word was: <strong>{game.currentWord}</strong></p>
          <p>Attempts used: <strong>{game.wrongLetters.length}/6</strong></p>
          <button onClick={game.startNewGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}
