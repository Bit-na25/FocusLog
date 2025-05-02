import { Outlet } from "react-router-dom";

export default function LayoutWithoutFooter() {
  return (
    <div className="mt-0 mx-6 mb-24">
      <Outlet />
    </div>
  );
}
