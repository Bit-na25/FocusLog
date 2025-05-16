import AddTagModal from "@/components/modals/AddTagModal";
import { tagState } from "@/recoil";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

interface RetrospectTagSelectorProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function RetrospectTagSelector({ tags, setTags }: RetrospectTagSelectorProps) {
  const allTags = useRecoilValue(tagState);
  const [showMore, setShowMore] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  const visibleTags = showMore ? allTags : allTags.slice(0, 7);

  const handleChangeTag = (tag: string) => {
    setTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleAddTag = (addTags: string[]) => {
    if (!addTags || addTags.length === 0) return;

    addTags.forEach((tag) => setTags((prev) => (prev.includes(tag) ? prev : [...prev, tag])));
  };

  return (
    <>
      <div className="my-5">
        <label className="block mb-1 text-lg font-bold flex justify-between">
          태그
          <button
            className="text-sm px-3 py-1 border rounded"
            onClick={() => setShowTagModal(true)}
          >
            +추가
          </button>
        </label>

        <div className="flex flex-wrap gap-2 mb-2">
          {visibleTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleChangeTag(tag)}
              className={`px-3 py-1 rounded-full border ${
                tags.includes(tag)
                  ? "bg-primary/20 text-primary border-primary font-semibold shadow-sm"
                  : "bg-white border"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        <button
          className="text-sm text-gray-600 block mx-auto cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          더보기 {showMore ? "▲" : "▼"}
        </button>
      </div>
      {showTagModal && (
        <AddTagModal
          onAddTag={(newTag) => {
            handleAddTag(newTag);
          }}
          onClose={() => setShowTagModal(false)}
        />
      )}
    </>
  );
}
