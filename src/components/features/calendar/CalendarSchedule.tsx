import LogBox from "../../components/LogBox";
import Schedule from "../../components/Schedule";

export default function CalendarSchedule({ scheduleId }: { scheduleId: string }) {
  return (
    <div>
      <Schedule scheduleId={scheduleId} />
      <LogBox scheduleId={scheduleId} />
    </div>
  );
}
