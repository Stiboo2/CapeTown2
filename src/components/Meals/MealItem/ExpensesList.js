import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";

const ExpensesList = ({ members, attendanceRecord, catalog }) => {
  if (members.length === 0) {
    return <h2 className="expenses-list__fallback">Found no Expenses</h2>;
  }

  return (
    <ul className="expenses-list">
      {members.map((memberCombo) => {
        const [id, member] = memberCombo;
        const catalogString = Array.from(catalog).join("");

        if (
          (catalogString !== "all" && member.branch !== catalogString) ||
          member.status !== "null" ||
          member.active === "no"
        ) {
          return null; // Skip rendering the CartItem component
        }
        return (
          <ExpenseItem
            key={id}
            id={id}
            title={member.title}
            surname={member.surname}
            branch={member.branch}
            img={member.img}
            attendance={attendanceRecord}
          />
        );
      })}
    </ul>
  );
};

export default ExpensesList;
