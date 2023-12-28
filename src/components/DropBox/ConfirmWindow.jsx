import React from "react";
import classes from "./ConfirmWindow.module.css";
import Modal from "../UI/Modal";
const ConfirmWindow = (props) => {
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </div>
  );
  const cartModalContent = (
    <React.Fragment>
      <div className={classes.total}>
        <div>
          {props.firstMsg}
          {props.title} {props.name}
          {props.lastMsg}
        </div>
      </div>
      {modalActions}
    </React.Fragment>
  );

  return <Modal onClose={props.onClose}>{cartModalContent}</Modal>;
};
export default ConfirmWindow;
