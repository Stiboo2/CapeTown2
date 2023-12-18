import React, { useState } from "react";
import ChurchAttendanceTable from "./ChurchAttendanceTable";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";
import { useGlobalContext } from "../../store/context";
const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const {
    removeMember,
    cart,
    totalAmount,
    branch_Date,
    branchs,
    setIsSubmitting,
  } = useGlobalContext();
  const capetownBranch = Array.from(branchs.values(), (branch) => branch);

  const hasItems = true;
  const members = Array.from(cart.entries());

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = () => {
    setIsSubmitting(true);

    setIsSubmit(false);
    setDidSubmit(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {members.map((memberCombo) => {
        const [id, member] = memberCombo;
        const date = branch_Date.date;
        const BI = branch_Date.church_branch_id;
        if (member.status !== "present") {
          return null; // Skip rendering the CartItem component
        }
        const onRemoveCartHandler = () => {
          removeMember(id, date, BI);
        };
        return (
          <CartItem
            key={id}
            id={id}
            surname={member.surname}
            title={member.title}
            onRemoveCart={onRemoveCartHandler}
          />
        );
      })}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Next
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Members</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </React.Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <h1>Church Attendance</h1>
      <ChurchAttendanceTable branches={capetownBranch} />

      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmit && !didSubmit && cartModalContent}
      {isSubmit && isSubmittingModalContent}
      {!isSubmit && didSubmit && didSubmitModalContent}
    </Modal>
  );
};
export default Cart;
