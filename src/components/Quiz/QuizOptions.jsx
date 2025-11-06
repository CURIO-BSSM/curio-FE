import QuizButton from "./QuizButton";
import "../style/QuizOptions.css";

function QuizOptions({ options, correctAnswer, selected, submitted, onSelect }) {
  const labels = ["A", "B", "C", "D"];

  return (
    <div className="quiz-options">
      {options.map((opt, idx) => (
        <QuizButton
          key={labels[idx]}
          label={labels[idx]}
          text={opt}
          selected={selected === labels[idx]}
          correct={submitted && correctAnswer === idx + 1}
          incorrect={submitted && selected === labels[idx] && correctAnswer !== idx + 1}
          onClick={() => !submitted && onSelect(labels[idx])}
        />
      ))}
    </div>
  );
}

export default QuizOptions;