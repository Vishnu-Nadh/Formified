import "./App.css";
import Form from "./components/Form";
import Banner from "./components/Banner";
import { useState } from "react";
import Succuss from "./components/Succuss";

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <div className="App">
      <Banner />
      <div className="form-container">
        {isSubmitted && <Succuss />}
        {!isSubmitted && <Form />}
      </div>
    </div>
  );
}

export default App;
