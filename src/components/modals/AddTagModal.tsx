import { useRef, useState } from "react";
import { SetterOrUpdater, useRecoilState } from "recoil";
import { tagState } from "@/recoil";
import { useAuthUser } from "@/hooks/useAuthUser";
import { addTags as addTagsToFirestore } from "@/firebase";
import ModalActionButtons from "./ModalActionButtons";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

interface AddTagModal {
  onClose: () => void;
  onAddTag?: (newTag: string[]) => void;
  setTag?: SetterOrUpdater<string[]>;
}

export default function AddTagModal({ onClose, onAddTag, setTag }: AddTagModal) {
  const { userId } = useAuthUser();
  const [label, setLabel] = useState("");
  const labelRef = useRef<HTMLInputElement>(null);
  const [tags, setTags] = useRecoilState(tagState);
  const maxLabel = 10;

  const handleSave = async () => {
    if (!label.trim()) {
      labelRef.current?.focus();
      setLabel("");
      toast.error("태그를 입력해주세요!");
      return;
    }

    const addTags = label.split(",").map((t) => t.trim());
    const filterAddTags = addTags.filter((t) => !tags.includes(t));

    if (setTag != null) {
      setTag((prev) => [...prev, ...filterAddTags]);
    } else {
      setTags((prev) => [...prev, ...filterAddTags]);

      if (userId !== null) {
        await addTagsToFirestore(userId, filterAddTags);
      }
    }

    if (onAddTag != null) onAddTag(addTags);

    onClose();
  };

  const handleChangeLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const labels = e.target.value.split(",").map((t) => t.trim());
    if (labels.length > 0 && labels.some((l) => l.length > maxLabel)) {
      toast.error(`${maxLabel}자를 넘는 태그는 추가할 수 없어요.`);

      return;
    }

    setLabel(e.target.value);
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
          className="bg-white rounded-lg shadow-xl p-6 w-[80%] max-w-sm"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h2 className="text-lg font-bold mb-4">태그 추가</h2>
          <input
            type="text"
            value={label}
            onChange={handleChangeLabel}
            placeholder="뿌듯함, 피곤함"
            className="w-full border rounded px-3 py-2 mb-1 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            ref={labelRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            autoFocus
          />
          <p className="text-xs text-gray-400 ml-1">* 쉼표로 구분하여 입력하세요.</p>
          <p className="text-xs text-gray-400 ml-1 mb-4">
            각 태그는 최대 {maxLabel}자까지 입력할 수 있습니다.
          </p>

          <ModalActionButtons onSave={handleSave} onCancel={onClose} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
