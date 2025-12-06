import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminHeader from '../components/Header/AdminHeader';
import axios from 'axios'; 
import './AdminPage.css';

export default function AdminPage() {
  const { user, logout } = useAuth();
  
  const [unitId, setUnitId] = useState('');
  const [content, setContent] = useState('');
  const [options, setOptions] = useState(["", "", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0); 
  const [loading, setLoading] = useState(false);

  // 보기 입력 관리
  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. 토큰 가져오기 (Local Storage 확인 완료: 이름 'token')
    const token = localStorage.getItem('token'); 

    if (!token) {
      alert("로그인 정보가 없습니다. 다시 로그인해주세요.");
      setLoading(false);
      return;
    }

    try {
      // 빈 보기 필터링
      const validOptions = options.filter(opt => opt.trim() !== "");
      
      if (validOptions.length < 2) {
        alert("최소 2개 이상의 보기를 입력해주세요.");
        setLoading(false);
        return;
      }

      // 2. 서버로 진짜 데이터 전송
      await axios.post(
        'https://port-0-curio-be-mimknx4690eeb5bb.sel3.cloudtype.app/quiz/add',
        { 
          unit_id: Number(unitId), 
          content: content, 
          options: validOptions, 
          correct_answer: correctIndex + 1 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // 출입증(Token) 제출
            'Content-Type': 'application/json'
          }
        }
      );
      
      // 성공 시
      alert('문제가 성공적으로 등록되었습니다! 🎉');
      
      // 입력창 초기화
      setContent(''); 
      setOptions(["", "", "", "", ""]); 
      setUnitId(''); 
      setCorrectIndex(0);

    } catch (err) {
      console.error('문제 등록 실패:', err);
      
      // 에러 메시지 처리
      const errorDetail = err.response?.data?.detail;
      if (errorDetail === '관리자만 접근할 수 있습니다.') {
         alert("등록 실패: 관리자 권한이 필요합니다. (DB 역활 확인 필요)");
      } else {
         alert(`등록 실패: ${errorDetail || "서버 오류가 발생했습니다."}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page admin-page">
      <AdminHeader adminName={user?.name} onLogout={logout} />
      
      <div className="quiz-form-container">
        <form onSubmit={handleSubmit} className="quiz-form">
          
          {/* 1. 단원 선택 */}
          <div className="form-section">
            <label className="section-label">단원선택</label>
            <select 
              className="custom-select" 
              value={unitId} 
              onChange={e => setUnitId(e.target.value)}
              required
            >
              <option value="" disabled>단원선택....</option>
              <option value="1">1. 변화와 다양성</option>
              <option value="2">2. 환경과 에너지</option>
              <option value="3">3. 과학과 미래사회</option>
            </select>
          </div>

          {/* 2. 문제 제목 */}
          <div className="form-section">
            <label className="section-label">문제 내용 작성</label>
            <div className="input-label-small">문제 제목</div>
            <textarea 
              className="custom-textarea" 
              placeholder="문제에 대한 설명 ...." 
              value={content}
              onChange={e => setContent(e.target.value)}
              required
            />
          </div>

          {/* 3. 보기 설정 */}
          <div className="form-section">
            <label className="section-label">문제 보기 설정</label>
            <div className="options-list">
              {options.map((opt, index) => (
                <div key={index} className="option-row">
                  <input 
                    type="radio" 
                    name="correctAnswer" 
                    className="option-radio"
                    checked={correctIndex === index}
                    onChange={() => setCorrectIndex(index)}
                  />
                  <input 
                    type="text" 
                    className="option-input" 
                    placeholder="보기 설정 해주세요...." 
                    value={opt}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required={index < 2} 
                  />
                </div>
              ))}
            </div>
            <p className="helper-text">라디오 버튼을 통해서 정답 선택하기</p>
          </div>

          {/* 4. 버튼 영역 */}
          <div className="button-group">
            <button type="button" className="btn-cancel" onClick={() => window.location.reload()}>
              취소하기
            </button>
            <button type="submit" className="btn-save" disabled={loading}>
              {loading ? '저장 중...' : '저장하기'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}