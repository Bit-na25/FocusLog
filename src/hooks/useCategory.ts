import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { useAuthUser } from "../hooks/useAuthUser";
import { getCategories } from "../firebase/services/categoryService";
import { getLocalCategories } from "../utils/localStorage";
import { categoryState } from "../recoil/category/atom";

export function useInitializeCategoryState() {
  const userId = useAuthUser();
  const setCategories = useSetRecoilState(categoryState);

  useEffect(() => {
    if (userId === null) return;

    const init = async () => {
      if (userId) {
        const categories = await getCategories(userId);
        setCategories(categories);
      } else {
        const categories = getLocalCategories();
        setCategories(categories);
      }
    };

    init();
  }, [userId]);
}
