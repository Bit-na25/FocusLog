import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import Schedule from "../../components/Schedule";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { retrospectByScheduleIdSelector } from "../../store/retrospectSelector";
import { formatDuration } from "../../utils/formatDuration";
import { tagState } from "../../store/tagAtom";

export default function RetrospectWritePage() {
  const location = useLocation();
  const scheduleId = location.state?.scheduleId;

  const retrospect = useRecoilValue(retrospectByScheduleIdSelector(scheduleId));
  const allTags = useRecoilValue(tagState);

  const [note, setNote] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setNote(retrospect?.content ?? "");
    setTags(retrospect?.tags ?? []);
  }, []);

  const handleChangeTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  return (
    <div>
      <PageHeader title="회고 작성" />

      <section className="mt-24 mb-32">
        <div className="text-center text-6xl font-bold mb-14">
          {formatDuration(retrospect?.focusDuration ?? 0)}
        </div>

        <Schedule scheduleId={scheduleId} isMini={false} />

        <div className="mt-6 mb-5">
          <label className="block mb-1 text-lg font-bold">노트</label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="내용을 입력하세요."
            className="w-full border p-2 rounded resize-none h-32 bg-white"
          />
        </div>

        <div className="my-5">
          <label className="block mb-1 text-lg font-bold flex justify-between">
            태그
            <button className="text-sm px-3 py-1 border rounded">+추가</button>
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(showMore ? allTags : allTags.slice(0, 7)).map((tag) => (
              <button
                key={tag}
                onClick={() => handleChangeTag(tag)}
                className={`px-3 py-1 rounded-full border ${
                  tags.includes(tag) ? "bg-gray-300" : "bg-white"
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

      <div className="fixed bottom-0 left-0 right-0 w-full bg-white">
        <button
          className="m-6 w-[90%] py-3 bg-black font-bold text-white rounded-lg shadow-lg"
          onClick={() => {
            alert("저장되었습니다!");
          }}
        >
          저장
        </button>
      </div>
    </div>
  );
}
