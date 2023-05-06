import React from 'react';
import './Checkbox.css';
import {BsCheckLg} from "react-icons/bs"

function Checkbox(props) {
  return (
    <label className="checkbox" >
      <input type="checkbox" {...props} />
      <BsCheckLg className="checkmark" color="white"/>
  
    </label>
  );
}

export default Checkbox;