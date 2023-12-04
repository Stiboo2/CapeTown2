import React, { useState } from "react";
import classes from "./Warning.module.css";
import Modal from "./Modal";

const Warning = (props) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const cartModalContent = (
    <React.Fragment>
      <div className={classes.warningClass}>
        <h1>New Picture was not SAVED?</h1>
        <div className={classes.warningbutton}>
          <button
            className={classes.cancelbutton}
            onClick={() => props.onClose(false)}
          >
            Back
          </button>
          <button
            className={classes.confirmbutton}
            onClick={() => props.onClose(true)}
          >
            Continue
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  return <Modal onClose={() => {}}>{!isSubmit && cartModalContent}</Modal>;
};

export default Warning;
