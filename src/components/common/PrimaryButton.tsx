import React from "react";
import clsx from "clsx";

interface PrimaryButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: React.ReactNode;
  className?: string;
}

export default function PrimaryButton({ onClick, children, className = "" }: PrimaryButtonProps) {
  return (
    <button
      className={clsx(
        "py-3.5 border-primary bg-primary font-bold text-white rounded-lg shadow-md hover:bg-primary/80 transition-all duration-200",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
