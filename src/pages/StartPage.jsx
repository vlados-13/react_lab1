import { useState } from "react";
import SettingsModal from "../components/SettingsModal";

export default function StartPage({ onStart, onRecord }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div>
      <h2>Welcome to Hangman!</h2>
      <button onClick={onStart}>Start Game</button>
      <button onClick={onRecord}>Records</button>
      <button onClick={() => setIsSettingsOpen(true)}>Settings</button>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
