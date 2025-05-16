import { useSetRecoilState } from "recoil";
import { categoryState, retrospectState, scheduleState, tagState, targetHourAtom } from "@/recoil";
import {
  getLocalCategories,
  getLocalSchedules,
  getLocalTags,
  getLocalRetrospects,
  getLocalFocusDuration,
} from "@/utils/localStorage";
import { getCategories, getFocusDuration, getRetrospects, getSchedules, getTags } from "@/firebase";

export function useInitializeAppData() {
  const setTags = useSetRecoilState(tagState);
  const setCategories = useSetRecoilState(categoryState);
  const setSchedules = useSetRecoilState(scheduleState);
  const setRetrospects = useSetRecoilState(retrospectState);
  const setTargetHour = useSetRecoilState(targetHourAtom);

  return async function initialize(userId: string | null) {
    console.log("initializeappdata");
    if (!userId) {
      console.log("initializeappdata not user");
      console.log("useInitializeAppData : ", getLocalCategories());
      setTags(getLocalTags());
      setCategories(getLocalCategories());
      setSchedules(getLocalSchedules());
      setRetrospects(getLocalRetrospects());
      setTargetHour(getLocalFocusDuration());
      return;
    }

    console.log("initializeappdata user");
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
  };
}
