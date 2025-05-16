import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { JSX } from "react";

interface PageHeaderProps {
  title: string;
  isTimer?: boolean;
  rightSlot?: JSX.Element;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function PageHeader({
  title,
  isTimer = false,
  rightSlot,
  onClick,
}: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-6 right-6">
      <header
        className={clsx(
          "py-4 flex relative items-center justify-between",
          isTimer ? "text-white bg-neutral-900" : "bg-white",
        )}
      >
        <button onClick={onClick ?? (() => navigate(-1))} className="text-2xl">
          <IoChevronBack className="hover:scale-110  hover:text-primary transition-all" />
        </button>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-xl font-bold tracking-tight">
          {title}
        </h1>
        {rightSlot}
      </header>
    </div>
  );
}
