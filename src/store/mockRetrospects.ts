// mock/retrospects.ts
import { RetrospectType } from "../types/retrospect";

export const mockRetrospects: RetrospectType[] = [
  {
    id: "r1",
    scheduleId: "1",
    content: "1장 읽고 이해 잘 됐음. 집중도 높았음.",
    focusDuration: 3600, // 1시간
    tags: ["집중됨", "뿌듯함"],
  },
  {
    id: "r2",
    scheduleId: "2",
    content: "",
    focusDuration: 1800, // 30분
  },
  {
    id: "r3",
    scheduleId: "3",
    content: "기능 하나는 완성했는데 리팩토링이 더 필요함.",
    focusDuration: 5400, // 1시간 30분
  },
];
