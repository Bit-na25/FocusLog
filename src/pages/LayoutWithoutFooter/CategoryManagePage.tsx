import { useState } from "react";
import { useRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import PageHeader from "../../components/PageHeader";
import AddCategoryModal from "../../components/modals/AddCategoryModal";
import ManageItemList from "../../components/features/myPage/ManageItemList";
import ColorPickerPopover from "../../components/modals/ColorPickerPopover";
import { categoryState, CategoryType } from "@/recoil";
import { useAuthUser } from "@/hooks/useAuthUser";
import PrimaryButton from "@/components/common/PrimaryButton";
import { syncCategoriesToFirestore } from "@/firebase";

export default function CategoryManagePage() {
  const navigate = useNavigate();
  const { userId } = useAuthUser();
  const [categories, setCategories] = useRecoilState(categoryState);
  const [fixedCategory, setFixedCategory] = useState(categories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedLabel, setEditedLabel] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [colorPickerTarget, setColorPickerTarget] = useState<{
    id: string;
    position: { top: number; left: number };
    color: string;
  } | null>(null);

  const handleEdit = (cat: CategoryType) => {
    setEditingId(cat.id);
    setEditedLabel(cat.label);
  };

  const handleSaveEdit = () => {
    setFixedCategory((prev) =>
      prev.map((cat) =>
        cat.id === editingId ? { ...cat, label: editedLabel.trim() || cat.label } : cat,
      ),
    );
    setEditingId(null);
    setEditedLabel("");
  };

  const handleDelete = (cat: CategoryType) => {
    setFixedCategory((prev) => prev.filter((item) => item.id !== cat.id));
  };

  const handleChangeColor = (id: string, color: string) => {
    setFixedCategory((prev) => prev.map((cat) => (cat.id === id ? { ...cat, color } : cat)));
    setColorPickerTarget(null);
  };

  const handleOpenColorPicker = (e: React.MouseEvent<HTMLDivElement>, cat: CategoryType) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setColorPickerTarget({
      id: cat.id,
      color: cat.color,
      position: {
        top: rect.top + 25,
        left: rect.left,
      },
    });
  };

  const handleSave = async () => {
    if (userId !== null) {
      const { added, updated } = await syncCategoriesToFirestore(userId, fixedCategory);
      setCategories([...added, ...updated]);
    } else {
      setCategories(fixedCategory);
    }
    navigate(-1);
  };

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  return (
    <div>
      <PageHeader
        title="카테고리 관리"
        rightSlot={
          <button onClick={() => setShowAddCategoryModal(true)} className="text-xl">
            <FiPlus className="hover:scale-110 hover:text-primary transition-all" />
          </button>
        }
      />
      <section className="mt-16">
        <ManageItemList<CategoryType>
          items={fixedCategory}
          getKey={(cat) => cat.id}
          getLabel={(cat) => cat.label}
          onEdit={handleEdit}
          onSaveEdit={handleSaveEdit}
          onDelete={handleDelete}
          editingKey={editingId}
          editedLabel={editedLabel}
          setEditedLabel={setEditedLabel}
          handleEnter={handleEnter}
          renderLeft={(cat) => (
            <div
              className={`w-5 h-5 rounded-full ${cat.color} cursor-pointer`}
              onClick={(e) => handleOpenColorPicker(e, cat)}
            />
          )}
        />
        {colorPickerTarget && (
          <ColorPickerPopover
            position={colorPickerTarget.position}
            selectedColor={colorPickerTarget.color}
            onSelect={(color) => handleChangeColor(colorPickerTarget.id, color)}
            onClose={() => setColorPickerTarget(null)}
          />
        )}
      </section>

      <div className="max-w-md mx-auto fixed bottom-0 left-0 right-0 w-full bg-white">
        <PrimaryButton onClick={handleSave} className="m-6 w-[90%]">
          저장
        </PrimaryButton>
      </div>

      {showAddCategoryModal && (
        <AddCategoryModal
          onClose={() => setShowAddCategoryModal(false)}
          setCategory={(categories) => setFixedCategory(categories)}
        />
      )}
    </div>
  );
}
