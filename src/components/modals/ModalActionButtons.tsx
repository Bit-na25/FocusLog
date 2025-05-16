interface FormActionButtonsProps {
  onSave: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onCancel: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export default function ModalActionButtons({ onSave, onCancel }: FormActionButtonsProps) {
  return (
    <div className="flex justify-end gap-2">
      <button
        className="px-4 py-2 border-[0.1rem] border-primary text-primary rounded text-sm hover:bg-primary/5 transition-all"
        onClick={onCancel}
      >
        취소
      </button>
      <button
        className="px-4 py-2 bg-primary border text-white rounded text-sm font-bold hover:bg-primary/80 transition-all"
        onClick={onSave}
      >
        저장
      </button>
    </div>
  );
}
