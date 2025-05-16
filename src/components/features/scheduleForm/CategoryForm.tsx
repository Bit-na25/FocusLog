import AddCategoryModal from "@/components/modals/AddCategoryModal";
import { useClickOutside } from "@/hooks/useClickOutside";
import { CategoryType } from "@/recoil";
import { useRef, useState } from "react";

interface CategoryFormProps {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  setSelectedCategory: React.Dispatch<React.SetStateAction<CategoryType>>;
}

export default function CategoryForm({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryFormProps) {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setDropdownOpen(false), dropdownOpen);

  const handleChangeCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const handleOpenAddCategory = () => {
    setDropdownOpen(false);
    setShowCategoryModal(true);
  };

  return (
    <div>
      <div className="relative w-full" ref={dropdownRef}>
        <label className="block mb-1 font-bold">카테고리</label>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`w-full flex items-center justify-between border py-2 px-4 rounded mb-1 ${dropdownOpen && "focus:ring-1 focus:ring-primary"}`}
        >
          <div className="flex items-center gap-2 text-sm">
            <span className={`w-3 h-3 rounded-full ${selectedCategory.color}`}></span>
            {selectedCategory.label}
          </div>
          <span className="text-sm">{dropdownOpen ? "▲" : "▼"}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute z-10 w-full h-48 border rounded shadow bg-white overflow-auto ">
            {categories.map((c) => (
              <div
                key={c.id}
                onClick={() => handleChangeCategory(c)}
                className={`flex items-center text-sm gap-2 px-4 py-2 ${selectedCategory.id === c.id ? "bg-primary/80 text-white" : "hover:bg-primary/10"} cursor-pointer`}
              >
                <span className={`w-3 h-3 rounded-full ${c.color}`} />
                {c.label}
              </div>
            ))}

            <div
              className="text-center text-sm font-bold py-2 mt-2 border-t hover:bg-primary/10 cursor-pointer"
              onClick={handleOpenAddCategory}
            >
              + 새 카테고리 추가
            </div>
          </div>
        )}
      </div>
      {showCategoryModal && (
        <AddCategoryModal
          onAddCategory={(newCategory) => {
            setSelectedCategory(newCategory);
          }}
          onClose={() => setShowCategoryModal(false)}
        />
      )}
    </div>
  );
}
