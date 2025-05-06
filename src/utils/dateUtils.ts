// 날짜 포맷: YYYY-MM-DD (로컬 기준)
export const formatDateOnly = (date: Date): string => date.toLocaleDateString("sv-SE");

// 날짜 포맷: YYYY-MM-DD (UTC 기준)
export const formatToISOStringDate = (date: Date): string => date.toISOString().split("T")[0];

export const formatTimeOnly = (date: Date): string => {
  const h = date.getHours().toString().padStart(2, "0");
  const m = date.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
};
// 날짜 포맷: "2025년 5월 6일 월요일"
export function formatToKoreanDate(date: Date): string {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${getKoreanDayName(date.getDay())}`;
}

// 날짜 포맷: "5월 6일 월요일"
export function formatToKoreanDateWithoutYear(date: Date): string {
  return `${date.getMonth() + 1}월 ${date.getDate()}일 ${getKoreanDayName(date.getDay())}`;
}

// 숫자 요일 → 한글 요일 이름
export function getKoreanDayName(day: number): string {
  const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  return dayNames[day];
}
