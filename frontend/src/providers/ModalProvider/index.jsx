import { useState, useCallback } from "react";
import { Modal } from "../../components/ui";
import { ModalContext } from "./context";

export default function ModalProvider({ children }) {
  const [modal, setModal] = useState({
    open: false,
    content: null,
    size: "md",
  });

  const showModal = useCallback((content, size = "md") => {
    setModal({
      open: true,
      content,
      size,
    });
  }, []);

  const hideModal = useCallback(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}

      <Modal open={modal.open} onClose={hideModal} size={modal.size}>
        {modal.content}
      </Modal>
    </ModalContext.Provider>
  );
}
