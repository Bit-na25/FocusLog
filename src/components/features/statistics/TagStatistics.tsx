import { useRecoilValue } from "recoil";
import { retrospectState } from "@/recoil";
import { DateRange } from "../../../utils/date/dateRangeFilter";
import { filterRetrospects } from "../../../utils/filter/filterRetrospects";

type tagCount = Record<string, number>;
const showCount = 5;

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
    <div className="mb-4">
      <h2 className="font-bold mb-2">감정 태그 통계</h2>
      <div className="flex flex-col gap-2">
        {topTags.map(([tag, count]) => (
          <div key={tag} className="flex items-center gap-2">
            <span className="w-20">#{tag}</span>
            <div className="flex-1 bg-gray-200 h-3 rounded-full">
              <div
                className={`h-full rounded-full ${count === maxCount ? "bg-yellow-400" : "bg-gray-400"}`}
                style={{ width: `${(count / filtered.length) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
