import { Outlet } from "react-router-dom";
import Footer from "../components/layout/Footer";

export default function LayoutWithFooter() {
  return (
    <div>
      <div className="mt-0 mx-6 mb-24">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
