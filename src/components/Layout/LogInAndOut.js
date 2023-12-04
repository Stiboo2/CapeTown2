import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUserMinus, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../../store/user_context";
import { signOut } from "firebase/auth";
import classes from "./CartButton.module.css";
import { useGlobalContext } from "../../store/context";

const LogInAndOut = () => {
  const { auth, myUser } = useUserContext();
  const { setWantToLogIn, LogIn } = useGlobalContext();
  const [logBtnClick, setLogBtnClick] = useState(LogIn);
  const logout = async () => {
    await signOut(auth);
  };
  const buttonWantToLogIn = () => {
    setLogBtnClick((prevState) => !prevState);
    setWantToLogIn(!logBtnClick);
  };
  useEffect(() => {
    setLogBtnClick(LogIn);
  }, [LogIn]);
  return (
    <Wrapper className="cart-btn-wrapper">
      {myUser ? (
        <button type="button" className="auth-btn" onClick={logout}>
          Logout
        </button>
      ) : (
        <button className={classes.loga} onClick={buttonWantToLogIn}>
          {LogIn ? "Loging....IN" : "Login"}
        </button>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;

  .cart-btn {
    color: white;
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    display: flex;
    align-items: center;
  }

  .cart-container {
    color: white;
    display: flex;
    align-items: center;
    position: relative;

    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }

  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: white;
    padding: 12px;
  }

  .auth-btn:hover,
  .auth-btn:active {
    background-color: #2c0d00;
  }

  .auth-btn {
    display: flex;
    color: white;
    align-items: center;
    background: transparent;
    border-color: white;
    // font-size: 1.5rem;
    cursor: pointer;
    color: white;
    border-radius: 25px;
    padding: 0.25rem 1rem;
    justify-content: space-around;
    align-items: center;
    // letter-spacing: var(--spacing);

    svg {
      margin-left: 5px;
    }
  }
`;

export default LogInAndOut;
