import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { getHistory } from '../api';
import { useAuth } from '../context/AuthContext';
import './HistoryPage.css'; 

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: true
    });
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    getHistory(user.id)
      .then((data) => setHistory(data || []))
      .catch(() => setHistory([]))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="page history-page">
      <Header />
      <div className="container">
        {loading ? <div>로딩...</div> : (
          <ul className="history-list">
            {history.map(h => (
              <li key={h.id} className="history-item">

                <div className="left-info">
                  <h3 className="chapter-title">{h.unit_name}</h3>
                  <span className="date">{formatDate(h.answered_at)}</span>
                </div>

                <div className="right-info">
                  <span className="score-label">정답 개수 : </span>
                  <span className="score-value">{h.score}점</span>
                </div>

              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}