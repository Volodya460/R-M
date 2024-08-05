import { FC, useEffect, MouseEvent } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  closeModal(): void;
}

const ModalRoot = document.getElementById("modal-root") as HTMLElement;

export const Modal: FC<ModalProps> = ({ closeModal, children }) => {
  useEffect(() => {
    const closeEscModal = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        closeModal();
      }
    };
    window.addEventListener("keydown", closeEscModal);
    return () => {
      window.removeEventListener("keydown", closeEscModal);
    };
  }, [closeModal]);

  const handleBackDropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <div
      onClick={handleBackDropClick}
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10 flex justify-center items-center"
    >
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
        {children}
      </div>
    </div>,
    ModalRoot
  );
};
