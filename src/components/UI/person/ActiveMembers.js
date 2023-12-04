import Card from "./Card";
import React from "react";
import classes from "./ActiveMembers.module.css";
import { useGlobalContext } from "../../../store/context";
import MemberList from "./MemberList";

const ActiveMembers = ({ showNewMember, onDataReceived }) => {
  const { cart } = useGlobalContext();
  const cartArray = Array.from(cart.entries());
  if (cartArray.length === 0) {
    return (
      <section className="cart">
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <MemberList
          showNewMember={showNewMember}
          onDataReceived={onDataReceived}
        />
      </Card>
    </section>
  );
};
export default ActiveMembers;
