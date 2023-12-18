import { FaChurch } from "react-icons/fa";

const CartIcon = ({ numberOfCartItems }) => {
  return (
    <div className="cart-button">
      <div className="nav-container">
        <div className="amount-container">
          <p className="total-amount">{numberOfCartItems}</p>
        </div>
      </div>
    </div>
  );
};

export default CartIcon;
