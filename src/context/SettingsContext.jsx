/* eslint react-refresh/only-export-components: "off" */
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const SETTINGS_STORAGE_KEY = "hangman.settings.v1";

const defaultSettings = {
  difficulty: "normal",
  maxAttempts: 6,
  inputCooldownMs: 150,
};

const difficultyPresets = {
  easy: { maxAttempts: 8, inputCooldownMs: 0 },
  normal: { maxAttempts: 6, inputCooldownMs: 150 },
  hard: { maxAttempts: 5, inputCooldownMs: 300 },
};

const SettingsContext = createContext({
  settings: defaultSettings,
  setSettings: () => {},
  presets: difficultyPresets,
});

export function SettingsProvider({ children }) {
  const [settings, setSettingsState] = useState(() => {
    try {
      const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
      if (!raw) return defaultSettings;
      const parsed = JSON.parse(raw);
      return { ...defaultSettings, ...parsed };
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // persist settings best-effort
    }
  }, [settings]);

  const value = useMemo(() => {
    const setSettings = (next) => {
      setSettingsState((prev) => {
        const merged = typeof next === "function" ? next(prev) : next;
        return { ...prev, ...merged };
      });
    };

    const setDifficulty = (difficulty) => {
      const preset = difficultyPresets[difficulty] || difficultyPresets.normal;
      setSettingsState((prev) => ({ ...prev, difficulty, ...preset }));
    };

    return { settings, setSettings, setDifficulty, presets: difficultyPresets };
  }, [settings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  return useContext(SettingsContext);
}


