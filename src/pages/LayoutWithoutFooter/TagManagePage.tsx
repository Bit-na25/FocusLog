import PageHeader from "../../components/PageHeader";
import { FiPlus } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddTagModal from "../../components/modals/AddTagModal";
import ManageItemList from "../../components/features/myPage/ManageItemList";
import { tagState } from "@/recoil";
import { saveTagsToFirestore } from "@/firebase";
import { useAuthUser } from "@/hooks/useAuthUser";
import PrimaryButton from "@/components/common/PrimaryButton";

export default function TagManagePage() {
  const navigate = useNavigate();
  const { userId } = useAuthUser();
  const [tags, setTags] = useRecoilState(tagState);
  const [fixedTag, setFixedTag] = useState(tags);
  const [editingDefaultLabel, setEditingDefaultLabel] = useState<string>("");
  const [editedLabel, setEditedLabel] = useState("");
  const [showTagModal, setShowTagModal] = useState(false);

  const handleDelete = (tag: string) => {
    setFixedTag((prev) => prev.filter((t) => t !== tag));
  };

  const handleSaveEdit = () => {
    setFixedTag((prev) => prev.map((t) => (t === editingDefaultLabel ? editedLabel : t)));
    setEditingDefaultLabel("");
    setEditedLabel("");
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  const handleSave = async () => {
    setTags(fixedTag);
    if (userId !== null) await saveTagsToFirestore(userId, fixedTag);
    navigate(-1);
  };

  return (
    <div>
      <PageHeader
        title="태그 관리"
        rightSlot={
          <button onClick={() => setShowTagModal(true)} className="text-2xl">
            <FiPlus className="hover:scale-110 hover:text-primary transition-all" />
          </button>
        }
      />
      <section className="mt-20">
        <ManageItemList
          items={fixedTag}
          getKey={(tag) => tag}
          getLabel={(tag) => `# ${tag}`}
          editingKey={editingDefaultLabel}
          editedLabel={editedLabel}
          setEditedLabel={setEditedLabel}
          onEdit={(tag) => {
            setEditingDefaultLabel(tag);
            setEditedLabel(tag);
          }}
          onSaveEdit={handleSaveEdit}
          onDelete={(tag) => handleDelete(tag)}
          handleEnter={handleEnter}
        />
      </section>

      <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0 w-full bg-white">
        <PrimaryButton onClick={handleSave} className="m-6 w-[90%]">
          저장
        </PrimaryButton>
      </div>
      {showTagModal && (
        <AddTagModal onClose={() => setShowTagModal(false)} setTag={(tags) => setFixedTag(tags)} />
      )}
    </div>
  );
}
