import { useRecoilValue } from "recoil";
import { retrospectState } from "@/recoil";
import { DateRange } from "../../../utils/date/dateRangeFilter";
import { filterRetrospects } from "../../../utils/filter/filterRetrospects";

type tagCount = Record<string, number>;
const showCount = 4;

interface TagStatisticsProps {
  period: DateRange;
  category: string;
}

export default function TagStatistics({ period, category }: TagStatisticsProps) {
  const retrospects = useRecoilValue(retrospectState);
  const filtered = filterRetrospects(retrospects, period, category);

  const tagCounts: tagCount = {};
  filtered.forEach((r) => {
    r.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const maxCount = Math.max(...Object.values(tagCounts), 1);

  const topTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, showCount);

  return (
    <div className="mb-6">
      <h2 className="font-bold mb-2">감정 태그 통계</h2>
      <div className="flex flex-col gap-2">
        {topTags.length > 0 ? (
          topTags.map(([tag, count]) => {
            const rate = Math.floor((count / filtered.length) * 100);

            return (
              <div key={tag} className="flex items-center gap-2">
                <span className="w-16 text-sm font-bold line-clamp-1 text-ellipsis overflow-hidden">
                  #{tag}
                </span>
                <div className="flex flex-1 items-center gap-2">
                  <div className="flex-1 bg-gray-200 h-3 rounded-full">
                    <div
                      className={`h-full rounded-full ${count === maxCount ? "bg-primary/80" : "bg-gray-300"}`}
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                  <div className="w-10 text-end text-sm">{rate}%</div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 w-full text-xs text-center pt-2 font-bold">
            선택된 태그가 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
