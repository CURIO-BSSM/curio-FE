import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { getUnits } from '../api'; 
import './UnitsPage.css';

export default function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getUnits()
      .then((data) => {
        setUnits(data || []);
      })
      .catch((error) => {
        console.error("단원 목록을 불러오지 못했습니다:", error);
        setUnits([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUnitClick = (unitId) => {
    navigate(`/quiz?unit=${unitId}`);
  };

  return (
    <div className="page units-page">
      <Header />
      <div className="container">
        {loading ? <div>로딩...</div> : (
          <ul className="unit-list">
            {units.map((unit) => (
              <li 
                key={unit.id} 
                className="unit-card"
                onClick={() => handleUnitClick(unit.id)}
              >
                
                
                <span className="unit-number">{unit.id}.단원</span>
                
                
                
                <h3 className="unit-title">{unit.name}</h3>
                
                
                <p className="unit-desc">{unit.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}