import styles from "./ScoreBoard.module.css";

export default function ScoreBoard({ wrongLetters }) {
  return (
    <div className={styles.scoreboard}>Wrong letters: {wrongLetters.join(", ")}</div>
  );
}
