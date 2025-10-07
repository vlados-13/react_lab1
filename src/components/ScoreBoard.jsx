export default function ScoreBoard({ wrongLetters }) {
  return (
    <div className="scoreboard">Wrong letters: {wrongLetters.join(", ")}</div>
  );
}
