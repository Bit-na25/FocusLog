export interface RetrospectType {
  id: string;
  scheduleId: string;
  date: string;
  focusDuration: number;
  content: string;
  category: string;
  tags?: string[];
}
