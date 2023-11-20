//styles
import modalStyles from "./modal.module.css";
//react
import { FC, MouseEventHandler, PropsWithChildren, useEffect } from "react";
import ReactDom from "react-dom";
//components
import ModalOverlay from "./modal-overlay";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

//types
interface IModal extends PropsWithChildren {
  onClose?: () => void;
  title?: string;
}

//constants
const modalPortal = document.getElementById("modal-root");

const Modal: FC<IModal> = ({ onClose, title = "", children }) => {
  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {

    if (e.key === "Escape" && typeof onClose === 'function') {
      onClose();
    }
  };

  //escape button for closing modal window
  useEffect(() => {
    document
      .body
      .addEventListener("keydown", closeOnEscapeKeyDown);
    return function cleanup() {
      document
        .body
        .removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, []);


  const onOverlayClose: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      if (typeof (onClose) === 'function')
        onClose()
    }
  }

  return (ReactDom.createPortal((
    <div className={modalStyles.modal}>
      <ModalOverlay onClick={onOverlayClose} />
      <div className={modalStyles.container} onClick={e => e.stopPropagation()}>
        <div className={modalStyles.header}>
          <div className={modalStyles.closeButton}>
            <CloseIcon type="primary" onClick={onClose}></CloseIcon>
          </div>
          <h4 className="text text_type_main-large">
            {title}
          </h4>
        </div>
        <div className={modalStyles.content}>
          {children}
        </div>
      </div>
    </div>

  ), modalPortal as HTMLElement))

}

export default Modal;
