import { useRef } from "react";
import { createPortal } from "react-dom";
import { FaCheck } from "react-icons/fa";
import { useClickOutside } from "../../hooks/useClickOutside";
import { defaultCategoryColor } from "@/recoil";

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

  const popoverHeight = 135;
  const viewportHeight = window.innerHeight - 40;
  const adjustedTop =
    position.top + popoverHeight > viewportHeight ? position.top - popoverHeight : position.top;
  console.log(selectedColor);
  return createPortal(
    <div
      ref={ref}
      className="absolute z-50 bg-white border border-primary rounded-lg shadow-md p-2 grid grid-cols-6 gap-2"
      style={{ top: adjustedTop, left: position.left }}
    >
      {defaultCategoryColor.map((color) => (
        <div
          key={color}
          className={`w-6 h-6 rounded-full cursor-pointer relative ${color}`}
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
