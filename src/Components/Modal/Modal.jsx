import React from "react";
import "./modal.style.css";

const Modal = ({ onClose }) => {
  return (
    <div className="modal-main-overlay">
      <div className="modal-main">
        <div className="close-button">
          <button onClick={() => onClose()}>X</button>
        </div>
        {/* <h2>Modal Header Here</h2>
        <hr />

        <div className="input-box">
          <p>Some input text to search....</p>
          <div className="input-group">
            <input type="text" value="some text goes here.." />
            <button>Button</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
