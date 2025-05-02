import LogBox from "../../components/LogBox";
import Schedule from "../../components/Schedule";

export default function ScheduleList() {
  const schedule = Array.from({ length: 10 });

  return (
    <section className="my-4 pb-4">
      <h2 className="text-xl font-bold mb-2">4월 25일 목요일</h2>
      {schedule.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {schedule.map((_, i) => (
            <div key={i}>
              <Schedule />
              <LogBox />
            </div>
          ))}
        </ul>
      ) : (
        <div className="flex text-[1.1rem] font-bold">
          <div className="border-l-4 border-gray-500 mr-2" />
          <p className="mr-7 text-gray-400">일정이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
