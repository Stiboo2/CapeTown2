import React from "react";
import classes from "./Home.module.css";
import LoginPage from "../LoginPage/LoginPage";
import { useGlobalContext } from "../store/context";

const Home = () => {
  const { LogIn } = useGlobalContext();
 
  return (
    <>
      <div className={classes.homeContainer}>
        <div className={classes.textContainer}>
          <h4 className={classes.textSite}>Welcome to </h4>
          <div className={classes.text}>The Apostolic Church </div>
          <h4 className={classes.textSite}>Website </h4>
        </div>

  {/*       <img
          className={classes.fullscreenImage}
          src="https://res.cloudinary.com/dkayrcyeb/image/upload/v1690564867/20220710_082245_r0i2aw.jpg"
          alt="Home Image"
        /> */}
      </div>
      <div>{LogIn && <LoginPage />}</div>
    </>
  );
};

export default Home;
