import { useRef, useState } from "react";
import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { CategoryType, categoryState, defaultCategoryColor } from "@/recoil";
import { FaCheck } from "react-icons/fa";
import { useAuthUser } from "@/hooks/useAuthUser";
import { addCategory } from "@/firebase";
import ModalActionButtons from "./ModalActionButtons";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
      setLabel("");
      toast.error("카테고리 이름을 입력해주세요!");

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
      if (userId !== null) {
        const newId = await addCategory(userId, newCategory);
        newCategory.id = newId;
      }

      setCategories((prev) => [...prev, newCategory]);
    }

    if (onAddCategory != null) onAddCategory(newCategory);

    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl p-6 w-[80%] max-w-md"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-bold mb-4">카테고리 추가</h2>

          <label className="block text-sm font-semibold mb-1">이름</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="카테고리 이름"
            className="w-full border rounded px-3 py-2 mb-4 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            ref={labelRef}
          />

          <label className="block text-sm font-semibold mb-1">색상</label>
          <div className="w-full border rounded px-2 py-2 mb-4 bg-white h-28 grid grid-cols-6 gap-3 overflow-auto">
            {defaultCategoryColor.map((c) => (
              <button
                key={c}
                className={`w-10 h-10 rounded-full ${c} flex justify-center items-center ${c === color && "ring-2 ring-offset-1 ring-primary"}`}
                onClick={() => setColor(c)}
              >
                {c === color && <FaCheck className="text-2xl text-white" />}
              </button>
            ))}
          </div>

          <ModalActionButtons onSave={handleSave} onCancel={onClose} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
