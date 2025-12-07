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
  const [serverScore, setServerScore] = useState(null);
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

  useEffect(() => {
    if (!showResult) return;
    (async () => {
      try {
        const params = new URLSearchParams(location.search);
        const unitId = Number(params.get('unit') || 1);
        const payload = {
          user_id: user ? user.id : null,
          unit_id: unitId,
          answers,
        };
        console.log('Submitting answers:', JSON.stringify(payload, null, 2));
        const response = await submitQuiz(payload);
        console.log('Server response:', response);
        if (response && typeof response.score !== 'undefined') {
          setServerScore(response.score);
        }
      } catch (err) {
        console.error('submitQuiz failed', err);
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
      const q = quiz.questions[currentIndex];
      const labels = ["A", "B", "C", "D", "E"];
      const selectedIndex = labels.indexOf(selected);
      const selectedOneBased = selectedIndex >= 0 ? selectedIndex + 1 : null;
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
    }, 2500);
  };

  

  const handleExitClick = () => {
    setShowModal(true);
  };

  const confirmExit = () => {
    setShowModal(false);
    navigate("/main");
  };

  const cancelExit = () => {
    setShowModal(false);
  };

  if (showResult) {
    let displayScore = Math.round((correctCount / quiz.questions.length) * 100);
    if (serverScore !== null) displayScore = serverScore;
    return (
      <div className="quiz-page">
        <div className="quiz-container">
          <QuizResult
            score={displayScore}
            correct={correctCount}
            wrong={wrongCount}
            total={quiz.questions.length}
            onRetry={() => {
              setCurrentIndex(0);
              setSelected(null);
              setSubmitted(false);
              setCorrectCount(0);
              setWrongCount(0);
              setShowResult(false);
            }}
            onHome={() => navigate('/main')}
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
              <button onClick={cancelExit} className="no-button">아니오</button>
              <button onClick={confirmExit} className="yes-button">예</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuizPage;