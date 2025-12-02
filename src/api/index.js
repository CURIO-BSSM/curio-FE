const API_HOST = import.meta.env.VITE_API_HOST || 'https://port-0-curio-be-mimknx4690eeb5bb.sel3.cloudtype.app';

async function request(path, options = {}) {
  const url = `${API_HOST}${path}`;
  // attach Authorization header automatically when token is present
  const token = (() => {
    try { return localStorage.getItem('token'); } catch (e) { return null; }
  })();
  const defaultHeaders = { 'Content-Type': 'application/json' };
  if (token) defaultHeaders['Authorization'] = `Bearer ${token}`;

  const res = await fetch(url, {
    credentials: 'include',
    headers: { ...defaultHeaders, ...(options.headers || {}) },
    ...options,
  });
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  }
  if (!res.ok) throw new Error('Network error');
  return null;
}

// Quiz
export function fetchQuiz(unitId) {
  return request(`/quiz/?unit_id=${encodeURIComponent(unitId)}`);
}

export function submitQuiz(payload) {
  return request('/quiz/submit', { method: 'POST', body: JSON.stringify(payload) });
}

export function addQuiz(payload) {
  return request('/quiz/add', { method: 'POST', body: JSON.stringify(payload) });
}

// Auth
export function signup(payload) {
  return request('/auth/signup', { method: 'POST', body: JSON.stringify(payload) });
}

export function login(payload) {
  return request('/auth/login', { method: 'POST', body: JSON.stringify(payload) });
}

export function logout() {
  return request('/auth/logout', { method: 'POST', body: JSON.stringify({}) });
}

// Units
export function getUnits() {
  return request('/units/');
}

// Rankings
export function getRankings() {
  return request('/rankings/');
}

// History
export function getHistory(userId) {
  return request(`/user/${encodeURIComponent(userId)}/history`);
}

// Root
export function getRoot() {
  return request('/');
}

export default {
  fetchQuiz,
  submitQuiz,
  addQuiz,
  signup,
  login,
  logout,
  getUnits,
  getRankings,
  getHistory,
  getRoot,
};
