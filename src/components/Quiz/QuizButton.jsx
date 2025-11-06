import "../style/QuizButton.css";

function QuizButton({ label, text, selected, correct, incorrect, onClick }) {
  let statusClass = "";
  if (selected) statusClass = "selected";
  if (correct) statusClass = "correct";
  if (incorrect) statusClass = "incorrect";

  return (
    <div className={`quiz-button ${statusClass}`} onClick={onClick}>
      <div className={`quiz-button-label ${statusClass}`}>{label}</div>
      <span className="quiz-button-text">{text}</span>
      {correct && (
        <svg className="checkmark-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#22c55e"/>
          <path d="M8 12.5l2.5 2.5L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {incorrect && (
        <svg className="checkmark-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#ef4444"/>
          <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

export default QuizButton;
