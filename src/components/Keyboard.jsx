export default function Keyboard({ onLetterClick, guessedLetters = [], disabled = false }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  
  return (
    <div className="keyboard">
      {letters.map((letter) => {
        const isGuessed = guessedLetters.includes(letter);
        const isDisabled = disabled || isGuessed;
        
        return (
          <button 
            key={letter} 
            onClick={() => onLetterClick(letter)}
            disabled={isDisabled}
            className={isGuessed ? 'guessed' : ''}
          >
            {letter}
          </button>
        );
      })}
    </div>
  );
}
