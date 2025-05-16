import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  retrospectState,
  RetrospectType,
  retrospectByScheduleIdSelector,
  scheduleByIdSelector,
  lastPageState,
} from "@/recoil";
import PageHeader from "../../components/PageHeader";
import Schedule from "../../components/Schedule";
import { formatDateOnly } from "../../utils/date/dateUtils";
import { useAuthUser } from "@/hooks/useAuthUser";
import { deleteRetrospect, updateRetrospect } from "@/firebase";
import FormActionButtons from "@/components/common/FormActionButtons";
import RetrospectTimer from "@/components/features/retrospect/RetrospectTimer";
import RetrospectTagSelector from "@/components/features/retrospect/RetrospectTagSelector";

export default function RetrospectWritePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { userId } = useAuthUser();
  const scheduleId = state?.scheduleId;
  const schedule = useRecoilValue(scheduleByIdSelector(scheduleId));
  const retrospect = useRecoilValue(retrospectByScheduleIdSelector(scheduleId));
  const setRetrospect = useSetRecoilState(retrospectState);

  const lastPage = useRecoilValue(lastPageState);
  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  useEffect(() => {
    if (retrospect) {
      setNote(retrospect.content ?? "");
      setTags(retrospect.tags ?? []);
    }
  }, [retrospect]);

  const handleSave = () => {
    if (!retrospect) return;

    const newRetrospect: RetrospectType = {
      id: retrospect.id,
      scheduleId,
      date: schedule ? schedule.date : formatDateOnly(new Date()),
      focusDuration: retrospect.focusDuration,
      content: note,
      category: schedule ? schedule.category : "",
      tags,
    };

    setRetrospect((prev) => {
      return prev.map((item) => (item.id === retrospect.id ? newRetrospect : item));
    });
    if (userId !== null) {
      updateRetrospect(userId, newRetrospect.id, newRetrospect);
    }

    navigate(lastPage);
  };

  const handleDelete = () => {
    setRetrospect((prev) => prev.filter((s) => s.id !== retrospect?.id));
    if (userId !== null && retrospect) {
      deleteRetrospect(userId, retrospect.id);
    }

    navigate(lastPage);
  };

  return (
    <div>
      <PageHeader
        title="회고 작성"
        onClick={() => {
          navigate(lastPage);
        }}
      />

      <section className="mt-16 mb-20">
        <RetrospectTimer retrospect={retrospect} />
        <Schedule scheduleId={scheduleId} isMini={false} />

        {/* 노트 작성 */}
        <div className="mt-6 mb-5">
          <label className="block mb-1 font-bold">노트</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="내용을 입력하세요."
            className="w-full text-sm border p-2 rounded resize-none h-32 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* 태그 선택 */}
        <RetrospectTagSelector tags={tags} setTags={setTags} />
      </section>

      {/* 저장 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 w-full h-20 bg-white">
        <FormActionButtons onSave={handleSave} onDelete={handleDelete} />
      </div>
    </div>
  );
}
