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
  const [dataErr, setDataErr] = useState(false);
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

  console.log(data);
  console.log(data.password === data.passConfirmation);
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
            <div className="err-msg">Name can't be blank</div>
          ) : null}
          <input
            type="email"
            placeholder="Email"
            value={data.email}
            name="email"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.emailErr ? (
            <div className="err-msg">Invalid email, try again.</div>
          ) : null}
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
            name="passConfirmation"
            onChange={(e) => handleChange(e)}
          ></input>
          {errors.passwordErr ? (
            <div className="err-msg">Passwords must match</div>
          ) : null}
          <button
            type="submit"
            onClick={(e) =>
              handleSubmit(e, data.password, data.passConfirmation)
            }
          >
            Submit
          </button>
          {success && !dataErr ? (
            <div className="success-msg">Signup successful!</div>
          ) : null}
          {dataErr && !success ? (
            <div className="err-msg">Somethign went wrong, try again.</div>
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
    validatePassword(e.target.value);
  }

  function validatePassword(password) {
    setSuccess(false);
    if (/\d/.test(password))
      setRequirements((req) => ({ ...req, oneNumber: true }));
    else if (!/\d/.test(password))
      setRequirements((req) => ({ ...req, oneNumber: false }));
    if (password.length >= 6)
      setRequirements((req) => ({ ...req, sixChars: true }));
    else if (password.length < 6)
      setRequirements((req) => ({ ...req, sixChars: false }));
    if (/[A-Z]/.test(password))
      setRequirements((req) => ({ ...req, oneCapital: true }));
    else if (!/[A-Z]/.test(password))
      setRequirements((req) => ({ ...req, oneCapital: false }));
    if (/[!@#%^&*()_+-=]/.test(password))
      setRequirements((req) => ({ ...req, oneSymbol: true }));
    else if (!/[!@#%^&*()_+-=]/.test(password))
      setRequirements((req) => ({ ...req, oneSymbol: false }));
  }

  function handleSubmit(e, password, passConfirmation) {
    e.preventDefault();
    setErrors(() => ({
      emailErr: false,
      nameErr: false,
      phoneErr: false,
      passwordErr: false,
    }));
    setSuccess(()=>false)

    if (password !== passConfirmation) {
      setErrors((err) => ({ ...err, passwordErr: true }));
      setDataErr(()=>true)
      setSuccess(()=>false)
    }

    if (!data.email.split("").includes("@")) {
      setErrors((err) => ({ ...err, emailErr: true }));
      setDataErr(()=>true)
      setSuccess(()=>false)
    }
    else if (data.email.split("").includes("@")) setErrors((err)=>({...err, emailErr: false}))
    if (!data.name.length > 0) {
      setErrors((err) => ({ ...err, nameErr: true }));
      setDataErr(()=>true)
      setSuccess(()=>false)
    } else {
      setSuccess(true);
      setDataErr(()=>false)
    }
  }
}

export default App;
