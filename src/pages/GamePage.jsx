import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import HangmanDrawing from "../components/HangmanDrawing";
import Keyboard from "../components/Keyboard";
import ScoreBoard from "../components/ScoreBoard";
import WordDisplay from "../components/WordDisplay";
import { useGameManager } from "../hooks/useGameManager";
import GameOverModal from "../components/GameOverModal";
import styles from "./GamePage.module.css";

export default function GamePage() {
  const navigate = useNavigate();
  const game = useGameManager();

  useEffect(() => {
    game.startNewGame();
  }, []);

  return (
    <div className={styles.gamePage}>
      <Header />
      
      <HangmanDrawing lives={game.remainingAttempts} />
      
      <WordDisplay word={game.wordDisplay} />
      
      <Keyboard 
        onLetterClick={game.guessLetter}
        guessedLetters={game.guessedLetters}
        disabled={game.isGameOver}
      />
      
      <ScoreBoard wrongLetters={game.wrongLetters} />

      <GameOverModal
        isOpen={game.isGameOver}
        isWon={game.isWon}
        word={game.currentWord}
        attempts={game.wrongLetters.length}
        totalAttempts={game.totalAttempts}
        onPlayAgain={game.startNewGame}
        onShowStats={() => navigate("/result")}
      />
    </div>
  );
}
