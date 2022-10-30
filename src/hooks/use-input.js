import { useEffect, useReducer } from "react";

const initialState = {
  enteredInput: "",
  isInputBlurred: false,
  error: "",
};

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return {
      enteredInput: action.value,
      isInputBlurred: state.isInputBlurred,
      error: state.error,
    };
  }

  if (action.type === "BLUR") {
    return {
      enteredInput: state.enteredInput,
      isInputBlurred: true,
      error: state.error,
    };
  }

  if (action.type === "ERROR") {
    return {
      enteredInput: state.enteredInput,
      isInputBlurred: state.isInputBlurred,
      error: action.error,
    };
  }

  if (action.type === "RESET") {
    return {
      enteredInput: "",
      isInputBlurred: false,
      error: state.error,
    };
  }
  return initialState;
};

const useInput = (validationFn) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, initialState);

  const { isvalid: enteredInputIsValid, message } = validationFn(
    inputState.enteredInput
  );
  const enteredInputIsInValid =
    !enteredInputIsValid && inputState.isInputBlurred;

  useEffect(() => {
    if (enteredInputIsInValid) {
      dispatchInput({ type: "ERROR", error: message });
    } else {
      dispatchInput({ type: "ERROR", error: "" });
    }
  }, [enteredInputIsInValid]);

  const inputChangeHandler = (event) => {
    dispatchInput({ type: "CHANGE", value: event.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInput({ type: "BLUR" });
  };

  const resetInput = () => {
    dispatchInput({ type: "RESET" });
  };

  return {
    enteredInput: inputState.enteredInput,
    enteredInputIsValid,
    enteredInputIsInValid,
    inputChangeHandler,
    inputBlurHandler,
    resetInput,
    error: inputState.error,
  };
};

export default useInput;
