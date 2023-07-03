import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import PasswordChecks from "./PasswordChecks";

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passCon: "",
  });
  const [errors, setErrors] = useState(false);
  const [requirements, setRequirements] = useState({
    sixChars: false,
    oneCapital: false,
    oneSymbol: false,
    oneNumber: false,
  });
  const passwordRef = useRef(null);
  const [passwordFocused, setPasswordFocused] = useState(document.activeElement === passwordRef.current);

  console.log(data);
  return (
    <div className="App">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Name"
            value={data.name}
            name="name"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          ></input>
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            name="email"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          ></input>
          <input
            type="tel"
            placeholder="Phone number"
            value={data.phone}
            name="phone"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          ></input>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={data.password}
            name="password"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
            onFocus={() =>
              setPasswordFocused(!passwordFocused)
            }
          ></input>
          {passwordFocused ? <PasswordChecks /> : null}
          <input
            type="password"
            placeholder="Confirm password"
            value={data.passCon}
            name="passCon"
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          ></input>
          <button type="submit" onClick={validate}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// function handleChange(e) {
//   console.log(e.target.value)
//   setData('hello')
// }

function validate(e) {
  e.preventDefault();
}

export default App;
