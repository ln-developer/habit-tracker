import { useEffect } from "react";

import "./Modal.css";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div onClick={onClose} className="backdrop">
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <div className="drag-handle" />

        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button type="button" onClick={onClose} className="close-btn">
            ✕
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
