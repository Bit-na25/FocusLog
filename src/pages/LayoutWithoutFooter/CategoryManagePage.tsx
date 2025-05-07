import { useRecoilState } from "recoil";
import PageHeader from "../../components/PageHeader";
import { categoryState } from "../../store/categoryAtom";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { useState } from "react";
import AddCategoryModal from "../../components/AddCategoryModal";
import { useNavigate } from "react-router-dom";
import ColorPickerPopover from "../../components/ColorPickerPopover";

export default function CategoryManagePage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useRecoilState(categoryState);
  const [fixedCategory, setFixedCategory] = useState(categories);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedLabel, setEditedLabel] = useState("");
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleSave = () => {
    setCategories(fixedCategory);
    navigate(-1);
  };

  const handleDelete = (id: string) => {
    setFixedCategory((prev) => prev.filter((c) => c.id !== id));
  };

  const handleEdit = (id: string, label: string) => {
    setEditingId(id);
    setEditedLabel(label);
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

  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    }
  };

  const handleOpenPicker = (e: React.MouseEvent, id: string) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setEditingId(id);
    setPopoverPos({ top: rect.bottom + window.scrollY + 4, left: rect.left + window.scrollX });
    setShowColorPicker(true);
  };

  const handleSaveColorEdit = (color: string) => {
    setFixedCategory((prev) =>
      prev.map((cat) => (cat.id === editingId ? { ...cat, color: color } : cat)),
    );
    setEditingId(null);
    setShowColorPicker(false);
  };

  return (
    <div>
      <PageHeader
        title="카테고리 관리"
        rightSlot={
          <button onClick={() => setShowAddCategoryModal(true)} className="text-2xl">
            <FiPlus />
          </button>
        }
      />
      <section className="mt-20">
        <ul>
          {fixedCategory.map((cat) => (
            <li key={cat.id}>
              <div className="flex items-center justify-between py-3 h-14">
                <div className="flex items-center gap-3 flex-1 mr-3">
                  <span
                    className={`w-6 h-6 rounded-full ${cat.color}`}
                    onClick={(e) => handleOpenPicker(e, cat.id)}
                  />
                  {showColorPicker && editingId === cat.id && (
                    <ColorPickerPopover
                      position={popoverPos}
                      selectedColor={cat.color}
                      onSelect={(newColor) => {
                        handleSaveColorEdit(newColor);
                      }}
                      onClose={() => setShowColorPicker(false)}
                    />
                  )}
                  {!showColorPicker && editingId === cat.id ? (
                    <input
                      className="flex-1 border rounded px-2 py-1 bg-white"
                      value={editedLabel}
                      onChange={(e) => setEditedLabel(e.target.value)}
                      onBlur={handleSaveEdit}
                      onKeyDown={(e) => handleEnter(e)}
                      autoFocus
                    />
                  ) : (
                    <span className="flex-1" onClick={() => handleEdit(cat.id, cat.label)}>
                      {cat.label}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => {
                    handleDelete(cat.id);
                  }}
                  className="text-gray-500"
                >
                  <FiTrash2 />
                </button>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      </section>

      <div className="fixed bottom-0 left-0 right-0 w-full bg-white">
        <button
          className="m-6 w-[90%] py-3 bg-black font-bold text-white rounded-lg shadow-lg"
          onClick={handleSave}
        >
          저장
        </button>
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
