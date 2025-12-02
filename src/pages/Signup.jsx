import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Signup.css';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({ name, email, password });
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      console.error('signup failed', err);
      // Extract server-side error message if available
      let msg = '회원가입에 실패했습니다.';
      if (err) {
        if (err.detail) {
          if (Array.isArray(err.detail)) msg = err.detail.map(d => d.msg || JSON.stringify(d)).join('\n');
          else msg = typeof err.detail === 'string' ? err.detail : JSON.stringify(err.detail);
        } else if (err.message) msg = err.message;
        else if (typeof err === 'string') msg = err;
      }
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page signup-page">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          이름
          <input name="name" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          이메일
          <input name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          비밀번호
          <input name="password" autoComplete="new-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? '로딩...' : '회원가입'}</button>
      </form>
    </div>
  );
}
