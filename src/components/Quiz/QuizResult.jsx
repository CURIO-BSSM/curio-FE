import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/QuizResult.css";

function QuizResult({ score = 0, correct = 0, wrong = 0, total = 0, onRetry, onHome }) {
  const pct = Math.max(0, Math.min(100, Math.round((score / 100) * 100)));
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="quiz-result-container">
      
      <div className="quiz-result-header">
        
        <h1 className="quiz-result-title">퀴즈 완료!</h1>
        
        <p className="quiz-result-subtitle">수고하셨습니다! 결과를 확인해보세요<br></br>5초뒤 메인화면으로 넘어갑니다.</p>
      </div>

      
      <div className="quiz-result-card">
        
        <div className="quiz-result-score-header">최종 점수</div>

        
        <div className="quiz-result-content">
          
          <div className="score-display-group">
            
            <div className="score-number">{score}</div>
            
            <div className="score-unit">점</div>
          </div>

          
          <div className="score-progress-bar-bg">
            
            <div 
              className="score-progress-bar-fill" 
              style={{ width: `${pct}%` }} 
            />
          </div>

          
          <div className="stats-group">
            
            <div className="stat-item">
              <img src="/assets/check.svg" alt="correct" className="stat-icon" />
              <div className="stat-number">{correct}</div>
              <div className="stat-label">정답</div>
            </div>

            <div className="stat-separator" /> 

            
            <div className="stat-item">
              <img src="/assets/cross.svg" alt="wrong" className="stat-icon" />
              <div className="stat-number">{wrong}</div>
              <div className="stat-label">오답</div>
            </div>

            <div className="stat-separator" /> 

            
            <div className="stat-item">
              <img src="/assets/total.svg" alt="total" className="stat-icon" />
              <div className="stat-number">{total}</div>
              <div className="stat-label">총 문항</div>
            </div>
          </div>

          
          <div className="button-group">
            {onRetry && (
              <button onClick={onRetry} className="button-base button-retry">
                다시 풀기
              </button>
            )}
            {onHome && (
              <button onClick={onHome} className="button-base button-home">
                홈으로
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizResult;