import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { getHistory } from '../api';
import { useAuth } from '../context/AuthContext';
import '../pages/HistoryPage.css';

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getHistory(user.id).then((data) => setHistory(data || [])).catch(() => setHistory([])).finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="page history-page">
      <Header />
      <div className="container">
        <h2>내 기록</h2>
        {loading ? <div>로딩...</div> : (
          <ul className="history-list">
            {history.map(h => (
              <li key={h.id} className="history-item">
                <div><strong>{h.unit_name}</strong></div>
                <div>점수: {h.score}</div>
                <div>응시일: {new Date(h.answered_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
