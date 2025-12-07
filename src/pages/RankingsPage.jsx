import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
// import { getRankings } from '../api'; // 서버 요청 잠시 끄기
import "./RankingsPage.css";

export default function RankingsPage() {
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ★ 방금 님이 가져온 실제 데이터 6개! ★
    const realData = [
      {"rank":1,"username":"hynu","user_id":1,"score":13},
      {"rank":2,"username":"psh","user_id":4,"score":10},
      {"rank":3,"username":"dlqk","user_id":3,"score":3},
      {"rank":4,"username":"이우린","user_id":6,"score":2},
      {"rank":5,"username":"asd","user_id":12,"score":1},
      {"rank":6,"username":"권길현","user_id":10,"score":0}
    ];

    // 서버 요청 대신 바로 데이터를 넣습니다.
    setRankings(realData);
    setLoading(false);
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