import classes from "./CartItem.module.css";

const CartItem = (props) => {
  return (
    <li className={classes["cart-item"]}>
      <h2>{props.title}</h2>
      <h2>{props.surname}</h2>
      <button onClick={props.onRemoveCart}>Remove</button>
    </li>
  );
};

export default CartItem;
