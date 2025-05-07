// components/ColorPickerPopover.tsx
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { defaultCategoryColor } from "../store/categoryAtom";
import { FaCheck } from "react-icons/fa";
import { useClickOutside } from "../hooks/useClickOutside";

interface ColorPickerPopoverProps {
  position: { top: number; left: number };
  selectedColor: string;
  onSelect: (color: string) => void;
  onClose: () => void;
}

export default function ColorPickerPopover({
  position,
  selectedColor,
  onSelect,
  onClose,
}: ColorPickerPopoverProps) {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClose);

  // Smart positioning: adjust if near bottom of screen
  const popoverHeight = 200; // Approximate height in px
  const viewportHeight = window.innerHeight - 50;
  const adjustedTop =
    position.top + popoverHeight > viewportHeight ? position.top - popoverHeight : position.top;

  return createPortal(
    <div
      ref={ref}
      className="absolute z-50 bg-white border rounded-lg shadow-md p-3 grid grid-cols-6 gap-2"
      style={{ top: adjustedTop, left: position.left }}
    >
      {defaultCategoryColor.map((color) => (
        <div
          key={color}
          className={`w-8 h-8 rounded-full cursor-pointer relative ${color}`}
          onClick={() => onSelect(color)}
        >
          {selectedColor === color && (
            <div className="absolute inset-0 flex items-center justify-center">
              <FaCheck className="text-lg text-white" />
            </div>
          )}
        </div>
      ))}
    </div>,
    document.body,
  );
}
