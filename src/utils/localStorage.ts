import { defaultDuration } from "@/recoil";

export const TAG_KEY = "focuslog_tags";
export const CATEGORY_KEY = "focuslog_categories";
export const STORAGE_KEY = "focuslog_schedules";
export const RETROSPECT_KEY = "focuslog_retrospects";
export const FOCUS_DURATION_KEY = "focuslog_focus_duration";

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

export function setLocalCategories(categories: any[]) {
  localStorage.setItem(CATEGORY_KEY, JSON.stringify(categories));
}

export function getLocalSchedules() {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setLocalSchedules(schedules: any[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
}

export function getLocalRetrospects() {
  const raw = localStorage.getItem(RETROSPECT_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function setLocalRetrospects(retrospects: any[]) {
  localStorage.setItem(RETROSPECT_KEY, JSON.stringify(retrospects));
}

export function getLocalFocusDuration() {
  const raw = localStorage.getItem(FOCUS_DURATION_KEY);
  console.log(raw);
  return raw ? JSON.parse(raw) : defaultDuration;
}

export function setLocalFocusDuration(time: number) {
  localStorage.setItem(FOCUS_DURATION_KEY, JSON.stringify(time));
}
