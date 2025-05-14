// utils/localStorage.ts
export const TAG_KEY = "focuslog_tags";

export function getLocalTags() {
  const raw = localStorage.getItem(TAG_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setLocalTags(tags: any[]) {
  localStorage.setItem(TAG_KEY, JSON.stringify(tags));
}
