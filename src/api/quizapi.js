
export async function fetchQuiz(unitId) {
  const API_HOST = import.meta.env.VITE_API_HOST
  const url = `${API_HOST}/quiz/?unit_id=${encodeURIComponent(unitId)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("퀴즈 데이터를 불러오지 못했습니다.");
  return res.json();
}

export async function Logout() {
  const API_HOST = import.meta.env.VITE_API_HOST
  const url = `${API_HOST}/auth/logout`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("퀴즈 데이터를 불러오지 못했습니다.");
  return res.json();
}