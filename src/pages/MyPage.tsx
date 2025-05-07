import { useState } from "react";
import { FaFolder, FaTag, FaBullseye, FaTrash, FaUser } from "react-icons/fa";
import UnderLine from "../components/common/UnderLine";
import { Link } from "react-router-dom";

export default function MyPage() {
  const [targetHour, setTargetHour] = useState(7);

  return (
    <div>
      <header className="py-4 text-xl font-bold text-center">마이페이지</header>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl">
            <FaUser />
          </div>
        </div>
        <button className="border px-4 py-1 rounded text-sm">로그인</button>
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
          <span className="text-gray-700">{targetHour}h</span>
        </li>
        <li className="flex items-center gap-3">
          <FaTrash className="text-lg" />
          모든 데이터 초기화
        </li>
      </ul>

      <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 w-full py-8">
        <hr className="mb-4 mx-6" />
        <button className="w-full mx-auto">로그아웃</button>
      </div>
    </div>
  );
}
