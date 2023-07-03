import React from 'react'
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function PasswordChecks({props}) {
  return (
    <div className='checks-container'>
      <div className={props.sixChars ? 'valid check' : 'invalid check'}><AiOutlineCheckCircle />Must be 6 characters</div>
      <div className={props.oneCapital ? 'valid check' : 'invalid check'}><AiOutlineCheckCircle />Must include one capital letter</div>
      <div className={props.oneSymbol ? 'valid check' : 'invalid check'}><AiOutlineCheckCircle />Must include one symbol</div>
      <div className={props.oneNumber ? 'valid check' : 'invalid check'}><AiOutlineCheckCircle />Must include one number</div>
    </div>
  )
}
