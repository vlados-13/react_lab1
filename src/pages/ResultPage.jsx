export default function ResultPage({ result, onRestart }) {
  return (
    <div>
      <h2>{result === "win" ? "You Win!" : "You Lose!"}</h2>
      Тут має буть чи табличка чи список
      <button onClick={onRestart}>Restart Game</button>
    </div>
  );
}
