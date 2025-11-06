import "../style/QuizHeader.css";

function QuizHeader({ current, total, unitName }) {
  return (
    <div className="quiz-header">
      <p className="quiz-progress">질문 {current} / {total}</p>
      <p className="quiz-unit">{unitName}</p>
    </div>
  );
}

export default QuizHeader;
