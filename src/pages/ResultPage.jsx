export default function ResultPage({ result, onRestart }) {
  return (
    <div className="result-page">
      <div className="game-result">
        <h1>{result?.won ? "🎉 Victory!" : "💀 Game Over!"}</h1>
        <div className="result-details">
          <p><strong>Word:</strong> {result?.word}</p>
          <p><strong>Attempts:</strong> {result?.attempts}/6</p>
          <p><strong>Result:</strong> {result?.won ? "Won" : "Lost"}</p>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={onRestart} className="play-again-btn">
          🎮 Play Again
        </button>
      </div>
    </div>
  );
}
