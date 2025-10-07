export default function WordDisplay({ word, correctLetters }) {
  const display = word
    .split("")
    .map((l) => (correctLetters.includes(l) ? l : "_"))
    .join(" ");
  return <div className="word">{display}</div>;
}
