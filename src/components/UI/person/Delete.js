// Delete.js
import React, { useState } from "react";
import classes from "./Delete.module.css";
import Modal from "../Modal";

const Delete = (props) => {
  const [isSubmit, setIsSubmit] = useState(false);

  const cartModalContent = (
    <React.Fragment>
      <div className={classes.deleteClass}>
        <h1>Are you sure You want to delete?</h1>
        <div className={classes.deletebutton}>
          <button
            className={classes.cancelbutton}
            onClick={() => props.onClose(false)}
          >
            Cancel
          </button>
          <button
            className={classes.confirmbutton}
            onClick={() => props.onClose(true)}
          >
            Confirm
          </button>
        </div>
      </div>
    </React.Fragment>
  );

  return <Modal onClose={() => {}}>{!isSubmit && cartModalContent}</Modal>;
};

export default Delete;
