import React from "react";
import classes from "./Title.module.css";

const Title = ({ text }) => {
  return (
    <div className={classes.title}>
      <h2 className={classes.title_h2}>{text || "Default Title"}</h2>
      <div className={classes["title-underline"]}></div>
      <h2 className={classes.branch_h2}>{"Branch"}</h2>
    </div>
  );
};

export default Title;
