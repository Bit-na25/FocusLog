import { useRecoilValue } from "recoil";
import ContentBox from "../../components/common/ContentBox";
import LogBox from "../../components/LogBox";
import { todayRetrospectSelector } from "../../store/retrospectSelector";
import { useEffect, useState } from "react";

export default function RetrospectBox() {
  const [showIndex, setShowIndex] = useState(-1);
  const retrospects = useRecoilValue(todayRetrospectSelector);

  useEffect(() => {
    setShowIndex(Math.floor(Math.random() * retrospects.length));
  }, []);

  const handleChangeLog = () => {
    let index = -1;
    do {
      index = Math.floor(Math.random() * retrospects.length);
    } while (index === showIndex);

    setShowIndex(index);
  };

  return (
    <section className="my-8 pb-8">
      <h2 className="flex justify-between text-xl font-bold mb-2">
        회고 현황
        {retrospects.length > 0 && (
          <button
            className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-normal"
            onClick={handleChangeLog}
          >
            {showIndex + 1}/{retrospects.length}
          </button>
        )}
      </h2>
      {retrospects.length > 0 ? (
        <LogBox scheduleId={retrospects[showIndex]?.scheduleId} />
      ) : (
        <ContentBox>
          <p className="text-m">오늘 회고가 아직 없습니다.</p>
          <p className="text-sm">* 회고는 타이머 완료 후 작성할 수 있어요.</p>
        </ContentBox>
      )}
    </section>
  );
}
