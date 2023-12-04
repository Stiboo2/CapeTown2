import React, { useState } from "react";
//import classes from "./ConfirmWindow.module.css";
import Modal from "../UI/Modal";
import CircularLoading from "./CircleLoading";
const CircularLoadingModal = (props) => {

  const cartModalContent = (
    <React.Fragment>
        <CircularLoading/>
    </React.Fragment>
  );

  return (
    <Modal >
      { cartModalContent}
    </Modal>
  );
};
export default CircularLoadingModal;
