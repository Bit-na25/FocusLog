import { FaFolder, FaTag, FaBullseye, FaTrash, FaUser } from "react-icons/fa";
import UnderLine from "../components/common/UnderLine";
import { Link } from "react-router-dom";
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
  calendarSelectedDateState,
} from "@/recoil";
import { logout } from "../services/authService";
import { useAuthUser } from "@/hooks/useAuthUser";
import { resetAllUserData, setFocusDuration } from "@/firebase";
import { useEffect } from "react";
import { setLocalFocusDuration } from "@/utils/localStorage";

export default function MyPage() {
  const resetSchedule = useResetRecoilState(scheduleState);
  const resetRetrospect = useResetRecoilState(retrospectState);
  const resetCategory = useResetRecoilState(categoryState);
  const resetTag = useResetRecoilState(tagState);
  const resetTargetHour = useResetRecoilState(targetHourAtom);

  const setCategory = useSetRecoilState(categoryState);
  const setTag = useSetRecoilState(tagState);
  const [targetHour, setTargetHour] = useRecoilState(targetHourAtom);
  const { userId, name, photo } = useAuthUser();
  const setSelectedDate = useSetRecoilState(calendarSelectedDateState);

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

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.warn("⚠️ 로그아웃 실패 무시:", e);
    }

    localStorage.clear();
    indexedDB.deleteDatabase("firebaseLocalStorageDb");

    console.log("✅ 로그아웃 완료");
    window.location.reload();
  };

  useEffect(() => {
    setLocalFocusDuration(targetHour);
    if (userId !== null) {
      setFocusDuration(userId, targetHour);
    }
  }, [targetHour, userId]);

  useEffect(() => {
    setSelectedDate(new Date());
  }, []);

  return (
    <div>
      <header className="py-4 text-xl font-bold text-center">마이페이지</header>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-4">
          {photo ? (
            <img className="w-12 h-12 rounded-full" src={photo} />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
              <FaUser />
            </div>
          )}
          <div>{name}</div>
        </div>
        {!userId && (
          <Link to="/login">
            <div className="border px-4 py-1 rounded text-sm hover:bg-primary/5 transition-all">
              로그인
            </div>
          </Link>
        )}
      </div>
      <UnderLine />

      <ul className="space-y-4 mt-6 flex flex-col gap-2">
        <li>
          <Link to="/category">
            <div className="flex items-center gap-3 hover:text-primary transition-all">
              <FaFolder className="text-lg" />
              카테고리 관리
            </div>
          </Link>
        </li>
        <li>
          <Link to="/tag">
            <div className="flex items-center gap-3 hover:text-primary transition-all">
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
              className="border px-2 py-1 rounded shadow-sm hover:bg-primary/5 transition-all"
              onClick={() => {
                setTargetHour((prev) => (prev > 1 ? --prev : prev));
              }}
            >
              <FiMinus />
            </button>
            {targetHour}시간
            <button
              className="border px-2 py-1 rounded shadow-sm hover:bg-primary/5 transition-all"
              onClick={() => {
                setTargetHour((prev) => (prev < 24 ? ++prev : prev));
              }}
            >
              <FiPlus />
            </button>
          </span>
        </li>

        <li
          className="flex items-center gap-3 hover:text-primary transition-all"
          onClick={handleResetAll}
        >
          <FaTrash className="text-lg" />
          모든 데이터 초기화
        </li>
      </ul>

      {userId && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full py-8">
          <hr className="mb-4 mx-6" />
          <button
            className="w-full mx-auto hover:text-primary hover:scale-105 transition-all"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}
