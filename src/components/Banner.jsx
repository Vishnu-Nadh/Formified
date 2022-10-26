import React from "react";
import "./Banner.css";
import cardfront from "../assets/bg-card-front.png";
import cardback from "../assets/bg-card-back.png";

const Banner = () => {
  return (
    <div className="banner">
      <div className="cards">
        <div className="card-front">
          <img src={cardfront} alt="card-frontview" />
          <div className="card-front-content">
            <div className="stamps">
              <div className="big-circle"></div>
              <div className="small-circle"></div>
            </div>
            <p className="card-number">0000 0000 0000 0000</p>
            <div className="card-details">
              <span className="owner-name">JANE APPLESEED</span>
              <div className="card-date">00/00</div>
            </div>
          </div>
        </div>
        <div className="card-back">
          <img src={cardback} alt="card-backview" />
          <div className="card-back-content">
            <span className="card-cvc">000</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
