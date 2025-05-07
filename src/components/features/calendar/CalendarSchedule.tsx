import LogBox from "../../LogBox";
import Schedule from "../../Schedule";

export default function CalendarSchedule({ scheduleId }: { scheduleId: string }) {
  return (
    <div>
      <Schedule scheduleId={scheduleId} />
      <LogBox scheduleId={scheduleId} />
    </div>
  );
}
