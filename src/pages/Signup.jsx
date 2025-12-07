import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Signup.css';

import CurioLogoSvg from '../assets/lgo.svg';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup({ name, id, email, password });
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      console.error('signup failed', err);
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
    <div className="signup-page"> 
      <div className="signup-container"> 

        
        <div className="logo-area">
          <img
            src={CurioLogoSvg}
            alt="Curio Logo"
            className="signup-logo-img"
          />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          
          <input
            name="name"
            placeholder="Name"
            className="signup-input first-input"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          
          <input
            name="id"
            placeholder="ID"
            className="signup-input"
            autoComplete="username"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />

          
          <input
            name="email"
            placeholder="Email"
            className="signup-input"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          
          <input
            name="password"
            placeholder="Password"
            className="signup-input last-input"
            autoComplete="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          
          <button
            type="submit"
            className="signup-btn"
            disabled={loading}
          >
            {loading ? '로딩...' : '회원가입'}
          </button>
        </form>
      </div>
    </div>
  );
}