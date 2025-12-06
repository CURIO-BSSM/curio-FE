import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Login.css';

// ▼ STEP 1: SVG 파일 경로에 맞춰 import 하세요.
// 만약 src/assets/ 폴더 안에 curio_logo.svg 파일이 있다면 아래와 같습니다.
// 경로가 다르다면 본인의 파일 위치에 맞게 수정해주세요.
import CurioLogoSvg from '../assets/lgo.svg'; // <-- 파일 경로 확인 필요!

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // (로그인 로직 생략 - 기존과 동일)
    try {
      // 임시 로직 테스트용 (실제 사용시에는 await login(...) 주석 해제)
      console.log("로그인 시도:", email, password);
      // await login({ email, password });
      // navigate('/main');
    } catch (err) {
      console.error('login failed', err);
      // (에러 처리 로직 생략 - 기존과 동일)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* ▼ STEP 2: 로고 영역 수정 */}
        <div className="logo-area">
          {/* 기존 텍스트 span은 지우고 img 태그를 넣습니다. */}
          <img
            src={CurioLogoSvg}    // 위에서 import한 이름
            alt="Curio Logo"      // 이미지 설명
            className="login-logo-img" // CSS 스타일링을 위한 클래스 추가
          />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* (폼 내용 생략 - 기존과 동일) */}
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
          {/* ... 나머지 폼 요소들 ... */}
          {/* 비밀번호 입력 (생략) */}
          <div className="password-group">
            <input type="password" className="login-input password-input" placeholder="Password" />
            <div className="find-pw-link">비밀번호를 잊으셨나요? <span>비밀번호 찾기</span></div>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>{loading ? '로딩...' : '로그인'}</button>
        </form>

        <div className="signup-link">
          계정이 없으신가요? <span onClick={() => navigate('/signup')}>회원가입 하기</span>
        </div>

      </div>
    </div>
  );
}