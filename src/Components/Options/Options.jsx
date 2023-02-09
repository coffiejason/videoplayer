import React, { useState } from "react";
import "./options.style.css";

const Options = () => {
  return (
    <nav>
      <div className="OptionsContainer">
        <div className="form">
          <div className="row">
            <div className="col">
              {/* <h3 className="title">...</h3> */}
              <div className="inputBox">
                <span>Country:</span>
                <select>
                  <option>Select Country</option>
                  <option>Ghana</option>
                  <option>Cameroon</option>
                  <option>Nigeria</option>
                </select>
                {/* <input type="text" value={"00:20:00"} disabled /> */}
              </div>

              <div className="inputBox">
                <span>City:</span>
                <select>
                  <option>Accra</option>
                  <option>Yauonde</option>
                  <option>Abuja</option>
                </select>
                {/* <input type="text" value={"00:20:00"} disabled /> */}
              </div>
              <div className="inputBox">
                <span>Station:</span>
                <select>
                  <option>Select TV Station</option>
                  <option>Vodafone</option>
                  <option>Nestle</option>
                </select>
              </div>

              <div className="inputBox">
                <input type="date" />
                <input style={{ marginTop: "1vh" }} type="time" />
              </div>

              {/* <div className="flex">
                <div style={{ width: "50%" }} className="inputBox">
                  <span>Date :</span>
                  <input type="date" />
                </div>
                <div style={{ width: "50%" }} className="inputBox">
                  <span>Time :</span>
                  <input type="time" />
                </div>
              </div> */}
            </div>
          </div>

          <div className="row">
            {/* <div className="col">
              <input type="submit" value="Export" className="export-btn" />
            </div> */}
            <div className="col">
              <input type="submit" value="Load " className="submit-btn" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Options;
