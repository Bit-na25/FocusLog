import { useRef, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { tagState } from "../../features";

interface AddTagModal {
  onClose: () => void;
  onAddTag?: (newTag: string[]) => void;
  setTag?: SetterOrUpdater<string[]>;
}

export default function AddTagModal({ onClose, onAddTag, setTag }: AddTagModal) {
  const [label, setLabel] = useState("");
  const labelRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useRecoilState(tagState);

  const handleSave = () => {
    if (!label.trim()) {
      labelRef.current?.focus();
      return;
    }

    const addTags = label.split(",").map((t) => t.trim());
    const filterAddTags = addTags.filter((t) => !tags.includes(t));

    if (setTag != null) {
      setTag((prev) => [...prev, ...filterAddTags]);
    } else {
      setTags((prev) => [...prev, ...filterAddTags]);
    }

    if (onAddTag != null) onAddTag(addTags);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%]">
        <h2 className="text-lg font-bold mb-4">태그 추가</h2>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="뿌듯함, 피곤함"
          className="w-full border rounded px-3 py-2 mb-1 bg-white text-sm"
          ref={labelRef}
        />
        <p className="text-xs text-gray-400 ml-1 mb-4">* 쉼표로 구분하여 입력하세요.</p>

        <div className="flex justify-end gap-2">
          <button className="px-4 py-2 border rounded text-sm" onClick={onClose}>
            취소
          </button>
          <button
            className="px-4 py-2 bg-black text-white rounded text-sm font-bold"
            onClick={handleSave}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
