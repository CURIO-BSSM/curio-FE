
const API_HOST = import.meta.env.VITE_API_HOST;

export async function logout() {
  const url = `${API_HOST}/auth/logout/`;
  try {
    await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
  }

  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (e) {
  }
  try {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  } catch (e) {}

  return { message: '로그아웃 되었습니다.' };
}

export function clientLogout() {
  try { localStorage.removeItem('token'); localStorage.removeItem('user'); } catch (e) {}
  try { sessionStorage.removeItem('token'); sessionStorage.removeItem('user'); } catch (e) {}
}

export default { logout, clientLogout };
