import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsModal from "../components/SettingsModal";
import { useUsers } from "../context/UsersContext";
import styles from "./StartPage.module.css";

export default function StartPage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();
  const { addOrUpdatePlayer, setCurrentPlayer } = useUsers();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    
    const username = addOrUpdatePlayer(playerName);
    if (username) {
      setCurrentPlayer(username);
      navigate(`/users/${encodeURIComponent(username)}`);
    }
  };

  const handleStartGame = () => {
    if (playerName.trim()) {
      const username = addOrUpdatePlayer(playerName);
      if (username) {
        setCurrentPlayer(username);
        navigate(`/users/${encodeURIComponent(username)}`);
      }
    } else {
      navigate("/game");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Welcome to Hangman!</h2>
      
      <form onSubmit={handleSubmit} className={styles.nameForm}>
        <label className={styles.label}>
          <span>Enter your name:</span>
          <input
            type="text"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            placeholder="Your name"
            className={styles.input}
            maxLength={50}
          />
        </label>
        <button type="submit" className={styles.submitButton}>
          Start Game
        </button>
      </form>

      <div className={styles.actions}>
        <button onClick={handleStartGame}>Start Game</button>
        <button onClick={() => navigate("/result")}>Records</button>
        <button onClick={() => navigate("/users")}>Users</button>
        <button onClick={() => setIsSettingsOpen(true)}>Settings</button>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
