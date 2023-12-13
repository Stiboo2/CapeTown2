import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import classes from "./MainNavigation.module.css";
import { FaBars, FaTimes } from "react-icons/fa";
import Logo from "../assets/logo.png";
import { useGlobalContext } from "../store/context";
import { useUserContext } from "../store/user_context";
import CartButtons from "./Layout/CartButtons";
import LogInAndOut from "./Layout/LogInAndOut";

const MainNavigation = () => {
  const { myUser } = useUserContext();
  const { LogIn } = useGlobalContext();
  const location = useLocation();
  const [click, setClick] = useState(false);
  useEffect(() => {
    setClick(false);
  }, [location]);
  const handleClick = () => setClick((prevState) => !prevState);

  /*   if (myUser) {
    setWantToLogIn(false);

      const handleNavLinkClick = () => {
    setClick(false);
  };

    onClick={handleNavLinkClick} // Close the menu when NavLink is clicked
            > 
  } */

  return (
    <div>
    <div className={classes.headerContainer}>
            <div className={classes.logo}>
        <img className={classes.logo} src={Logo} alt="logo" />
      </div>
    <h1 className={classes.mainheader}>
  The Apostolic Church <span className={classes.subtitle}> of idwala lethu</span>
</h1>

    </div>
    <div className={classes.navbar}>


      <nav>
        <ul
          className={
            click ? `${classes.navMenu} ${classes.active}` : classes.navMenu
          }
        >
          <li className={classes.navItem}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="UnauthorizedPage"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              About Us
            </NavLink>
          </li>
 
          <li className={classes.navItem}>
            <NavLink
              to="UnauthorizedPage"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Services
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="UnauthorizedPage"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="birthday"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Contact
            </NavLink>
          </li>
          <li className={classes.navItem}>
            <NavLink
              to="UnauthorizedPage"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              CHURCH DATABASE
            </NavLink>
          </li>
  
          <li className={classes.navItem}>
            <NavLink
              to="SubmitProof"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              UPLOAD PROOF
              
            </NavLink>
          </li>

            <li className={classes.navItem}>
            <NavLink
              to="cashbook"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Cash Book
            </NavLink>
          </li>
        </ul>
      </nav>
      <LogInAndOut></LogInAndOut>
      <div className={classes.hamburger} onClick={handleClick}>
        {click ? (
          <FaTimes className={classes.faTimes} />
        ) : (
          <FaBars className={classes.faBars} />
        )}
      </div>
    </div>
    </div>
  );
};

export default MainNavigation;
