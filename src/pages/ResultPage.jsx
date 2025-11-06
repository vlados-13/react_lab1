import { useMemo } from 'react';
import { useStats } from '../hooks/useStats';

export default function ResultPage({ onRestart }) {
  const { stats } = useStats();

  const entries = useMemo(() => {
    return Object.entries(stats).sort((a, b) => a[0].localeCompare(b[0]));
  }, [stats]);

  return (
    <div className="result-page">
      <div className="game-result">
        <h1>Country Stats</h1>
        {entries.length === 0 ? (
          <p>No games recorded yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="stats-table" role="table">
              <thead>
                <tr>
                  <th scope="col">Guessed Country</th>
                  <th scope="col">Wins</th>
                  <th scope="col">Losses</th>
                </tr>
              </thead>
              <tbody>
                {entries.map(([country, { wins, losses }]) => (
                  <tr key={country}>
                    <th scope="row">{country}</th>
                    <td>{wins}</td>
                    <td>{losses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="action-buttons">
        <button onClick={onRestart} className="play-again-btn">
          🏁 Back
        </button>
      </div>
    </div>
  );
}
