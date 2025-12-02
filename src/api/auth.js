/**
 * Client-side auth helpers.
 * The backend logout is message-only; client must clear local state.
 */
const API_HOST = import.meta.env.VITE_API_HOST || 'http://0.0.0.0:8000';

/**
 * Perform logout: try POST to backend (ignore response), then clear client storage.
 * @returns {Promise<{message:string}>}
 */
export async function logout() {
  const url = `${API_HOST}/auth/logout/`;
  try {
    // backend may only return a message; send request but do not rely on side-effects
    await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    // ignore network errors — we'll still clear client state
    // console.warn('logout request failed', err);
  }

  // Clear client-side auth state (tokens, user info)
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (e) {
    // ignore storage errors
  }
  try {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  } catch (e) {}

  // If you store auth in cookies without httpOnly, you may clear them here.

  return { message: '로그아웃 되었습니다.' };
}

/**
 * Synchronous client-only logout (no network).
 */
export function clientLogout() {
  try { localStorage.removeItem('token'); localStorage.removeItem('user'); } catch (e) {}
  try { sessionStorage.removeItem('token'); sessionStorage.removeItem('user'); } catch (e) {}
}

export default { logout, clientLogout };
