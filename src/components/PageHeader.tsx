import clsx from "clsx";
import { useNavigate } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  isTimer?: boolean;
}

export default function PageHeader({ title, isTimer = false }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-6 right-6">
      <header
        className={clsx("py-4 flex relative", isTimer ? "text-white bg-neutral-900" : "bg-white")}
      >
        <button onClick={() => navigate(-1)} className="text-2xl">
          ←
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold">{title}</h1>
      </header>
    </div>
  );
}
