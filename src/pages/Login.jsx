import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Login.css';

// 로고 파일 경로가 맞는지 꼭 확인하세요!
import CurioLogoSvg from '../assets/lgo.svg'; 

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // AuthContext에서 로그인 함수 가져오기
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ★ 수정 1: 주석 해제 및 실제 로그인 실행
      console.log("로그인 시도:", email, password); // 확인용 로그
      
      // 1. 백엔드로 로그인 요청
      await login({ email, password }); 
      
      // 2. 성공 시 메인(또는 랭킹) 페이지로 이동
      // (이동하고 싶은 주소로 바꾸세요. 예: '/ranking' 또는 '/')
      navigate('/main'); 

    } catch (err) {
      console.error('login failed', err);
      // ★ 수정 2: 사용자에게 에러 알려주기 (alert)
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
          
          {/* 이메일 입력 */}
          <input
            name="email"
            className="login-input email-input"
            placeholder="ID / Email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* 비밀번호 입력 */}
          <div className="password-group">
            <input 
              type="password" 
              className="login-input password-input" 
              placeholder="Password"
              // ★ 수정 3: 비밀번호 입력 기능 연결 (이게 없으면 비밀번호가 안 보내짐)
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="find-pw-link">비밀번호를 잊으셨나요? <span>비밀번호 찾기</span></div>
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