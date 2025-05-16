export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function splitDuration(seconds: number) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  return { h, m, s };
}

export function formatDurationKo(seconds: number): string {
  const { h, m, s } = splitDuration(seconds);

  if (h > 0) return `${h}시간 ${m}분`;
  return `${m}분 ${s}초`;
}
