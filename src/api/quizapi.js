/**
 * Fetch quiz data for a given unit ID.
 * Uses `VITE_API_HOST` when available, otherwise falls back to localhost.
 * Behavior: preserves original error message when the response is not OK.
 * @param {number|string} unitId
 * @returns {Promise<any>}
 */
export async function fetchQuiz(unitId) {
  const API_HOST = import.meta.env.VITE_API_HOST || 'https://port-0-curio-be-mimknx4690eeb5bb.sel3.cloudtype.app';
  const url = `${API_HOST}/quiz/?unit_id=${encodeURIComponent(unitId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("퀴즈 데이터를 불러오지 못했습니다.");
  return res.json();
}

export async function Logout() {
  const API_HOST = import.meta.env.VITE_API_HOST || 'https://port-0-curio-be-mimknx4690eeb5bb.sel3.cloudtype.app';
  const url = `${API_HOST}/auth/logout}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("퀴즈 데이터를 불러오지 못했습니다.");
  return res.json();
}