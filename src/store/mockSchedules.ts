// mock/schedules.ts
import { ScheduleType } from "../types/schedule";

export const mockSchedules: ScheduleType[] = [
  {
    id: "1",
    date: "2025-05-06",
    time: "08:30",
    title: "책 읽기",
    memo: "React 책 1장",
    done: true,
    category: 1,
  },
  {
    id: "2",
    date: "2025-05-06",
    time: "11:00",
    title: "운동하기",
    memo: "유산소 + 하체",
    done: false,
    category: 3,
  },
  {
    id: "3",
    date: "2025-05-07",
    time: "14:00",
    title: "FocusLog 개발",
    memo: "일정 추가 기능 구현",
    done: false,
    category: 2,
  },
  {
    id: "4",
    date: "2025-05-07",
    time: "16:00",
    title: "FocusLog 개발",
    memo: "일정 추가 기능 구현",
    done: false,
    category: 2,
  },
];
