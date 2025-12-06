import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUnits } from '../api';
import Header from '../components/Header/Header';
import '../pages/UnitsPage.css';

export default function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUnits().then((data) => {
      setUnits(data || []);
    }).catch(() => setUnits([])).finally(() => setLoading(false));
  }, []);

  return (
    <div className="page units-page">
      <Header />
      <div className="container">
        <h2>단원 목록</h2>
        {loading ? <div>로딩...</div> : (
          <ul className="units-list">
            {units.map(u => (
              <li key={u.id} className="unit-item">
                <Link to={`/quiz?unit=${u.id}`} className="unit-link">
                  <strong>{u.name}</strong>
                  <div className="unit-desc">{u.description}</div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
