import { useSetRecoilState } from "recoil";
import { useAuthUser } from "./useAuthUser";
import { categoryState, retrospectState, scheduleState, tagState } from "@/recoil";
import { useEffect } from "react";
import { getTags } from "@/firebase/services/tagService";
import { getCategories } from "@/firebase/services/categoryService";
import { getSchedules } from "@/firebase/services/scheduleService";
import {
  getLocalCategories,
  getLocalSchedules,
  getLocalTags,
  getLocalRetrospects,
} from "@/utils/localStorage";
import { getRetrospects } from "@/firebase/services/retrospectService";

export function useInitializeAppData() {
  const userId = useAuthUser();
  const setTags = useSetRecoilState(tagState);
  const setCategories = useSetRecoilState(categoryState);
  const setSchedules = useSetRecoilState(scheduleState);
  const setRetrospects = useSetRecoilState(retrospectState);

  useEffect(() => {
    if (userId === null) return;

    async function init() {
      if (userId) {
        const [tags, categories, schedules, retrospects] = await Promise.all([
          getTags(userId),
          getCategories(userId),
          getSchedules(userId),
          getRetrospects(userId),
        ]);

        setTags(tags);
        setCategories(categories);
        setSchedules(schedules);
        setRetrospects(retrospects);
      } else {
        setTags(getLocalTags());
        setCategories(getLocalCategories());
        setSchedules(getLocalSchedules());
        setRetrospects(getLocalRetrospects());
      }
    }

    init();
  }, [userId]);
}
