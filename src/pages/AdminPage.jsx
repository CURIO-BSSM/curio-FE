import { useState } from 'react';
import Header from '../components/Header/Header';
import { addQuiz } from '../api';
import '../pages/AdminPage.css';

export default function AdminPage() {
  const [unitId, setUnitId] = useState('');
  const [content, setContent] = useState('');
  const [optionsText, setOptionsText] = useState('');
  const [correct, setCorrect] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const options = optionsText.split('\n').map(s => s.trim()).filter(Boolean);
      await addQuiz({ unit_id: Number(unitId), content, options, correct_answer: Number(correct) });
      alert('문제가 추가되었습니다.');
      setContent(''); setOptionsText(''); setUnitId(''); setCorrect(1);
    } catch (err) {
      console.warn('addQuiz failed', err);
      alert('문제 추가 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page admin-page">
      <Header />
      <div className="container">
        <h2>관리자 - 문제 추가</h2>
        <form onSubmit={handleSubmit} className="admin-form">
          <label>단원 ID<input value={unitId} onChange={e => setUnitId(e.target.value)} required /></label>
          <label>문제 내용<textarea value={content} onChange={e => setContent(e.target.value)} required /></label>
          <label>옵션 (줄바꿈으로 구분)<textarea value={optionsText} onChange={e => setOptionsText(e.target.value)} required /></label>
          <label>정답(1-based)<input type="number" min={1} value={correct} onChange={e => setCorrect(e.target.value)} required /></label>
          <button type="submit" disabled={loading}>{loading ? '로딩...' : '문제 추가'}</button>
        </form>
      </div>
    </div>
  );
}
