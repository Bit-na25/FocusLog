export interface ScheduleType {
  id: string;
  date: string;
  time: string;
  title: string;
  memo?: string;
  done: boolean;
  category?: string;
}
