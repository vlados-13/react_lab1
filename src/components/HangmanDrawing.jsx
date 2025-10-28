export default function HangmanDrawing({ lives }) {
  const maxLives = 6;
  const wrongGuesses = maxLives - lives;

  return (
    <div className="hangman-container">
      <svg 
        width="300" 
        height="250" 
        viewBox="0 0 300 250" 
        className="hangman-svg"
      >
        <g className="gallows">
          <line x1="50" y1="200" x2="150" y2="200" stroke="#8b4513" strokeWidth="4" />
          <line x1="100" y1="200" x2="100" y2="50" stroke="#8b4513" strokeWidth="4" />
          <line x1="100" y1="50" x2="200" y2="50" stroke="#8b4513" strokeWidth="4" />
          <line x1="200" y1="50" x2="200" y2="80" stroke="#8b4513" strokeWidth="3" />
        </g>

        <g className="hangman-figure">
          {wrongGuesses >= 1 && (
            <circle cx="200" cy="95" r="15" stroke="#2c3e50" strokeWidth="3" fill="none" />
          )}
          
          {wrongGuesses >= 2 && (
            <line x1="200" y1="110" x2="200" y2="170" stroke="#2c3e50" strokeWidth="3" />
          )}
          
          {wrongGuesses >= 3 && (
            <line x1="200" y1="130" x2="180" y2="150" stroke="#2c3e50" strokeWidth="3" />
          )}
          
          {wrongGuesses >= 4 && (
            <line x1="200" y1="130" x2="220" y2="150" stroke="#2c3e50" strokeWidth="3" />
          )}
          
          {wrongGuesses >= 5 && (
            <line x1="200" y1="170" x2="180" y2="190" stroke="#2c3e50" strokeWidth="3" />
          )}
          
          {wrongGuesses >= 6 && (
            <line x1="200" y1="170" x2="220" y2="190" stroke="#2c3e50" strokeWidth="3" />
          )}
        </g>
      </svg>
      
      <div className="lives-display">
        Lives: <span className="lives-count">{lives}</span>
      </div>
    </div>
  );
}
