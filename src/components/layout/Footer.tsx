import { NavLink } from "react-router-dom";
import { FaHome, FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="btm-nav bg-white border-t-2 border-gray-200 h-24">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `btm-nav-label text-2xl transition-all ${isActive ? "bg-white text-primary text-3xl" : "text-gray-500"}`
        }
        aria-label="Home"
      >
        <FaHome />
      </NavLink>
      <NavLink
        to="/calendar"
        className={({ isActive }) =>
          `btm-nav-label text-2xl transition-all ${isActive ? "bg-white text-primary text-3xl" : "text-gray-500"}`
        }
        aria-label="Calendar"
        state={{ from: "category" }}
      >
        <FaCalendarAlt />
      </NavLink>
      <NavLink
        to="/statistics"
        className={({ isActive }) =>
          `btm-nav-label text-2xl transition-all ${isActive ? "bg-white text-primary text-3xl" : "text-gray-500"}`
        }
        aria-label="Statistics"
      >
        <IoStatsChart />
      </NavLink>
      <NavLink
        to="/mypage"
        className={({ isActive }) =>
          `btm-nav-label text-2xl transition-all ${isActive ? "bg-white text-primary text-3xl" : "text-gray-500"}`
        }
        aria-label="My Page"
      >
        <FaUserAlt />
      </NavLink>
    </div>
  );
}
