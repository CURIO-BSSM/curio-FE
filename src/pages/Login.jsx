import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/main');
    } catch (err) {
      console.error('login failed', err);
      // Try to extract useful message from API error object
      let msg = '로그인에 실패했습니다.';
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
    <div className="page login-page">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <label>
          이메일
          <input name="email" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          비밀번호
          <input name="password" autoComplete="current-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" disabled={loading}>{loading ? '로딩...' : '로그인'}</button>
      </form>
    </div>
  );
}
