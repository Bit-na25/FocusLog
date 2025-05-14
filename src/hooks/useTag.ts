import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { tagState } from "../recoil/tag/atom";
import { getTags, replaceAllTags } from "../firebase/services/tagService";
import { getLocalTags } from "../utils/localStorage";
import { useAuthUser } from "./useAuthUser";

export function useInitializeTagState() {
  const userId = useAuthUser();
  const setTags = useSetRecoilState(tagState);

  useEffect(() => {
    if (userId === null) return;

    async function init() {
      if (userId) {
        const tags = await getTags(userId);
        setTags(tags);
      } else {
        const tags = getLocalTags();
        setTags(tags);
      }
    }

    init();
  }, [userId]);
}

export function useSetFixedTags(fixedTag: string[]) {
  const userId = useAuthUser();
  const setTags = useSetRecoilState(tagState);

  useEffect(() => {
    if (userId === null) return;

    setTags(fixedTag);

    if (userId) {
      replaceAllTags(userId, fixedTag);
    }
  }, [userId, fixedTag]);
}
