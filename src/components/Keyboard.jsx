export default function Keyboard({ onLetterClick }) {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  return (
    <div className="keyboard">
      {letters.map((l) => (
        <button key={l} onClick={() => onLetterClick(l)}>
          {l}
        </button>
      ))}
    </div>
  );
}
