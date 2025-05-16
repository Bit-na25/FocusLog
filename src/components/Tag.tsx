export default function Tag({ tag }: { tag: string }) {
  return (
    <span className="text-xs px-2 py-1 rounded-full shadow-sm bg-gray-100 text-gray-700">
      #{tag}
    </span>
  );
}
