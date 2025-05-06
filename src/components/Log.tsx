interface LogProps {
  content: string;
  tags?: string[];
}
export default function Log({ content, tags }: LogProps) {
  return (
    <div>
      <p className="overflow-hidden text-ellipsis line-clamp-2">"{content ? content : "..."}"</p>
      {tags && (
        <div className="flex gap-1 mt-2">
          {tags.map((tag) => (
            <span key={tag} className="text-sm px-2 py-1 rounded-full bg-gray-200">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
