import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SettingsModal from "../components/SettingsModal";
import { useAppDispatch } from "../store/hooks";
import { addOrUpdatePlayer, setCurrentPlayer } from "../store/slices/usersSlice";
import styles from "./StartPage.module.css";

export default function StartPage() {
  const dispatch = useAppDispatch();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    
    const normalizedName = playerName.trim();
    dispatch(addOrUpdatePlayer(normalizedName));
    dispatch(setCurrentPlayer(normalizedName));
    navigate(`/users/${encodeURIComponent(normalizedName)}`);
  };

  const handleStartGame = () => {
    if (playerName.trim()) {
      const normalizedName = playerName.trim();
      dispatch(addOrUpdatePlayer(normalizedName));
      dispatch(setCurrentPlayer(normalizedName));
      navigate(`/users/${encodeURIComponent(normalizedName)}`);
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
