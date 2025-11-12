import { Link } from 'react-router-dom';
import { useUsers } from '../context/UsersContext';
import styles from './UsersPage.module.css';

export default function UsersPage() {
  const { players } = useUsers();
  const playerList = Object.values(players).sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className={styles.container}>
      <h1>All Players</h1>
      {playerList.length === 0 ? (
        <p>No players yet. Start a game to create your profile!</p>
      ) : (
        <ul className={styles.userList}>
          {playerList.map((player) => (
            <li key={player.name} className={styles.userItem}>
              <Link 
                to={`/users/${encodeURIComponent(player.name)}`} 
                className={styles.userLink}
              >
                {player.name}
              </Link>
              <span className={styles.stats}>
                {player.gamesPlayed} games • {player.wins}W / {player.losses}L
              </span>
            </li>
          ))}
        </ul>
      )}
      <Link to="/start" className={styles.backLink}>Back to Start</Link>
    </div>
  );
}

