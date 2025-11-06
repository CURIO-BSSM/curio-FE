import "../style/QuizQuestion.css";

function QuizQuestion({ text }) {
  return (
    <h2 className="quiz-question">{text}</h2>
  );
}

export default QuizQuestion;
