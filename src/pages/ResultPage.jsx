import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';
import { selectCountryStats } from '../store/slices/resultsSlice';
import styles from './ResultPage.module.css';

export default function ResultPage() {
  const countryStats = useAppSelector(selectCountryStats);
  const navigate = useNavigate();

  const entries = useMemo(() => {
    return Object.entries(countryStats).sort((a, b) => a[0].localeCompare(b[0]));
  }, [countryStats]);

  return (
    <div className={styles.resultPage}>
      <div className={styles.gameResult}>
        <h1>Country Stats</h1>
        {entries.length === 0 ? (
          <p>No games recorded yet.</p>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.statsTable} role="table">
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

      <div className={styles.actionButtons}>
        <button onClick={() => navigate("/start")} className={styles.playAgainBtn}>
          🏁 Back
        </button>
      </div>
    </div>
  );
}
