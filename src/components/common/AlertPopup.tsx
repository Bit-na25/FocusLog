import { motion, AnimatePresence } from "framer-motion";

interface AlertPopupProps {
  open: boolean;
  message: string;
  onConfirm: () => void;
  onClose: () => void;
  confirmText?: string;
}

export default function AlertPopup({
  open,
  message,
  onConfirm,
  onClose,
  confirmText = "확인",
}: AlertPopupProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-lg shadow-xl p-6 w-[60%] text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-gray-800 text-sm font-bold mb-4 min-h-16 flex items-center justify-center whitespace-pre-line">
              {message}
            </p>
            <div className="flex justify-center gap-5 text-sm font-bold">
              <button
                className="w-1/3 px-4 py-2 border-[0.1rem] border-primary text-primary rounded hover:bg-primary/5 transition-all"
                onClick={onClose}
              >
                취소
              </button>
              <button
                className="w-1/3 px-4 py-2 bg-primary border text-white rounded hover:bg-primary/80 transition-all"
                onClick={onConfirm}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
