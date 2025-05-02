export default function Schedule({ isMini = true }: { isMini?: boolean }) {
  const title = "Study Session";
  const time = "10:00";

  return (
    <>
      {isMini ? (
        <div className="flex text-[1.1rem] font-bold">
          <div className="border-l-4 border-blue-600 mr-2" />
          <p className="mr-7 text-gray-500">{time}</p>
          <p>{title}</p>
        </div>
      ) : (
        <div className="flex items-center">
          <div className="w-1 h-14 bg-yellow-400 mr-5"></div>
          <div>
            <div className="text-3xl font-bold">{title}</div>
            <div className="text-sm text-gray-400 font-bold">시작 {time}</div>
          </div>
        </div>
      )}
    </>
  );
}
