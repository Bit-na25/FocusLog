import ContentBox from "../../components/common/ContentBox";
import LogBox from "../../components/LogBox";

export default function RetrospectBox() {
  const data = 1;
  return (
    <section className="my-8 pb-8">
      <h2 className="flex justify-between text-xl font-bold mb-2">
        회고 현황
        {data && (
          <button className="px-3 py-1 border border-gray-300 rounded-lg text-sm font-normal">
            2/3
          </button>
        )}
      </h2>
      {data ? (
        <LogBox />
      ) : (
        <ContentBox>
          <p className="text-m">오늘 회고가 아직 없습니다.</p>
          <p className="text-sm">* 회고는 타이머 완료 후 작성할 수 있어요.</p>
        </ContentBox>
      )}
    </section>
  );
}
