import { useState } from "react";
import UnderLine from "../components/common/UnderLine";
import ContentBox from "../components/common/ContentBox";
import Log from "../components/Log";

export default function StatisticsPage() {
  const [period, setPeriod] = useState("1week");
  const [category, setCategory] = useState("all");

  return (
    <div>
      <header className="py-4 text-xl font-bold text-center">통계</header>

      <div className="flex gap-2 mb-4">
        <select
          className="border rounded p-2 flex-1 bg-white"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="1week">최근 1주</option>
          <option value="1month">최근 1개월</option>
        </select>
        <select
          className="border rounded p-2 flex-1 bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">카테고리 전체</option>
          <option value="study">Study</option>
          <option value="meeting">Meeting</option>
        </select>
      </div>
      <UnderLine />

      <div className="my-4 flex justify-between items-center">
        <h2 className="font-bold">총 집중 시간</h2>
        <p className="text-2xl font-bold">
          <span className="text-3xl">14시간</span> 30분
        </p>
      </div>
      <hr className="my-4" />

      <div className="my-4">
        <h2 className="font-bold mb-2">요일별 집중 시간</h2>
        <div className="flex justify-between items-end h-32 px-6">
          {[1, 2, 3, 4, 5, 2, 1].map((v, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className={`w-4 rounded-t bg-${i === 2 ? "sky" : "gray"}-400`}
                style={{ height: `${v * 10}px` }}
              ></div>
              <span className="text-sm mt-1">{"일월화수목금토"[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4" />

      <div className="mb-4">
        <h2 className="font-bold mb-2">감정 태그 통계</h2>
        <div className="flex flex-col gap-2">
          {["집중됨", "피곤함", "주의산만"].map((tag, i) => (
            <div key={tag} className="flex items-center gap-2">
              <span className="w-20">#{tag}</span>
              <div className="flex-1 bg-gray-200 h-3 rounded-full">
                <div
                  className={`h-full rounded-full ${i === 0 ? "bg-yellow-300 w-[80%]" : i === 1 ? "bg-gray-400 w-[60%]" : "bg-gray-300 w-[30%]"}`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="my-4" />

      <div className="mb-4">
        <p className="font-bold mb-2">회고 작성률</p>
        <ContentBox>
          <div className="flex items-center gap-3">
            <div className="relative w-16 h-16 shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#eee" strokeWidth="4" />
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#facc15"
                  strokeWidth="4"
                  strokeDasharray="113"
                  strokeDashoffset="34"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                70%
              </div>
            </div>
            <Log />
          </div>
        </ContentBox>
      </div>
    </div>
  );
}
