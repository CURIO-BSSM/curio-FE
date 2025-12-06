import { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../api';
import { clientLogout } from '../api/auth'; // 경로가 맞는지 확인 필요 (보통 ../api 로 통일했으면 거기서 가져옴)

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ★ [1] 관리자로 인정해줄 이메일 목록 정의
  const ADMIN_EMAILS = [
    'admin@bssm.hs.kr', 
    'teacher@bssm.hs.kr',
    'test@test.com' // 테스트할 때 쓰는 아이디가 있다면 추가하세요
  ];

  useEffect(() => {
    // 새로고침해도 로그인 유지 (localStorage 확인)
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(credentials) {
    const res = await apiLogin(credentials);

    try {
      if (res.access_token) localStorage.setItem('token', res.access_token);

      // 1. JWT 토큰 까보기 (백엔드가 수정됐을 때를 대비해 유지)
      let isAdmin = false;
      let nameFromToken = null;
      try {
        const token = res.access_token;
        if (token) {
          const parts = token.split('.');
          if (parts.length >= 2) {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
            if (payload) {
              if (typeof payload.is_admin !== 'undefined') isAdmin = !!payload.is_admin;
              else if (typeof payload.isAdmin !== 'undefined') isAdmin = !!payload.isAdmin;
              if (payload.sub) nameFromToken = payload.sub;
              if (payload.name) nameFromToken = payload.name;
            }
          }
        }
      } catch (e) {
        // ignore token parse errors
      }

      // 2. 응답 본문 확인 (백엔드가 수정됐을 때를 대비해 유지)
      if (!isAdmin && res) {
        if (typeof res.is_admin !== 'undefined') isAdmin = !!res.is_admin;
        else if (typeof res.isAdmin !== 'undefined') isAdmin = !!res.isAdmin;
        else if (res.role) isAdmin = res.role === 'admin' || res.role === 'superuser';
      }

      // ★ [3] 프론트엔드 강제 관리자 지정 (이게 핵심!) ★
      // 백엔드가 뭐라고 하든, 이메일이 목록에 있으면 관리자다!
      if (credentials.email && ADMIN_EMAILS.includes(credentials.email)) {
        isAdmin = true;
        console.log("👑 관리자 계정으로 로그인되었습니다:", credentials.email);
      }

      // 유저 객체 생성
      const u = res && res.user_id
        ? { 
            id: res.user_id, 
            name: nameFromToken || credentials.email || `user${res.user_id}`, 
            email: credentials.email, // 이메일 정보도 저장해두면 좋습니다
            isAdmin // 최종 결정된 권한 저장
          }
        : null;

      if (u) {
        localStorage.setItem('user', JSON.stringify(u));
        // ★ 중요: 관리자 여부를 따로 저장해두면 AdminRoute에서 쓰기 편함
        localStorage.setItem('is_admin', isAdmin); 
        setUser(u);
      }
    } catch (e) {
      console.error("Login processing error:", e);
    }
    return res;
  }

  async function signup(payload) {
    const res = await apiSignup(payload);
    return res;
  }

  async function logout() {
    try {
      await apiLogout();
    } catch (e) {
      // ignore
    }
    clientLogout(); // 로컬 스토리지 비우기
    localStorage.removeItem('is_admin'); // 관리자 정보도 지우기
    setUser(null);
  }

  const value = { user, loading, login, signup, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

export default AuthContext;