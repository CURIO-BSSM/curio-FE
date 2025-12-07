import { createContext, useContext, useEffect, useState } from 'react';
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../api';
import { clientLogout } from '../api/auth'; 

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 관리자 이메일 목록
  const ADMIN_EMAILS = [
    'admin@bssm.hs.kr', 
    'teacher@bssm.hs.kr',
    'test@test.com'
  ];

  useEffect(() => {
    try {
      const raw = localStorage.getItem('user');
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

  async function login(credentials) {
    const res = await apiLogin(credentials);

    try {
      if (res.access_token) localStorage.setItem('token', res.access_token);

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
      } catch (e) {}

      if (!isAdmin && res) {
        if (typeof res.is_admin !== 'undefined') isAdmin = !!res.is_admin;
        else if (typeof res.isAdmin !== 'undefined') isAdmin = !!res.isAdmin;
        else if (res.role) isAdmin = res.role === 'admin' || res.role === 'superuser';
      }

      // ★ 이메일 확인해서 강제 관리자 부여
      if (credentials.email && ADMIN_EMAILS.includes(credentials.email)) {
        isAdmin = true;
      }

      const u = res && res.user_id
        ? { 
            id: res.user_id, 
            name: nameFromToken || credentials.email || `user${res.user_id}`, 
            email: credentials.email, 
            isAdmin 
          }
        : null;

      if (u) {
        localStorage.setItem('user', JSON.stringify(u));
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
    try { await apiLogout(); } catch (e) {}
    clientLogout(); 
    localStorage.removeItem('is_admin'); 
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