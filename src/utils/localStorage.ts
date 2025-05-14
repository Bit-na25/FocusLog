export const TAG_KEY = "focuslog_tags";
export const CATEGORY_KEY = "focuslog_categories";
export const STORAGE_KEY = "focuslog_schedules";

export function getLocalTags() {
  const raw = localStorage.getItem(TAG_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setLocalTags(tags: any[]) {
  localStorage.setItem(TAG_KEY, JSON.stringify(tags));
}

export function getLocalCategories() {
  const raw = localStorage.getItem(CATEGORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setLocalCategories(tags: any[]) {
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(tags));
}

export function getLocalSchedules() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setLocalSchedules(tags: any[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tags));
}
