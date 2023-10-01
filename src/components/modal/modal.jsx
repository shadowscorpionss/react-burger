import React, {useEffect} from "react";
import ReactDom from "react-dom";
import ModalOverlay from "./modal-overlay";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyles from "./modal.module.css";

const Modal = props => {

  const modalPortal = document.getElementById("modal-root");

  const closeOnEscapeKeyDown = e => {

    if (e.key === "Escape") {
      props.onClose();
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

  const {
    onClose,
    title = "",
    children
  } = props

  const onOverlayClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (ReactDom.createPortal((
    <div className={modalStyles.modal}>
      <ModalOverlay onClick={onOverlayClose}>
        <div className={modalStyles.container} onClick={e => e.stopPropagation()}>
          <div className={modalStyles.header}>
            <div className={modalStyles.closeButton}>
              <CloseIcon type="button" onClick={onClose}></CloseIcon>
            </div>
            <h4 className="text text_type_main-large">
              {title}
            </h4>
          </div>
          <div className={modalStyles.content}>
            {children}
          </div>
        </div>
      </ModalOverlay>
    </div>

  ), modalPortal))

}

Modal.propTypes = PropTypes.shape({
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string
}).isRequired;

export default Modal;
