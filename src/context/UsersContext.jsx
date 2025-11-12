import { createContext, useContext, useState, useCallback } from 'react';

const PLAYERS_STORAGE_KEY = 'hangman.players.v1';

function readPlayersFromStorage() {
  try {
    const raw = localStorage.getItem(PLAYERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writePlayersToStorage(players) {
  try {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
  } catch {}
}

const UsersContext = createContext({
  players: {},
  currentPlayer: null,
  setCurrentPlayer: () => {},
  addOrUpdatePlayer: () => {},
  getPlayerStats: () => ({ gamesPlayed: 0, bestScore: 0, wins: 0, losses: 0 }),
});

export function UsersProvider({ children }) {
  const [players, setPlayers] = useState(() => readPlayersFromStorage());
  const [currentPlayer, setCurrentPlayer] = useState(null);

  const addOrUpdatePlayer = useCallback((username) => {
    if (!username || !username.trim()) return null;
    
    const normalizedName = username.trim();
    setPlayers((prev) => {
      const updated = {
        ...prev,
        [normalizedName]: {
          name: normalizedName,
          gamesPlayed: prev[normalizedName]?.gamesPlayed || 0,
          wins: prev[normalizedName]?.wins || 0,
          losses: prev[normalizedName]?.losses || 0,
          bestScore: prev[normalizedName]?.bestScore || 0,
        },
      };
      writePlayersToStorage(updated);
      return updated;
    });
    return normalizedName;
  }, []);

  const getPlayerStats = useCallback((username) => {
    if (!username) return { gamesPlayed: 0, bestScore: 0, wins: 0, losses: 0 };
    const player = players[username];
    return player || { gamesPlayed: 0, bestScore: 0, wins: 0, losses: 0 };
  }, [players]);

  const updatePlayerStats = useCallback((username, stats) => {
    if (!username) return;
    setPlayers((prev) => {
      const player = prev[username] || { name: username, gamesPlayed: 0, wins: 0, losses: 0, bestScore: 0 };
      const updated = {
        ...prev,
        [username]: {
          ...player,
          gamesPlayed: player.gamesPlayed + 1,
          wins: stats.won ? player.wins + 1 : player.wins,
          losses: stats.won ? player.losses : player.losses + 1,
          bestScore: stats.won && (player.bestScore === 0 || stats.attempts < player.bestScore)
            ? stats.attempts 
            : player.bestScore,
        },
      };
      writePlayersToStorage(updated);
      return updated;
    });
  }, []);

  return (
    <UsersContext.Provider value={{ 
      players, 
      currentPlayer, 
      setCurrentPlayer, 
      addOrUpdatePlayer,
      getPlayerStats,
      updatePlayerStats,
    }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  return useContext(UsersContext);
}

