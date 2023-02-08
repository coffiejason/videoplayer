import React from "react";
import "./modal.style.css";
import card_img from "../../assets/card_img.png";

const Modal = ({ onClose, handleTrim }) => {
  return (
    <div className="container">
      <div className="form">
        <div className="close-button">
          <button style={{ fontSize: "20px" }} onClick={() => onClose()}>
            ✖
          </button>
        </div>
        <div className="row">
          <div className="col">
            {/* <h3 className="title">New Entry</h3> */}
            <u></u>

            <div className="inputBox">
              <span>Title :</span>
              <input type="text" placeholder="Enter title" />
            </div>
            <div className="inputBox">
              <span>Station :</span>
              <input type="email" value={"AAU TV"} disabled />
            </div>

            <div className="flex">
              <div className="inputBox">
                <span>Start :</span>
                <input type="text" value={"00:05:00"} disabled />
              </div>
              <div className="inputBox">
                <span>End :</span>
                <input type="text" value={"00:20:00"} disabled />
              </div>
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>Duration :</span>
                <input type="text" value={"00:15:00"} disabled />
              </div>
              <div className="inputBox">
                <span>Clip Type:</span>
                <select>
                  <option>Select Clip Type</option>
                  <option>News Item</option>
                  <option>Spot</option>
                </select>
                {/* <input type="text" value={"00:20:00"} disabled /> */}
              </div>
            </div>
          </div>

          <div className="col">
            {/* <h3 className="title">...</h3> */}

            <div className="inputBox">
              <span>Excerpt:</span>
              <textarea name="" id="" cols="30" rows="1"></textarea>
            </div>
            <div className="inputBox">
              <span>Brand:</span>
              <select>
                <option>Select Brand</option>
                <option>Vodafone</option>
                <option>Nestle</option>
              </select>
              {/* <input type="text" value={"00:20:00"} disabled /> */}
            </div>

            <div className="inputBox">
              <span>Company:</span>
              <select>
                <option>Select Company</option>
                <option>Vodafone</option>
                <option>Nestle</option>
              </select>
              {/* <input type="text" value={"00:20:00"} disabled /> */}
            </div>
            <div className="inputBox">
              <span>Category:</span>
              <select>
                <option>Select Category</option>
                <option>Vodafone</option>
                <option>Nestle</option>
              </select>
              {/* <input type="text" value={"00:20:00"} disabled /> */}
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <input
              type="submit"
              onClick={() => handleTrim()}
              value="Export"
              className="export-btn"
            />
          </div>
          <div className="col">
            <input type="submit" value="Submit Entry" className="submit-btn" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
