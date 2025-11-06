import ModalPortal from "./ModalPortal";

export default function GameOverModal({ isOpen, isWon, word, attempts, totalAttempts, onPlayAgain, onShowStats }) {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="modal-overlay">
        <div className="modal-card">
          <h2>{isWon ? "🎉 Congratulations! You won!" : "💀 Game Over! You lost!"}</h2>
          <div className="result-details">
            <p><strong>Word:</strong> {word}</p>
            <p><strong>Attempts:</strong> {attempts}/{totalAttempts}</p>
            <p><strong>Result:</strong> {isWon ? "Won" : "Lost"}</p>
          </div>
          <div className="modal-actions">
            <button onClick={onPlayAgain}>Play Again</button>
            <button onClick={onShowStats}>Statistics</button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}


