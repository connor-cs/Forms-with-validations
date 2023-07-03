import "./App.css";
import React from "react";
import { useState, useRef } from "react";
import PasswordChecks from "./PasswordChecks";

//

function App() {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passConfirmation: "",
  });
  const [errors, setErrors] = useState({
    emailErr: false,
    nameErr: false,
    phoneErr: false,
    passwordErr: false,
  });
  const [requirements, setRequirements] = useState({
    sixChars: false,
    oneCapital: false,
    oneSymbol: false,
    oneNumber: false,
  });
  const [success, setSuccess] = useState(false);
  const passwordRef = useRef(null);
  const [passwordFocused, setPasswordFocused] = useState(
    document.activeElement === passwordRef.current
  );

  // console.log(/\d/.test(data.password))
  // console.log(/[!@#%^&*()_+-=[]{}|;':",.`]/.test(data.password))
  console.log("contains capital test:", /A-Z/.test(data.password));
  console.log(data);
  return (
    <div className="App">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Firstname"
            value={data.name}
            name="name"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.nameErr ? (
            <div className="err-msg">"Name can't be blank"</div>
          ) : null}
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            name="email"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.emailErr ? (
            <div className="err-msg">'Invalid email, try again.'</div>
          ) : null}
          {/* <input
            type="tel"
            placeholder="Phone number"
            value={data.phone}
            name="phone"
            onChange={(e) => handleChange(e)}
          ></input> */}
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            value={data.password}
            name="password"
            onChange={(e) => handlePasswordChange(e)}
            onFocus={() => setPasswordFocused(true)}
          ></input>
          {passwordFocused ? <PasswordChecks props={requirements} /> : null}
          <input
            type="password"
            placeholder="Confirm password"
            value={data.passConfirmation}
            name="passCon"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.passwordErr ? (
            <div className="err-msg">"Passwords must match"</div>
          ) : null}
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
          {success ? (
            <div className="success-msg">Signup successful!</div>
          ) : null}
        </form>
      </div>
    </div>
  );

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handlePasswordChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
    validatePassword();
  }

  function validatePassword() {
    const nums = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    const symbols = ["!", "@", "#", "$", "%", "^", "&", "*", "(", ")"];
    if (/\d/.test(data.password))
      setRequirements({ ...requirements, oneNumber: true });
    if (data.password.length >= 6)
      setRequirements({ ...requirements, sixChars: true });
    if (/A-Z/.test(data.password))
      setRequirements({ ...requirements, oneCapital: true });
    if (/[!@#%^&*()_+-=[]{}|;':",.`]/.test(data.password))
      setRequirements({ ...requirements, oneSymbol: true });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!errors) setSuccess(true);
    // if (data.password != data.passCon)
    // if (data.email.split('').includes('@'))
  }
}

export default App;
