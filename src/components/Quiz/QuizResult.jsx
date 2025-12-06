import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/QuizResult.css";

function QuizResult({ score = 0, correct = 0, wrong = 0, total = 0, onRetry, onHome }) {
  // 점수에 따른 백분율 계산
  const pct = Math.max(0, Math.min(100, Math.round((score / 100) * 100)));
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/main"); // main 경로로 이동
    }, 5000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, [navigate]);

  return (
    // quiz-result-container (w-full flex flex-col items-center px-6 py-12)
    <div className="quiz-result-container">
      {/* quiz-result-header (text-center mb-6) */}
      <div className="quiz-result-header">
        {/* quiz-result-title (text-4xl md:text-5xl font-extrabold text-slate-900) */}
        <h1 className="quiz-result-title">퀴즈 완료!</h1>
        {/* quiz-result-subtitle (text-lg text-slate-500 font-semibold) */}
        <p className="quiz-result-subtitle">수고하셨습니다! 결과를 확인해보세요<br></br>5초뒤 메인화면으로 넘어갑니다.</p>
      </div>

      {/* quiz-result-card (w-full max-w-5xl bg-white rounded-lg shadow-md overflow-hidden) */}
      <div className="quiz-result-card">
        {/* quiz-result-score-header (bg-yellow-100 text-center text-sm font-semibold text-yellow-800 px-4 py-3) */}
        <div className="quiz-result-score-header">최종 점수</div>

        {/* quiz-result-content (p-8) */}
        <div className="quiz-result-content">
          {/* score-display-group (flex items-end justify-center gap-3 mb-4) */}
          <div className="score-display-group">
            {/* score-number (text-6xl md:text-[72px] font-extrabold text-yellow-400) */}
            <div className="score-number">{score}</div>
            {/* score-unit (text-2xl md:text-3xl font-bold text-slate-700 mb-1) */}
            <div className="score-unit">점</div>
          </div>

          {/* score-progress-bar-bg (h-3 bg-slate-100 rounded-full overflow-hidden mb-6) */}
          <div className="score-progress-bar-bg">
            {/* score-progress-bar-fill (h-full bg-yellow-300 rounded-full transition-all) */}
            <div 
              className="score-progress-bar-fill" 
              style={{ width: `${pct}%` }} 
            />
          </div>

          {/* stats-group (flex items-center justify-center gap-12) */}
          <div className="stats-group">
            {/* Stat Item - 정답 */}
            <div className="stat-item">
              <img src="/assets/check.svg" alt="correct" className="stat-icon" />
              <div className="stat-number">{correct}</div>
              <div className="stat-label">정답</div>
            </div>

            <div className="stat-separator" /> {/* 구분선 */}

            {/* Stat Item - 오답 */}
            <div className="stat-item">
              <img src="/assets/cross.svg" alt="wrong" className="stat-icon" />
              <div className="stat-number">{wrong}</div>
              <div className="stat-label">오답</div>
            </div>

            <div className="stat-separator" /> {/* 구분선 */}

            {/* Stat Item - 총 문항 */}
            <div className="stat-item">
              <img src="/assets/total.svg" alt="total" className="stat-icon" />
              <div className="stat-number">{total}</div>
              <div className="stat-label">총 문항</div>
            </div>
          </div>

          {/* button-group (flex justify-center gap-3 mt-6) */}
          <div className="button-group">
            {onRetry && (
              // button-retry (px-4 py-2 rounded-md font-bold border border-slate-200 bg-white text-slate-700)
              <button onClick={onRetry} className="button-base button-retry">
                다시 풀기
              </button>
            )}
            {onHome && (
              // button-home (px-4 py-2 rounded-md font-bold bg-yellow-300 text-slate-900)
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