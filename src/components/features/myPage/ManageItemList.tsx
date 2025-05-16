import { useRef } from "react";
import { FiTrash2 } from "react-icons/fi";
import { JSX } from "react";

interface ManageItemListProps<T> {
  items: T[];
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  onEdit: (item: T) => void;
  onSaveEdit: () => void;
  onDelete: (item: T) => void;
  editingKey: string | null;
  editedLabel: string;
  setEditedLabel: (label: string) => void;
  handleEnter?: (e: React.KeyboardEvent) => void;
  renderLeft?: (item: T) => JSX.Element;
}

export default function ManageItemList<T>({
  items,
  getKey,
  getLabel,
  onEdit,
  onSaveEdit,
  onDelete,
  editingKey,
  editedLabel,
  setEditedLabel,
  handleEnter,
  renderLeft,
}: ManageItemListProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <ul>
      {items.map((item) => {
        const key = getKey(item);
        const label = getLabel(item);

        return (
          <li key={key}>
            <div className="flex items-center justify-between py-3 h-14">
              <div className="flex items-center gap-3 flex-1 mr-3">
                {renderLeft && renderLeft(item)}

                {editingKey === key ? (
                  <input
                    className="flex-1 border rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                    value={editedLabel}
                    onChange={(e) => setEditedLabel(e.target.value)}
                    onBlur={onSaveEdit}
                    onKeyDown={(e) => handleEnter?.(e)}
                    autoFocus
                    ref={inputRef}
                  />
                ) : (
                  <span
                    className="flex-1 cursor-pointer line-clamp-1 text-ellipsis overflow-hidden"
                    onClick={() => onEdit(item)}
                  >
                    {label}
                  </span>
                )}
              </div>
              <button onClick={() => onDelete(item)} className="text-gray-500">
                <FiTrash2 className="hover:text-red-400" />
              </button>
            </div>
            <hr />
          </li>
        );
      })}
    </ul>
  );
}
