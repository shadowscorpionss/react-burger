//styles
import overlayStyles from "./modal-overlay.module.css";
//react
import { FC, MouseEventHandler } from "react";

//types
interface IModalOverlay {
    onClick: MouseEventHandler<HTMLDivElement>;
}

const ModalOverlay: FC<IModalOverlay> = ({onClick}) => {
    return (
        <>
            <div className={overlayStyles.modalOverlay} onClick={onClick} />
        </>
    );
};

export default ModalOverlay;