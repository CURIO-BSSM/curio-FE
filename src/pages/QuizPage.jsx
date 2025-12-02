import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchQuiz, submitQuiz } from "../api";
import { useAuth } from "../context/AuthContext";
import { QuizHeader, QuizQuestion, QuizOptions, QuizResult } from "../components/Quiz";
import "../pages/QuizPage.css";

function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const unitId = Number(params.get('unit') || 1);
    fetchQuiz(unitId)
      .then((data) => {
        setQuiz(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [location.search]);

  const { user } = useAuth();

  // When quiz finishes, submit answers to backend if available
  useEffect(() => {
    if (!showResult) return;
    (async () => {
      try {
        const payload = {
          user_id: user ? user.id : null,
          answers,
        };
        await submitQuiz(payload);
      } catch (err) {
        // ignore submit errors for now
        console.warn('submitQuiz failed', err);
      }
    })();
  }, [showResult, answers, user]);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (!quiz) return <div className="error">문제를 불러오지 못했습니다.</div>;

  const question = quiz.questions[currentIndex];

  const handleSelect = (label) => setSelected(label);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      // check answer: selected is label like 'A', correct_answer is numeric (1-based)
      const q = quiz.questions[currentIndex];
      const labels = ["A", "B", "C", "D", "E"];
      const selectedIndex = labels.indexOf(selected); // 0-based
      const selectedOneBased = selectedIndex >= 0 ? selectedIndex + 1 : null;
      // record answer for submission later
      setAnswers((prev) => [...prev, { question_id: q.id, selected_answer: selectedOneBased }]);
      if (selectedOneBased !== null && selectedOneBased === q.correct_answer) {
        setCorrectCount((c) => c + 1);
      } else {
        setWrongCount((w) => w + 1);
      }

      if (currentIndex < quiz.questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setSelected(null);
        setSubmitted(false);
      } else {
        setShowResult(true);
      }
    }, 3000);
  };

  // When quiz finishes, submit answers to backend if available
  

  const handleExitClick = () => {
    setShowModal(true);
  };

  const confirmExit = () => {
    setShowModal(false);
    navigate("/home");
  };

  const cancelExit = () => {
    setShowModal(false);
  };

  if (showResult) {
    // compute score as percent of correct answers (out of 100)
    const score = Math.round((correctCount / quiz.questions.length) * 100);
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <QuizResult
            score={score}
            correct={correctCount}
            wrong={wrongCount}
            total={quiz.questions.length}
            onRetry={() => {
              // reset quiz
              setCurrentIndex(0);
              setSelected(null);
              setSubmitted(false);
              setCorrectCount(0);
              setWrongCount(0);
              setShowResult(false);
            }}
            onHome={() => navigate('/home')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <div className="quiz-container">
        <button className="exit-button" onClick={handleExitClick}>
         나가기
        </button>

        <QuizHeader
          current={currentIndex + 1}
          total={quiz.questions.length}
          unitName={quiz.unit_name}
        />

        <div className="question-section">
          <QuizQuestion text={question.content} />
          <QuizOptions
            options={question.options}
            correctAnswer={question.correct_answer}
            selected={selected}
            submitted={submitted}
            onSelect={handleSelect}
          />
          <button
            onClick={handleSubmit}
            disabled={!selected || submitted}
            className="submit-button"
          >
            제출하기
          </button>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <p>현재까지 푼 문제는 저장되지 않습니다.<br />정말 나가시겠습니까?</p>
            <div className="modal-buttons">
              <button onClick={confirmExit} className="yes-button">예</button>
              <button onClick={cancelExit} className="no-button">아니오</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;