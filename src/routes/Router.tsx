import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CalendarPage from "../pages/CalendarPage";
import StatisticsPage from "../pages/StatisticsPage";
import MyPage from "../pages/MyPage";
import LayoutWithFooter from "./LayoutWithFooter";
import ScheduleFormPage from "../pages/LayoutWithoutFooter/ScheduleFormPage";
import LayoutWithoutFooter from "./LayoutWithoutFooter";
import RetrospectWritePage from "../pages/LayoutWithoutFooter/RetrospectWritePage";
import TimerPage from "../pages/LayoutWithoutFooter/TimerPage";
import CategoryManagePage from "../pages/LayoutWithoutFooter/CategoryManagePage";
import TagManagePage from "../pages/LayoutWithoutFooter/TagManagePage";

export default function Router() {
  return (
    <Routes>
      <Route element={<LayoutWithFooter />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/mypage" element={<MyPage />} />
      </Route>

      <Route element={<LayoutWithoutFooter />}>
        <Route path="/schedule-form" element={<ScheduleFormPage />} />
        <Route path="/retrospect" element={<RetrospectWritePage />} />
        <Route path="/category" element={<CategoryManagePage />} />
        <Route path="/tag" element={<TagManagePage />} />
      </Route>

      <Route path="/timer" element={<TimerPage />} />
    </Routes>
  );
}
