import React, { Fragment, useState } from "react";
import AvailableMeals from "./AvailableMeals";
import AttendanceSetup from "../Setup/AttendanceSetup";
import "./MealItem/Expenses.css";
import FilterBar from "../Layout/FilterBar";
import MemberForm from "./Data/MemberForm";
import "./MealsButton.css";
import { useGlobalContext } from "../../store/context";
import "./Meals.css";
import Header from "../Layout/Header";
import classes from "./page.module.css";
import Cart from "../Cart/Cart";
import { useUserContext } from "../../store/user_context";
import LoginPage from "../../LoginPage/LoginPage";

const Meals = () => {
  const { myUser } = useUserContext();
  const [attendanceRecord, setAttendanceRecord] = useState({
    date: "1985-04-07",
    church_branch_id: "branch1",
    pastor_id: "pastor2",
  });

  const [cartIsShown, setCartIsShown] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [valueFromChild, setValueFromChild] = useState("all");
  const [addMemberButton, setAddMemberButton] = useState(false);
  const { date, reloadMembers, setIsSubmitting, addNewMember } =
    useGlobalContext();

  const handleAttendanceChange = () => {
    setSubmitted(true);
  };

  const handleValueFromChild = (value) => {
    setValueFromChild(value);
  };

  const MemberHandler = () => {
    setAddMemberButton(!addMemberButton);
  };

  const buttonReloadHandler = () => {
    reloadMembers(attendanceRecord);
    setIsSubmitting(true);
  };

  const SaveMember = (newMember) => {
    addNewMember(newMember);
    MemberHandler();
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <div>
      {myUser && (
        <>
          {cartIsShown && <Cart onClose={hideCartHandler} />}
          <Header
            onShowCart={showCartHandler}
            date={date}
            submitted={submitted}
          />
          <div className="meals">
            {!submitted && (
              <AttendanceSetup onAttendanceChange={handleAttendanceChange} />
            )}
            {submitted && (
              <Fragment>
                <FilterBar onValueChange={handleValueFromChild} />
                {addMemberButton && (
                  <MemberForm
                    onConfirm={SaveMember}
                    onCancelMeal={MemberHandler}
                  />
                )}
                {!addMemberButton && (
                  <>
                    <button
                      className={classes.buttonAdd}
                      onClick={MemberHandler}
                    >
                      Add New Member
                    </button>
                    <AvailableMeals
                      attendanceRecord={attendanceRecord}
                      catalog={valueFromChild}
                    />
                    <button
                      className={classes.buttonreload}
                      onClick={buttonReloadHandler}
                    >
                      Reload Members
                    </button>
                  </>
                )}
              </Fragment>
            )}
          </div>
        </>
      )}
      {!myUser && <LoginPage />}
    </div>
  );
};

export default Meals;