import { useContext, useEffect, useState } from "react";
import { useGlobalContext } from "../../store/context";
import classes from "./HeaderCardButton.module.css";
import CartIcon from "../Cart/CartIcon";
import { FaChurch } from "react-icons/fa";

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHightlighted] = useState(false);

  const { totalAmount, branchName } = useGlobalContext();

  const btnClasses = `${classes.btnClasses} ${
    btnIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (false) {
      return;
    }
    setBtnIsHightlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHightlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <button className={classes.btnSpans} onClick={props.onClick}>
      <span className={classes.branchName}>{branchName}</span>
      <span className={classes.icon}>
        <FaChurch className={classes.cartIcon} />
      </span>
      <span className={classes.totalAmount}>{totalAmount}</span>
    </button>
  );
};
export default HeaderCartButton;
