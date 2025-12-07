import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Login.css';

import CurioLogoSvg from '../assets/lgo.svg'; 

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
      console.log("로그인 시도:", email, password);
      
      await login({ email, password }); 
      
      navigate('/main'); 

    } catch (err) {
      console.error('login failed', err);
      alert("로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="logo-area">
          <img
            src={CurioLogoSvg}
            alt="Curio Logo"
            className="login-logo-img"
          />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          
          
          <input
            name="email"
            className="login-input email-input"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          
          <div className="password-group">
            <input 
              type="password" 
              className="login-input password-input" 
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <div className="signup-link">
          계정이 없으신가요? <span onClick={() => navigate('/signup')}>회원가입 하기</span>
        </div>

      </div>
    </div>
  );
}