import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { getRankings } from '../api';
import '../pages/RankingsPage.css';

export default function RankingsPage() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRankings().then((data) => setRankings(data || [])).catch(() => setRankings([])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page rankings-page">
      <Header />
      <div className="container">
        <h2>랭킹</h2>
        {loading ? <div>로딩...</div> : (
          <ol className="ranking-list">
            {rankings.map(r => (
              <li key={r.user_id} className="ranking-item">
                <span className="rank">#{r.rank}</span>
                <span className="name">{r.username}</span>
                <span className="score">{r.score}점</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
