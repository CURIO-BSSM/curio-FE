import { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import { getUnits } from '../api'; 
import './UnitsPage.css';

export default function UnitsPage() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 백엔드 API 호출
    getUnits()
      .then((data) => {
        // 데이터가 없거나 실패했을 때 빈 배열로 방어 처리
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

  return (
    <div className="page units-page">
      <Header />
      <div className="container">
        {loading ? <div>로딩...</div> : (
          <ul className="unit-list">
            {units.map((unit) => (
              <li key={unit.id} className="unit-card">
                
                {/* 1.단원 (노란색 번호) */}
                <span className="unit-number">{unit.id}.단원</span>
                
                {/* 제목 (검은색) */}
                {/* ★ 중요: 백엔드 스키마에 맞춰 'name' 사용 */}
                <h3 className="unit-title">{unit.name}</h3>
                
                {/* 설명 (회색) */}
                <p className="unit-desc">{unit.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}