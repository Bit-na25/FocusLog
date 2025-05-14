import { CategoryType } from "@/recoil";
import BaseSelect from "../../common/BaseSelect";

interface CategoryOption {
  value: string;
  label: string;
}

interface Props {
  category: string;
  setCategory: (value: string) => void;
  categories: CategoryType[];
}

const CategorySelect = ({ category, setCategory, categories }: Props) => {
  const options: CategoryOption[] = [
    { value: "all", label: "카테고리 전체" },
    ...categories.map((c) => ({ value: c.id, label: c.label })),
  ];

  return <BaseSelect value={category} onChange={setCategory} options={options} />;
};

export default CategorySelect;
