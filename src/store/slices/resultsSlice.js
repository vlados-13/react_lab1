import { createSlice } from '@reduxjs/toolkit';

const STATS_STORAGE_KEY = 'hangman.countryStats.v1';

function loadStatsFromStorage() {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveStatsToStorage(stats) {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {
    // persist stats best-effort
  }
}

const initialState = {
  countryStats: loadStatsFromStorage(),
};

const resultsSlice = createSlice({
  name: 'results',
  initialState,
  reducers: {
    recordCountryResult: (state, action) => {
      const { country, won } = action.payload;
      if (!country) return;
      
      const current = state.countryStats[country] || { wins: 0, losses: 0 };
      state.countryStats[country] = {
        wins: current.wins + (won ? 1 : 0),
        losses: current.losses + (won ? 0 : 1),
      };
      
      saveStatsToStorage(state.countryStats);
    },
  },
});

export const { recordCountryResult } = resultsSlice.actions;

export const selectCountryStats = (state) => state.results.countryStats;
export const selectCountryStat = (state, country) => {
  return state.results.countryStats[country] || { wins: 0, losses: 0 };
};

export default resultsSlice.reducer;
