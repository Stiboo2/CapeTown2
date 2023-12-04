import React from 'react'
import  {  useState} from "react";
import { Link } from "react-router-dom";
import FillInPassword from "./FillInPassword"
const Administrator = () => {

    const [correct, setCorrect] = useState(false);
    const [showQoution, setshowQoution] = useState(false);
    const verify = () => {
        
       
        setshowQoution(true)
    };
  
  
  return (
    <div>
        
        {!showQoution && 
        
        <button onClick={verify}>
            LogIn as Adminstrator
        </button>        }
        {showQoution && <FillInPassword  />}
       
    </div>
  )
}

export default Administrator
