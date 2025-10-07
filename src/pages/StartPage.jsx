export default function StartPage({ onStart, onRecord }) {
  return (
    <div>
      <h2>Welcome to Hangman!</h2>
      <button onClick={onStart}>Start Game</button>
      <button onClick={onRecord}>Records</button>
    </div>
  );
}
