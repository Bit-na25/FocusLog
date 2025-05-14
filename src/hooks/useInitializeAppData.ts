import { useSetRecoilState } from "recoil";
import { useAuthUser } from "./useAuthUser";
import { categoryState, retrospectState, scheduleState, tagState, targetHourAtom } from "@/recoil";
import { useEffect } from "react";
import {
  getLocalCategories,
  getLocalSchedules,
  getLocalTags,
  getLocalRetrospects,
  getLocalFocusDuration,
} from "@/utils/localStorage";
import { getCategories, getFocusDuration, getRetrospects, getSchedules, getTags } from "@/firebase";

export function useInitializeAppData() {
  const userId = useAuthUser();
  const setTags = useSetRecoilState(tagState);
  const setCategories = useSetRecoilState(categoryState);
  const setSchedules = useSetRecoilState(scheduleState);
  const setRetrospects = useSetRecoilState(retrospectState);
  const setTargetHour = useSetRecoilState(targetHourAtom);

  useEffect(() => {
    if (userId === null) return;

    async function init() {
      if (userId) {
        const [tags, categories, schedules, retrospects, hour] = await Promise.all([
          getTags(userId),
          getCategories(userId),
          getSchedules(userId),
          getRetrospects(userId),
          getFocusDuration(userId),
        ]);

        setTags(tags);
        setCategories(categories);
        setSchedules(schedules);
        setRetrospects(retrospects);
        if (hour !== null) setTargetHour(hour);
      } else {
        setTags(getLocalTags());
        setCategories(getLocalCategories());
        setSchedules(getLocalSchedules());
        setRetrospects(getLocalRetrospects());
        setTargetHour(getLocalFocusDuration());
      }
    }

    init();
  }, [userId]);
}
