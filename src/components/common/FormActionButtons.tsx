interface FormActionButtonsProps {
  onSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function FormActionButtons({ onSave, onDelete }: FormActionButtonsProps) {
  return (
    <div className="max-w-md fixed w-[90%] bottom-6 left-1/2 -translate-x-1/2 flex gap-4 ">
      <button
        className="w-1/2 border-2 text-sm  py-2.5 rounded-lg border-red-400 text-red-400 font-bold hover:bg-red-50 transition-all duration-200"
        onClick={onDelete}
      >
        삭제
      </button>
      <button
        className="w-1/2 border text-sm py-2.5 rounded-lg border-primary bg-primary font-bold text-white shadow-md hover:bg-primary/80 transition-all duration-200"
        onClick={onSave}
      >
        저장
      </button>
    </div>
  );
}
