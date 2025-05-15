import { useRef, useState } from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { CategoryType, categoryState, defaultCategoryColor } from "@/recoil";
import { FaCheck } from "react-icons/fa";
import { useAuthUser } from "@/hooks/useAuthUser";
import { addCategory } from "@/firebase";

interface AddCategoryModalProps {
  onClose: () => void;
  onAddCategory?: (newCategory: CategoryType) => void;
  setCategory?: SetterOrUpdater<CategoryType[]>;
}

export default function AddCategoryModal({
  onClose,
  onAddCategory,
  setCategory,
}: AddCategoryModalProps) {
  const { userId } = useAuthUser();
  const [label, setLabel] = useState("");
  const [color, setColor] = useState(defaultCategoryColor[0]);
  const labelRef = useRef<HTMLInputElement>(null);
  const setCategories = useSetRecoilState(categoryState);

  const handleSave = async () => {
    if (!label.trim()) {
      labelRef.current?.focus();
      return;
    }

    const newCategory: CategoryType = {
      id: crypto.randomUUID(),
      label,
      color,
    };
    if (setCategory != null) {
      setCategory((prev) => [...prev, newCategory]);
    } else {
      setCategories((prev) => [...prev, newCategory]);

      if (userId !== null) {
        await addCategory(userId, newCategory);
      }
    }

    if (onAddCategory != null) onAddCategory(newCategory);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%]">
        <h2 className="text-lg font-bold mb-4">카테고리 추가</h2>

        <label className="block text-sm font-semibold mb-1">이름</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="카테고리 이름"
          className="w-full border rounded px-3 py-2 mb-4 bg-white text-sm"
          ref={labelRef}
        />

        <label className="block text-sm font-semibold mb-1">색상</label>
        <div className="w-full border rounded px-3 py-2 mb-4 bg-white h-28 grid grid-cols-6 gap-1 overflow-auto">
          {defaultCategoryColor.map((c) => (
            <button
              key={c}
              className={`w-10 h-10 rounded-full ${c} flex justify-center items-center`}
              onClick={() => setColor(c)}
            >
              {c === color && <FaCheck className="text-2xl text-white" />}
            </button>
          ))}
        </div>

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
