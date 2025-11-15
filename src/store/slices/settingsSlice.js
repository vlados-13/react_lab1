import { createSlice } from '@reduxjs/toolkit';

const SETTINGS_STORAGE_KEY = 'hangman.settings.v1';

const difficultyPresets = {
  easy: { maxAttempts: 8, inputCooldownMs: 0 },
  normal: { maxAttempts: 6, inputCooldownMs: 150 },
  hard: { maxAttempts: 5, inputCooldownMs: 300 },
};

const defaultSettings = {
  difficulty: 'normal',
  maxAttempts: 6,
  inputCooldownMs: 150,
};

function loadSettingsFromStorage() {
  try {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) return defaultSettings;
    const parsed = JSON.parse(raw);
    return { ...defaultSettings, ...parsed };
  } catch {
    return defaultSettings;
  }
}

function saveSettingsToStorage(settings) {
  try {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // persist settings best-effort
  }
}

const initialState = loadSettingsFromStorage();

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setDifficulty: (state, action) => {
      const difficulty = action.payload;
      const preset = difficultyPresets[difficulty] || difficultyPresets.normal;
      state.difficulty = difficulty;
      state.maxAttempts = preset.maxAttempts;
      state.inputCooldownMs = preset.inputCooldownMs;
      saveSettingsToStorage(state);
    },
    setSettings: (state, action) => {
      Object.assign(state, action.payload);
      saveSettingsToStorage(state);
    },
  },
});

export const { setDifficulty, setSettings } = settingsSlice.actions;

export const selectSettings = (state) => state.settings;
export const selectDifficulty = (state) => state.settings.difficulty;
export const selectMaxAttempts = (state) => state.settings.maxAttempts;
export const selectInputCooldownMs = (state) => state.settings.inputCooldownMs;
export const selectDifficultyPresets = () => difficultyPresets;

export default settingsSlice.reducer;
