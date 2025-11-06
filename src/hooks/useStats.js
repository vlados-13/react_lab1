import { useCallback, useEffect, useState } from 'react';

const STATS_STORAGE_KEY = 'hangman.countryStats.v1';

function readStatsFromStorage() {
  try {
    const raw = localStorage.getItem(STATS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStatsToStorage(stats) {
  try {
    localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  } catch {}
}

export function useStats() {
  const [stats, setStats] = useState(() => readStatsFromStorage());

  useEffect(() => {
    writeStatsToStorage(stats);
  }, [stats]);

  const recordResult = useCallback((country, won) => {
    if (!country) return;
    setStats((prev) => {
      const current = prev[country] || { wins: 0, losses: 0 };
      const next = {
        ...prev,
        [country]: {
          wins: current.wins + (won ? 1 : 0),
          losses: current.losses + (won ? 0 : 1),
        },
      };
      // write-through to localStorage to avoid races when navigating
      writeStatsToStorage(next);
      return next;
    });
  }, []);

  return { stats, recordResult };
}


