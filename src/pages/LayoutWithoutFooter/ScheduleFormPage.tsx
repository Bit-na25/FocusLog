import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageHeader from "../../components/PageHeader";
import { categorySelector } from "../../store/categorySelector";
import { CategoryType } from "../../types/category";
import { ScheduleType } from "../../types/schedule";
import { formatDateOnly, formatTimeOnly } from "../../utils/dateUtils";
import { scheduleState } from "../../store/scheduleAtom";
import { scheduleByIdSelector } from "../../store/scheduleSelector";
import AddCategoryModal from "../../components/AddCategoryModal";

export default function ScheduleFormPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const schedule = useRecoilValue(scheduleByIdSelector(state?.scheduleId));
  const categories = useRecoilValue(categorySelector);
  const [title, setTitle] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [memo, setMemo] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(
    state?.selectedDate ? new Date(state.selectedDate) : new Date(),
  );
  const [category, setCategory] = useState<CategoryType>(categories[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const setSchedules = useSetRecoilState(scheduleState);

  useClickOutside(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title);
      setMemo(schedule.memo ?? "");
      setCategory(categories.find((c) => c.id === schedule.category) ?? categories[0]);
      setSelectedDate(new Date(`${schedule.date}T${schedule.time}`));
    }
  }, []);

  const handleSave = () => {
    if (!title.trim()) {
      titleRef.current?.focus();
      alert("제목을 입력해주세요.");
      return;
    }

    const newSchedule: ScheduleType = {
      id: schedule?.id ?? crypto.randomUUID(),
      date: formatDateOnly(selectedDate),
      time: formatTimeOnly(selectedDate),
      title,
      memo,
      category: category.id,
      done: schedule?.done ?? false,
    };

    setSchedules((prev) => {
      if (schedule) {
        // 수정 모드 → 기존 id 덮어쓰기
        return prev.map((item) => (item.id === schedule.id ? newSchedule : item));
      }

      return [...prev, newSchedule];
    });
    navigate(-1);
  };

  const handleDelete = () => {
    setSchedules((prev) => prev.filter((s) => s.id !== schedule?.id));
    navigate(-1);
  };

  const handleChangeCategory = (category: CategoryType) => {
    setCategory(category);
    setDropdownOpen(false);
  };

  const handleOpenAddCategory = () => {
    setDropdownOpen(false);
    setShowCategoryModal(true);
  };

  return (
    <div>
      <PageHeader title="일정" />

      <section className="mt-24">
        {/* 제목 */}
        <div>
          <label className="block mb-1 text-lg font-bold">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="w-full p-2 border rounded bg-white"
            ref={titleRef}
          ></input>
        </div>

        {/* 날짜 및 시간 */}
        <div className="my-4">
          <label className="block mb-1 text-lg font-bold">날짜 및 시간</label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => date && setSelectedDate(date)}
            showTimeSelect
            timeIntervals={30} // 시간 선택 간격 (30분 단위)
            dateFormat="yyyy.MM.dd (eee) HH:mm" // 원하는 포맷
            className="w-full p-2 border rounded bg-white"
            wrapperClassName="w-full"
          />
        </div>

        {/* 카테고리 */}
        <div className="relative w-full" ref={dropdownRef}>
          <label className="block mb-1 text-lg font-bold">카테고리</label>
          <button
            onClick={() => setDropdownOpen(!open)}
            className="w-full flex items-center justify-between border p-2 rounded"
          >
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${category.color}`}></span>
              {category.label}
            </div>
            <span>{dropdownOpen ? "▲" : "▼"}</span>
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 w-full border rounded shadow bg-white">
              {categories.map((c) => (
                <div
                  key={c.id}
                  onClick={() => handleChangeCategory(c)}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  <span className={`w-3 h-3 rounded-full ${c.color}`} />
                  {c.label}
                </div>
              ))}

              <div
                className="text-center text-sm font-bold py-2 mt-2 border-t hover:bg-gray-100 cursor-pointer"
                onClick={handleOpenAddCategory}
              >
                + 새 카테고리 추가
              </div>
            </div>
          )}
        </div>

        {/* 메모 */}
        <div className="mt-4">
          <label className="block mb-1 text-lg font-bold">메모</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요."
            className="w-full p-2 border rounded h-32 resize-none bg-white"
          />
        </div>
      </section>
      {!schedule ? (
        <button
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] py-3 bg-black font-bold text-white rounded-lg shadow-lg"
          onClick={handleSave}
        >
          저장
        </button>
      ) : (
        <div className="fixed w-[90%] bottom-6 left-1/2 -translate-x-1/2 flex gap-1">
          <button
            className="w-1/2 border py-3 rounded-lg border-gray-400 bg-black font-bold text-white"
            onClick={handleSave}
          >
            저장
          </button>
          <button
            className="w-1/2 border py-3 rounded-lg border-red-400 text-red-400 font-bold"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      )}
      {showCategoryModal && (
        <AddCategoryModal
          onAddCategory={(newCategory) => {
            setCategory(newCategory);
          }}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
    </div>
  );
}
