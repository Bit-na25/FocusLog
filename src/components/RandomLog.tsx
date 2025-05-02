export default function RandomLog() {
  const text =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, facilis ipsum natus  cum autem, porro nostrum rem doloribus deserunt quaerat error beatae saepe in omnis nemo necessitatibus suscipit. Laboriosam, aspernatur.";

  return (
    <div>
      <p className="overflow-hidden text-ellipsis line-clamp-2">"{text}"</p>
      <div className="flex gap-1 mt-2">
        <span className="text-sm px-2 py-1 rounded-full bg-gray-200">#집중됨</span>
        <span className="text-sm px-2 py-1 rounded-full bg-gray-200">#보람참</span>
      </div>
    </div>
  );
}
