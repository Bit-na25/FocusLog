import Tag from "./Tag";

interface LogProps {
  content: string;
  tags?: string[];
}
export default function Log({ content, tags }: LogProps) {
  return (
    <div>
      <p className="overflow-hidden text-ellipsis line-clamp-2">"{content ? content : "..."}"</p>
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
