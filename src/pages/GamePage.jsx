import Header from "../components/Header";
import HangmanDrawing from "../components/HangmanDrawing";
import Keyboard from "../components/Keyboard";
import ScoreBoard from "../components/ScoreBoard";
import WordDisplay from "../components/WordDisplay";

export default function GamePage({ onGameEnd }) {
  const word = "REACT";
  const correctLetters = [];
  const wrongLetters = [];
  const lives = 6;

  return (
    <div>
      <Header />
      <HangmanDrawing lives={lives} />
      <WordDisplay word={word} correctLetters={correctLetters} />
      <Keyboard onLetterClick={(l) => console.log("Clicked", l)} />
      <ScoreBoard wrongLetters={wrongLetters} />
    </div>
  );
}
