import React from "react";
import "./Form.css";
import Cleave from "cleave.js/react";
import useInput from "../hooks/use-input";
import { useState } from "react";

const validateEmpty = (value) => {
  if (value.trim() !== "") {
    return { isvalid: true, message: "" };
  } else {
    return { isvalid: false, message: "This field cannot be blank" };
  }
};

const validateDate = (value) => {
  let validity = { isvalid: true, message: "" };

  if (value.trim() === "") {
    validity.isvalid = false;
    validity.message = "This field cannot be blank";
    return validity;
  }

  if (value.trim().length !== 5 && value.trim() !== "") {
    validity.isvalid = false;
    validity.message = "Invalid Date";
    return validity;
  }

  return validity;
};

const validateCvc = (value) => {
  let validity = { isvalid: true, message: "" };

  if (value.trim() === "") {
    validity.isvalid = false;
    validity.message = "This field cannot be blank";
    return validity;
  }

  if (!/^\+?(0|[0-9]\d*)$/.test(value.trim())) {
    validity.isvalid = false;
    validity.message = "Invalid CVC";
    return validity;
  }

  return validity;
};

const Form = ({ onSubmit }) => {
  const [crediCardType, setCrediCardType] = useState("");
  const onCardChange = (type) => {
    setCrediCardType(type);
  };

  const {
    enteredInput: enteredName,
    enteredInputIsValid: enteredNameIsValid,
    enteredInputIsInValid: enteredNameIsInValid,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetInput: resetNameInput,
    error: nameError,
  } = useInput(validateEmpty);

  const {
    enteredInput: enteredNumber,
    enteredInputIsValid: enteredNumberIsValid,
    enteredInputIsInValid: enteredNumberIsInValid,
    inputChangeHandler: numberChangeHandler,
    inputBlurHandler: numberBlurHandler,
    resetInput: resetNumberInput,
    error: numberError,
  } = useInput(validateEmpty);

  const {
    enteredInput: enteredDate,
    enteredInputIsValid: enteredDateIsValid,
    enteredInputIsInValid: enteredDateIsInValid,
    inputChangeHandler: dateChangeHandler,
    inputBlurHandler: dateBlurHandler,
    resetInput: resetDateInput,
    error: dateError,
  } = useInput(validateDate);

  const {
    enteredInput: enteredCvc,
    enteredInputIsValid: enteredCvcIsValid,
    enteredInputIsInValid: enteredCvcIsInValid,
    inputChangeHandler: cvcChangeHandler,
    inputBlurHandler: cvcBlurHandler,
    resetInput: resetCvcInput,
    error: cvcError,
  } = useInput(validateCvc);

  let isFormValid = false;
  if (
    enteredNameIsValid &&
    enteredNumberIsValid &&
    enteredDateIsValid &&
    enteredCvcIsValid
  ) {
    isFormValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!isFormValid) return;
    onSubmit();

    console.log(enteredName);
    console.log(enteredNumber);
    console.log(enteredDate);
    console.log(enteredCvc);

    resetNameInput();
    resetNumberInput();
    resetDateInput();
    resetCvcInput();
  };

  const nameInputClasses = `form-group ${
    enteredNameIsInValid ? "invalid" : ""
  }`;
  const numberInputClasses = `form-group ${
    enteredNumberIsInValid ? "invalid" : ""
  }`;
  const dateInputClasses = `form-group form-date ${
    enteredDateIsInValid ? "invalid" : ""
  }`;
  const cvcInputClasses = `form-group form-cvc ${
    enteredCvcIsInValid ? "invalid" : ""
  }`;

  return (
    <form className="form" onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Card Holder Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="JANE FOSTER"
          onChange={nameChangeHandler}
          value={enteredName}
          onBlur={nameBlurHandler}
        />
        <hr className="border-bottom" />
        <p className="error">{nameError}</p>
      </div>
      <div className={numberInputClasses}>
        <label htmlFor="number">Card Number</label>
        <Cleave
          type="text"
          id="number"
          name="number"
          placeholder="1234 4563 2342 2300"
          options={{
            creditCard: true,
            onCreditCardTypeChanged: (type) => {
              onCardChange(type);
            },
          }}
          onChange={numberChangeHandler}
          value={enteredNumber}
          onBlur={numberBlurHandler}
        />
        <hr className="border-bottom" />
        <p className="error">{numberError}</p>
        <div className={`card-image ${crediCardType}`}></div>
      </div>
      <div className="form-bottom">
        <div className={dateInputClasses}>
          <label htmlFor="date">Exp.Date (MM/YY)</label>
          <Cleave
            type="text"
            name="date"
            id="date"
            minLength="5"
            placeholder="MM/YY"
            options={{
              date: true,
              datePattern: ["m", "y"],
            }}
            value={enteredDate}
            onChange={dateChangeHandler}
            onBlur={dateBlurHandler}
          />
          <hr className="border-bottom" />
          <p className="error">{dateError}</p>
        </div>
        <div className={cvcInputClasses}>
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            name="cvc"
            id="cvc"
            maxLength={3}
            placeholder="000"
            value={enteredCvc}
            onChange={cvcChangeHandler}
            onBlur={cvcBlurHandler}
          />
          <hr className="border-bottom" />
          <p className="error">{cvcError}</p>
        </div>
      </div>
      <button className="form-btn" disabled={!isFormValid} type="submit">
        <span>Submit</span>
      </button>
    </form>
  );
};

export default Form;
