import styles from "./WordDisplay.module.css";

export default function WordDisplay({ word }) {
  return <div className={styles.word}>{word}</div>;
}
