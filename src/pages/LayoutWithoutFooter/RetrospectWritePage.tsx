import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PageHeader from "../../components/PageHeader";
import Schedule from "../../components/Schedule";
import { retrospectByScheduleIdSelector } from "../../store/retrospectSelector";
import { formatDuration } from "../../utils/formatDuration";
import { tagState } from "../../store/tagAtom";
import { retrospectState } from "../../store/retrospectAtom";
import { RetrospectType } from "../../types/retrospect";
import AddTagModal from "../../components/AddTagModal";

export default function RetrospectWritePage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const scheduleId = state?.scheduleId;

  const retrospect = useRecoilValue(retrospectByScheduleIdSelector(scheduleId));
  const setRetrospect = useSetRecoilState(retrospectState);
  const allTags = useRecoilValue(tagState);

  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  useEffect(() => {
    if (retrospect) {
      setNote(retrospect.content ?? "");
      setTags(retrospect.tags ?? []);
    }
  }, [retrospect]);

  const handleChangeTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleAddTag = (addTags: string[]) => {
    if (!addTags || addTags.length === 0) return;

    console.log(addTags);

    addTags.forEach((tag) => setTags((prev) => (prev.includes(tag) ? prev : [...prev, tag])));
  };

  const handleSave = () => {
    if (!retrospect) return;

    const newRetrospect: RetrospectType = {
      id: retrospect.id,
      scheduleId,
      focusDuration: retrospect.focusDuration,
      content: note,
      tags,
    };

    setRetrospect((prev) => {
      return prev.map((item) => (item.id === retrospect.id ? newRetrospect : item));
    });
    navigate(-1);
  };

  const handleDelete = () => {
    setRetrospect((prev) => prev.filter((s) => s.id !== retrospect?.id));
    navigate(-1);
  };

  const visibleTags = showMore ? allTags : allTags.slice(0, 7);

  return (
    <div>
      <PageHeader title="회고 작성" />

      <section className="mt-24 mb-32">
        <div className="text-center text-6xl font-bold mb-14">
          {formatDuration(retrospect?.focusDuration ?? 0)}
        </div>

        <Schedule scheduleId={scheduleId} isMini={false} />

        {/* 노트 작성 */}
        <div className="mt-6 mb-5">
          <label className="block mb-1 text-lg font-bold">노트</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="내용을 입력하세요."
            className="w-full border p-2 rounded resize-none h-32 bg-white"
          />
        </div>

        {/* 태그 선택 */}
        <div className="my-5">
          <label className="block mb-1 text-lg font-bold flex justify-between">
            태그
            <button
              className="text-sm px-3 py-1 border rounded"
              onClick={() => setShowTagModal(true)}
            >
              +추가
            </button>
          </label>

          <div className="flex flex-wrap gap-2 mb-2">
            {visibleTags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleChangeTag(tag)}
                className={`px-3 py-1 rounded-full border ${
                  tags.includes(tag) ? "bg-gray-300 shadow" : "bg-white"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          <button
            className="text-sm text-gray-600 block mx-auto"
            onClick={() => setShowMore(!showMore)}
          >
            더보기 {showMore ? "▲" : "▼"}
          </button>
        </div>
      </section>

      {/* 저장 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 w-full bg-white">
        <div className="flex gap-1 m-6 font-bold">
          <button
            className="w-1/2 border py-3 rounded-lg border-gray-400 bg-black text-white"
            onClick={handleSave}
          >
            저장
          </button>
          <button
            className="w-1/2 border py-3 rounded-lg border-red-400 text-red-400"
            onClick={handleDelete}
          >
            삭제
          </button>
        </div>
      </div>
      {showTagModal && (
        <AddTagModal
          onAddTag={(newTag) => {
            handleAddTag(newTag);
          }}
          onClose={() => setShowTagModal(false)}
        />
      )}
    </div>
  );
}
