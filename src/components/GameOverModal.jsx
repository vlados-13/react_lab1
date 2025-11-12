import ModalPortal from "./ModalPortal";
import styles from "./GameOverModal.module.css";

export default function GameOverModal({ isOpen, isWon, word, attempts, totalAttempts, onPlayAgain, onShowStats }) {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className={styles.modalOverlay}>
        <div className={styles.modalCard}>
          <h2>{isWon ? "🎉 Congratulations! You won!" : "💀 Game Over! You lost!"}</h2>
          <div className={styles.resultDetails}>
            <p><strong>Word:</strong> {word}</p>
            <p><strong>Attempts:</strong> {attempts}/{totalAttempts}</p>
            <p><strong>Result:</strong> {isWon ? "Won" : "Lost"}</p>
          </div>
          <div className={styles.modalActions}>
            <button onClick={onPlayAgain}>Play Again</button>
            <button onClick={onShowStats}>Statistics</button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}


