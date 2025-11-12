import { useParams, Link, useNavigate } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';
import styles from './UserDetailPage.module.css';

export default function UserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPlayerStats, setCurrentPlayer } = useUsers();
  
  const username = id ? decodeURIComponent(id) : null;
  const stats = getPlayerStats(username);

  if (!username) {
    return (
      <div className={styles.container}>
        <h1>User not found</h1>
        <Link to="/start" className={styles.backLink}>Back to Start</Link>
      </div>
    );
  }

  const handleStartGame = () => {
    setCurrentPlayer(username);
    navigate("/game");
  };

  return (
    <div className={styles.container}>
      <h1>Player Profile</h1>
      <div className={styles.details}>
        <p className={styles.playerName}><strong>Name:</strong> {username}</p>
        <div className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Games Played:</span>
            <span className={styles.statValue}>{stats.gamesPlayed}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Wins:</span>
            <span className={styles.statValue}>{stats.wins}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Losses:</span>
            <span className={styles.statValue}>{stats.losses}</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statLabel}>Best Score:</span>
            <span className={styles.statValue}>
              {stats.bestScore > 0 ? `${stats.bestScore} attempts` : 'N/A'}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={handleStartGame} className={styles.startButton}>
          Start Game
        </button>
        <Link to="/start" className={styles.backLink}>Back to Start</Link>
        <Link to="/users" className={styles.backLink}>All Users</Link>
      </div>
    </div>
  );
}

