import { FaFolder, FaTag, FaBullseye, FaTrash, FaUser } from "react-icons/fa";
import UnderLine from "../components/common/UnderLine";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { FiPlus, FiMinus } from "react-icons/fi";
import {
  scheduleState,
  categoryState,
  tagState,
  retrospectState,
  initializeCategoryState,
  initializeTagState,
  targetHourAtom,
} from "@/recoil";
import { loginWithGoogle, logout } from "../services/authService";
import { useAuthUser } from "@/hooks/useAuthUser";
import { setFocusDuration } from "@/firebase";
import { useEffect } from "react";
import { resetAllUserData } from "@/firebase/services/resetAllUserData";

export default function MyPage() {
  const resetSchedule = useResetRecoilState(scheduleState);
  const resetRetrospect = useResetRecoilState(retrospectState);
  const resetCategory = useResetRecoilState(categoryState);
  const resetTag = useResetRecoilState(tagState);
  const resetTargetHour = useResetRecoilState(targetHourAtom);

  const setCategory = useSetRecoilState(categoryState);
  const setTag = useSetRecoilState(tagState);
  const [targetHour, setTargetHour] = useRecoilState(targetHourAtom);
  const userId = useAuthUser();
  const navigate = useNavigate();

  const handleResetAll = () => {
    if (!confirm("모든 데이터를 초기화하시겠습니까?")) return;

    resetSchedule();
    resetCategory();
    resetTag();
    resetRetrospect();
    resetTargetHour();
    localStorage.clear();

    initializeCategoryState(setCategory);
    initializeTagState(setTag);

    if (userId !== null) {
      resetAllUserData(userId);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await loginWithGoogle();

      console.log("✅ 로그인된 사용자:", user);
    } catch (err) {
      console.error("❌ 로그인 에러 발생", err);
    }
  };

  const handleLogout = async () => {
    try {
      await logout(); // 실패해도 catch
    } catch (e) {
      console.warn("⚠️ 로그아웃 실패 무시:", e);
    }

    // ✅ 상태 초기화
    localStorage.clear();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");

    console.log("✅ 로그아웃 완료");
    window.location.reload();
  };

  useEffect(() => {
    if (userId !== null) {
      setFocusDuration(userId, targetHour);
    }
  }, [targetHour, userId]);

  return (
    <div>
      <header className="py-4 text-xl font-bold text-center">마이페이지</header>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
            <FaUser />
          </div>
        </div>
        {!userId && (
          <button className="border px-4 py-1 rounded text-sm" onClick={handleGoogleLogin}>
            로그인
          </button>
        )}
      </div>
      <UnderLine />

      <ul className="space-y-4 text-[1.05rem] mt-6">
        <li>
          <Link to="/category">
            <div className="flex items-center gap-3">
              <FaFolder className="text-lg" />
              카테고리 관리
            </div>
          </Link>
        </li>
        <li>
          <Link to="/tag">
            <div className="flex items-center gap-3">
              <FaTag className="text-lg" />
              태그 관리
            </div>
          </Link>
        </li>
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FaBullseye className="text-lg" />
            목표 집중시간 설정
          </div>
          <span className="text-gray-700 flex items-center gap-2">
            <button
              className="border p-1 rounded"
              onClick={() => {
                setTargetHour((prev) => (prev > 1 ? --prev : prev));
              }}
            >
              <FiMinus />
            </button>
            {targetHour}시간
            <button
              className="border p-1 rounded"
              onClick={() => {
                setTargetHour((prev) => (prev < 24 ? ++prev : prev));
              }}
            >
              <FiPlus />
            </button>
          </span>
        </li>

        <li className="flex items-center gap-3" onClick={handleResetAll}>
          <FaTrash className="text-lg" />
          모든 데이터 초기화
        </li>
      </ul>

      {userId && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full py-8">
          <hr className="mb-4 mx-6" />
          <button className="w-full mx-auto" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
