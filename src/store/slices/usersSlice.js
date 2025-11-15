import { createSlice } from '@reduxjs/toolkit';

const PLAYERS_STORAGE_KEY = 'hangman.players.v1';

function loadPlayersFromStorage() {
  try {
    const raw = localStorage.getItem(PLAYERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePlayersToStorage(players) {
  try {
    localStorage.setItem(PLAYERS_STORAGE_KEY, JSON.stringify(players));
  } catch {
    console.error('Error writing players to storage');
  }
}

const initialState = {
  players: loadPlayersFromStorage(),
  currentPlayer: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPlayer: (state, action) => {
      state.currentPlayer = action.payload;
    },
    addOrUpdatePlayer: (state, action) => {
      const username = action.payload;
      if (!username || !username.trim()) return;
      
      const normalizedName = username.trim();
      if (!state.players[normalizedName]) {
        state.players[normalizedName] = {
          name: normalizedName,
          gamesPlayed: 0,
          wins: 0,
          losses: 0,
          bestScore: 0,
        };
      }
      savePlayersToStorage(state.players);
    },
    updatePlayerStats: (state, action) => {
      const { username, stats } = action.payload;
      if (!username) return;
      
      const player = state.players[username] || {
        name: username,
        gamesPlayed: 0,
        wins: 0,
        losses: 0,
        bestScore: 0,
      };
      
      state.players[username] = {
        ...player,
        gamesPlayed: player.gamesPlayed + 1,
        wins: stats.won ? player.wins + 1 : player.wins,
        losses: stats.won ? player.losses : player.losses + 1,
        bestScore: stats.won && (player.bestScore === 0 || stats.attempts < player.bestScore)
          ? stats.attempts
          : player.bestScore,
      };
      
      savePlayersToStorage(state.players);
    },
  },
});

export const { setCurrentPlayer, addOrUpdatePlayer, updatePlayerStats } = usersSlice.actions;

export const selectPlayers = (state) => state.users.players;
export const selectCurrentPlayer = (state) => state.users.currentPlayer;
export const selectPlayer = (state, username) => {
  return state.users.players[username] || { gamesPlayed: 0, bestScore: 0, wins: 0, losses: 0 };
};

export default usersSlice.reducer;
