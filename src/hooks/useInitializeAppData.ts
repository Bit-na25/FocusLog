import { useSetRecoilState } from "recoil";
import { useAuthUser } from "./useAuthUser";
import { categoryState, scheduleState, tagState } from "@/recoil";
import { useEffect } from "react";
import { getTags } from "@/firebase/services/tagService";
import { getCategories } from "@/firebase/services/categoryService";
import { getSchedules } from "@/firebase/services/scheduleService";
import { getLocalCategories, getLocalSchedules, getLocalTags } from "@/utils/localStorage";

export function useInitializeAppData() {
  const userId = useAuthUser();
  const setTags = useSetRecoilState(tagState);
  const setCategories = useSetRecoilState(categoryState);
  const setSchedules = useSetRecoilState(scheduleState);

  useEffect(() => {
    if (userId === null) return;

    async function init() {
      if (userId) {
        const [tags, categories, schedules] = await Promise.all([
          getTags(userId),
          getCategories(userId),
          getSchedules(userId),
        ]);

        setTags(tags);
        setCategories(categories);
        setSchedules(schedules);
      } else {
        setTags(getLocalTags());
        setCategories(getLocalCategories());
        setSchedules(getLocalSchedules());
      }
    }

    init();
  }, [userId]);
}
