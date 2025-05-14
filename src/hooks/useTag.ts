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
    // ✅ 인증 상태 로딩 중이면 아무것도 하지 않음
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
    if (userId === null) return; // 인증 확인 전

    setTags(fixedTag); // 무조건 로컬 상태 갱신

    if (userId) {
      replaceAllTags(userId, fixedTag); // 로그인 시에만 DB 반영
    }
  }, [userId, fixedTag]);
}
