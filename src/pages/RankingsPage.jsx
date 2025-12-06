import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { getRankings } from '../api';
import "./RankingsPage.css";

export default function RankingsPage() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 서버에서 진짜 데이터 가져오기
    getRankings()
      .then((data) => setRankings(data || []))
      .catch(() => setRankings([])) // 에러 나면 빈 배열로 처리 (더미 데이터 삭제됨)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page rankings-page">
      <Header />
      <div className="container">
        <h2>랭킹</h2>
        {loading ? <div>로딩...</div> : (
          <ol className="ranking-list">
            {rankings.map((r, index) => (
              <li key={r.user_id || index} className="ranking-item">
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