import React from "react";
import clsx from "clsx";

interface SecondaryButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  className?: string;
}

export default function SecondaryButton({
  onClick,
  children,
  className = "",
}: SecondaryButtonProps) {
  return (
    <button
      className={clsx(
        "py-3.5 border border-2 font-bold text-white rounded-lg shadow-md hover:bg-white/10 transition-all duration-200",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
