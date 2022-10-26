import React from "react";
import { useState } from "react";
import "./Form.css";

const Form = () => {
  const [enteredNumber, setEnteredNumber] = useState("");
  const changeNumberHandler = (event) => {
    let number = event.target.value;
    const numArray = number.split(" ").join("").split("");
    let numSpace = number.split("");

    if (numSpace[numSpace.length - 1] === " ") {
      let numSpaceN = numSpace.slice(0, -2);
      number = numSpaceN.join("");
      setEnteredNumber(number);
    }

    if (isNaN(numArray.join(""))) return;
    if (numArray.length === 17) return;
    if (numArray.length % 4 === 0 && numArray.length <= 15) {
      number += " ";
      setEnteredNumber(number);
    } else {
      setEnteredNumber(number);
    }

    console.log(enteredNumber);
  };

  return (
    <form
      className="form"
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="form-group">
        <label htmlFor="name">Card Holder Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="e.g. Jane Foster"
        />
        <hr className="border-bottom" />
        <p className="error"></p>
      </div>
      <div className="form-group">
        <label htmlFor="number">Card Number</label>
        <input
          type="text"
          id="number"
          name="number"
          placeholder="e.g. 1234 4563 2342 2300"
          onChange={changeNumberHandler}
          value={enteredNumber}
        />
        <hr className="border-bottom" />
        <p className="error"></p>
      </div>
      <div className="form-bottom">
        <div className="form-group form-date">
          <label htmlFor="date">Exp.Date (MM/YY)</label>
          <input type="text" name="date" id="date" placeholder="MM/YY" />
          <hr className="border-bottom" />
          <p className="error"></p>
        </div>
        <div className="form-group form-cvc">
          <label htmlFor="cvc">CVC</label>
          <input type="text" name="cvc" id="cvc" />
          <hr className="border-bottom" />
          <p className="error"></p>
        </div>
      </div>
      <button className="form-btn" type="submit">
        <span>Submit</span>
      </button>
    </form>
  );
};

export default Form;
