import React from "react";
import succussIcon from "../assets/icon-complete.svg";
import "./Succuss.css";

const Succuss = () => {
  return (
    <div className="succuss">
      <img src={succussIcon} alt="tickmark icon" />
      <h2 className="succuss_thank">THANK YOU</h2>
      <p className="succuss_msg">We have added your card details</p>
      <button className="form-btn" type="button">
        Continue
      </button>
    </div>
  );
};

export default Succuss;
