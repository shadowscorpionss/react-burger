import React from "react";

import PropTypes from "prop-types";
import overlayStyles from "./modal-overlay.module.css";

const ModalOverlay = props => {
    return (
        <>
            <div className={overlayStyles.modalOverlay} onClick={props.onClick} />
        </>
    );
};

ModalOverlay.propTypes = {    
    onClick: PropTypes.func.isRequired
};

export default ModalOverlay;