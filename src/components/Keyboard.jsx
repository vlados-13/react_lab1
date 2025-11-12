import styles from "./Keyboard.module.css";

export default function Keyboard({ onLetterClick, guessedLetters = [], disabled = false }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  return (
    <div className={styles.keyboard}>
      {letters.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isDisabled = disabled || isGuessed;
        
        return (
          <button 
            key={letter} 
            onClick={() => onLetterClick(letter)}
            disabled={isDisabled}
            className={isGuessed ? styles.guessed : ''}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
