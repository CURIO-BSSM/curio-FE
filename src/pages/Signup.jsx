import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Signup.css';

// SVG 로고 파일 경로에 맞게 import 하세요. (로그인 페이지와 동일한 파일 사용 가정)
import CurioLogoSvg from '../assets/lgo.svg';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [id, setId] = useState(''); // ID 필드 추가
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // ID 필드를 포함하여 서버에 전송하는 데이터 구조를 확인해주세요.
      await signup({ name, id, email, password });
      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/login');
    } catch (err) {
      console.error('signup failed', err);
      // (에러 처리 로직 생략 - 기존과 동일)
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
    <div className="signup-page"> {/* 최상위 페이지 컨테이너 */}
      <div className="signup-container"> {/* 중앙 정렬을 위한 내부 컨테이너 */}

        {/* 로고 영역 (로그인 페이지와 동일한 구조) */}
        <div className="logo-area">
          <img
            src={CurioLogoSvg}
            alt="Curio Logo"
            className="signup-logo-img"
          />
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name */}
          <input
            name="name"
            placeholder="Name" // 플레이스홀더로 변경
            className="signup-input first-input" // 첫 번째 입력창 간격 조절용 클래스 추가
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* ID (새로 추가) */}
          <input
            name="id"
            placeholder="ID"
            className="signup-input"
            autoComplete="username"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />

          {/* Email */}
          <input
            name="email"
            placeholder="Email"
            className="signup-input"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <input
            name="password"
            placeholder="Password"
            className="signup-input last-input" // 버튼과의 간격 조절용 클래스 추가
            autoComplete="new-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* 회원가입 버튼 */}
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