import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PageHeader from "../../components/PageHeader";

const categories = [
  { id: "1", name: "Study", color: "bg-yellow-400" },
  { id: "2", name: "Meeting", color: "bg-green-400" },
  { id: "3", name: "Work", color: "bg-purple-500" },
];

export default function ScheduleFormPage() {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [category, setCategory] = useState(categories[0]);
  const [memo, setMemo] = useState("");
  const [open, setOpen] = useState(false);
  const readOnly = false;

  return (
    <div>
      <PageHeader title="일정" />

      <section className="mt-24">
        <div>
          <label className="block mb-1 text-lg font-bold">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="w-full p-2 border rounded bg-white"
            disabled={readOnly}
          ></input>
        </div>

        <div className="my-4">
          <label className="block mb-1 text-lg font-bold">날짜 및 시간</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showTimeSelect
            timeIntervals={30} // 시간 선택 간격 (30분 단위)
            dateFormat="yyyy.MM.dd (eee) HH:mm" // 원하는 포맷
            className="w-full p-2 border rounded bg-white" // Tailwind로 예쁘게
            placeholderText="날짜 및 시간을 선택하세요"
            wrapperClassName="w-full"
            disabled={readOnly}
          />
        </div>

        <div className="relative w-full">
          <label className="block mb-1 text-lg font-bold">카테고리</label>
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between border p-2 rounded"
            disabled={readOnly}
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
              {category.name}
            </div>
            <span>{!readOnly && (open ? "▲" : "▼")}</span>
          </button>

          {open && (
            <div className="absolute z-10 w-full border rounded shadow bg-white">
              {categories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    setCategory(c);
                    setOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span className={`w-3 h-3 rounded-full ${c.color}`}></span>
                  {c.name}
                </div>
              ))}

              <div
                className="text-center text-sm font-bold py-2 mt-2 border-t hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  alert("카테고리 추가 기능 연결 예정");
                  setOpen(false);
                }}
              >
                + 새 카테고리 추가
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-lg font-bold">메모</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요."
            className="w-full p-2 border rounded h-32 resize-none bg-white"
            disabled={readOnly}
          />
        </div>

        {readOnly && (
          <div className="flex justify-end gap-1">
            <button
              className="border px-5 py-1 rounded border-gray-400 font-bold text-sm"
              onClick={() => {}}
            >
              수정
            </button>
            <button
              className="border px-5 py-1 rounded border-red-400 text-red-400 font-bold text-sm"
              onClick={() => {}}
            >
              삭제
            </button>
          </div>
        )}
      </section>
      {readOnly ? (
        <button
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] py-3 bg-black font-bold text-white rounded-lg shadow-lg"
          onClick={() => {}}
        >
          집중 시작
        </button>
      ) : (
        <button
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] py-3 bg-black font-bold text-white rounded-lg shadow-lg"
          onClick={() => {
            console.log({ title, selectedDate, category, memo });
            alert("저장되었습니다!");
          }}
        >
          저장
        </button>
      )}
    </div>
  );
}
