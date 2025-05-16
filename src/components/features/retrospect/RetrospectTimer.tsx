import { RetrospectType } from "@/recoil";
import { formatDuration } from "@/utils/date/formatDuration";

interface RetrospectTimerProps {
  retrospect: RetrospectType | undefined;
}

export default function RetrospectTimer({ retrospect }: RetrospectTimerProps) {
  return (
    <div>
      <p className="text-sm text-gray-400 text-center mb-1">집중 시간</p>
      <div className="text-center text-6xl font-bold mb-14">
        {formatDuration(retrospect?.focusDuration ?? 0)}
      </div>
    </div>
  );
}
