//styles
import modalStyles from './modal.module.css';
//react
import { FC, MouseEventHandler, PropsWithChildren, useCallback, useEffect } from 'react';
import ReactDom from 'react-dom';
//components
import ModalOverlay from './modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation, useNavigate } from 'react-router-dom';

//types
interface IModal extends PropsWithChildren {
  onClose?: () => void;
  title?: string;
}

//constants
const modalPortal = document.getElementById('modal-root');

const Modal: FC<IModal> = ({ onClose, title = '', children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const closeModal = useCallback(() => {
    location?.state?.background && navigate(location.state.background)
}, [location.state, navigate]);

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();
      return;
    }
    closeModal();
  }

  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  const onOverlayClose: MouseEventHandler = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  //escape button for closing modal window
  useEffect(() => {
    document
      .body
      .addEventListener('keydown', closeOnEscapeKeyDown);
    return function cleanup() {
      document
        .body
        .removeEventListener('keydown', closeOnEscapeKeyDown);
    };
  }, []);




  return (ReactDom.createPortal((
    <div className={modalStyles.modal} data-test={"modal"}>
      <ModalOverlay onClick={onOverlayClose} />
      <div className={modalStyles.container} onClick={e => e.stopPropagation()}>
        <div className={modalStyles.header}>
          <div className={modalStyles.closeButton} data-test={"modal-close-btn"}>
            <CloseIcon type="primary" onClick={handleClose} ></CloseIcon>
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
