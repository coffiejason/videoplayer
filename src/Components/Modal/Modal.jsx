import React from "react";
import "./modal.style.css";

const Modal = ({ onClose }) => {
  return (
    <div className="modal-main-overlay">
      <div className="modal-main">
        <div className="close-button">
          <button onClick={() => onClose()}>X</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
