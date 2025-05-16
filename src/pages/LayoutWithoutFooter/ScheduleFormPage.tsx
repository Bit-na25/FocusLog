import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "react-datepicker/dist/react-datepicker.css";
import PageHeader from "../../components/PageHeader";
import { formatDateOnly, formatTimeOnly } from "../../utils/date/dateUtils";
import {
  categorySelector,
  CategoryType,
  ScheduleType,
  scheduleState,
  scheduleByIdSelector,
  retrospectByScheduleIdSelector,
  retrospectState,
} from "@/recoil";
import { useAuthUser } from "@/hooks/useAuthUser";
import { addSchedule, deleteRetrospect, deleteSchedule, updateSchedule } from "@/firebase";
import PrimaryButton from "@/components/common/PrimaryButton";
import FormActionButtons from "@/components/common/FormActionButtons";
import CategoryForm from "@/components/features/scheduleForm/CategoryForm";
import DateForm from "@/components/features/scheduleForm/DateForm";
import toast from "react-hot-toast";
import AlertPopup from "@/components/common/AlertPopup";

export default function ScheduleFormPage() {
  const navigate = useNavigate();
  const { userId } = useAuthUser();
  const { state } = useLocation();
  const schedule = useRecoilValue(scheduleByIdSelector(state?.scheduleId));
  const retrospect = useRecoilValue(retrospectByScheduleIdSelector(state?.scheduleId));
  const categories = useRecoilValue(categorySelector);
  const [title, setTitle] = useState("");
  const titleRef = useRef<HTMLInputElement>(null);
  const [memo, setMemo] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>(
    state?.selectedDate ? new Date(state.selectedDate) : new Date(),
  );
  const [category, setCategory] = useState<CategoryType>(categories[0]);
  const setSchedules = useSetRecoilState(scheduleState);
  const [showAlert, setShowAlert] = useState(false);
  const setRetrospects = useSetRecoilState(retrospectState);

  useEffect(() => {
    if (schedule) {
      setTitle(schedule.title);
      setMemo(schedule.memo ?? "");
      setCategory(categories.find((c) => c.id === schedule.category) ?? categories[0]);
      setSelectedDate(new Date(`${schedule.date}T${schedule.time}`));
    }
  }, []);

  const handleSave = async () => {
    if (!title.trim()) {
      titleRef.current?.focus();
      toast.error("제목을 입력해주세요!");

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

    if (userId !== null) {
      if (schedule) {
        updateSchedule(userId, newSchedule.id, newSchedule);
      } else {
        const newId = await addSchedule(userId, newSchedule);
        newSchedule.id = newId;
      }
    }

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
    setShowAlert(false);
    if (userId !== null && schedule) {
      deleteSchedule(userId, schedule.id);
    }
    setSchedules((prev) => prev.filter((s) => s.id !== schedule?.id));

    if (retrospect) {
      if (userId !== null) {
        deleteRetrospect(userId, retrospect.id);
      }
      setRetrospects((prev) => prev.filter((s) => s.id !== retrospect.id));
    }
    navigate(-1);
  };

  return (
    <div>
      <PageHeader title="일정" />

      <section className="mt-16">
        <div>
          <label className="block mb-1 font-bold">제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력하세요."
            className="w-full text-sm p-2 border rounded bg-white focus:outline-none focus:ring-1 focus:ring-primary"
            ref={titleRef}
          ></input>
        </div>

        <DateForm selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

        <CategoryForm
          categories={categories}
          selectedCategory={category}
          setSelectedCategory={setCategory}
        />

        <div className="mt-4">
          <label className="block mb-1 font-bold">메모</label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="메모를 입력하세요."
            className="w-full text-sm p-2 border rounded h-32 resize-none bg-white focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </section>
      {!schedule ? (
        <PrimaryButton
          onClick={handleSave}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md"
        >
          저장
        </PrimaryButton>
      ) : (
        <FormActionButtons onSave={handleSave} onDelete={() => setShowAlert(true)} />
      )}
      <AlertPopup
        open={showAlert}
        message="일정을 삭제하시겠습니까?
        ( 작성된 회고도 함께 삭제됩니다. )"
        onConfirm={handleDelete}
        onClose={() => setShowAlert(false)}
      />
    </div>
  );
}
