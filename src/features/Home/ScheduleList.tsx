import Schedule from "../../components/Schedule";

export default function ScheduleList() {
  const schedule = Array.from({ length: 10 });

  return (
    <section className="my-4">
      {schedule.length > 0 ? (
        <ul className="my-3.5 flex flex-col gap-3">
          {schedule.map((_, i) => (
            <Schedule key={i} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 w-full text-center pt-2 pb-6 font-bold">
          오늘 일정이 없습니다.
        </p>
      )}
      <button className="w-full border border-gray-300 p-2 rounded-lg">+ 일정 추가하기</button>
    </section>
  );
}
