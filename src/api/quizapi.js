export async function fetchQuiz(unitId) {
  const res = await fetch(`http://0.0.0.0:8000/quiz/?unit_id=${unitId}`);
  if (!res.ok) throw new Error("퀴즈 데이터를 불러오지 못했습니다.");
  return await res.json();
}