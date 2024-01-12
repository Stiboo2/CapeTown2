// Calculated.js
import React from "react";
import classes from "./Calculated.module.css";

const Calculated = ({
  sealedFalseCount,
  CountMembers,
  branchCounts,
  titleCounts,
}) => {
  return (
    <div className={classes.calculatedCard}>
      {CountMembers !== sealedFalseCount && (
        <div>
          Number of All members:{" "}
          <span className={classes.yellowText}>{CountMembers}</span>
        </div>
      )}
      <div>
        Number of New members:{" "}
        <span className={classes.yellowText}>{sealedFalseCount}</span>
      </div>
      <div>
        <span className={classes.underlineText}>Branch Counts:</span>
        {Object.keys(branchCounts).map((branch) => (
          <div key={branch}>
            {branch}:{" "}
            <span className={classes.yellowText}>{branchCounts[branch]}</span>{" "}
            Members
          </div>
        ))}
      </div>
      <div>
        <span className={classes.underlineText}>Title Counts:</span>
        {Object.keys(titleCounts).map((title) => (
          <div key={title}>
            {title}:{" "}
            <span className={classes.yellowText}>{titleCounts[title]}</span>{" "}
            Members
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculated;
