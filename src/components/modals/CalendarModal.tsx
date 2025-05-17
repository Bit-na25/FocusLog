import { motion } from "framer-motion";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useRef, useState } from "react";

interface CalendarModalProps {
  year: number;
  month: number;
  isOpen: boolean;
  onOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (y: number, m: number) => void;
}
export default function CalendarModal({
  year,
  month,
  isOpen,
  onOpen,
  onSelect,
}: CalendarModalProps) {
  const openRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(year);

  useClickOutside(openRef, () => onOpen(false), isOpen);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute ring-1 ring-gray-300 z-50 w-52 bg-white rounded-lg shadow-md p-3"
        ref={openRef}
      >
        <div className="flex justify-between items-center mb-2">
          <button onClick={() => setSelectedYear((prev) => --prev)}>◀</button>
          <span>{selectedYear}년</span>
          <button onClick={() => setSelectedYear((prev) => ++prev)}>▶</button>
        </div>

        <div className="grid grid-cols-4 gap-2 text-sm">
          {Array.from({ length: 12 }).map((_, i) => {
            const m = i + 1;
            return (
              <button
                key={m}
                className={`py-2 rounded ${
                  month === m && year === selectedYear
                    ? "bg-primary text-white"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  onSelect(selectedYear, m - 1);
                  onOpen(false);
                }}
              >
                {m}월
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
