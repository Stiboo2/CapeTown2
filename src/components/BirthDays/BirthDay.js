import React, { useState, useEffect } from "react";
import "./BirthDay.css";
import List from "./List";
import { useGlobalContext } from "../../store/context";
import LoginPage from "../../LoginPage/LoginPage";

const BirthDay = () => {
  const { cart, LogIn } = useGlobalContext();
  const [allMemberS, setAllMemberS] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchMembers = () => {
      const memberS = Array.from(cart.entries())
        .map(([id, item]) => ({ id, ...item }))
        .filter((member) => member.active !== "no");

      setAllMemberS(memberS);
    };

    fetchMembers();
  }, [cart]);

  useEffect(() => {
    // Set the default month as the current month
    const currentDate = new Date();
    const currentMonth = currentDate.toLocaleString("default", {
      month: "long",
    });
    setSelectedMonth(currentMonth);
  }, []);

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const clearHandleButton = () => {
    setAllMemberS([]);
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const filteredMembers = selectedMonth
    ? allMemberS.filter((member) => {
        const birthDate = new Date(member.birthday);
        const month = birthDate.toLocaleString("default", { month: "long" });
        return month === selectedMonth;
      })
    : allMemberS;
  return (
    <main className="main_bd">
      <div>{LogIn && <LoginPage />}</div>
      <section className="container_bd">
        <div className="title_rv">
          <h2>BirthDay List</h2>
          <div className="underline_rv"></div>
        </div>
        <div className="month_select">
          <label htmlFor="monthSelect">Select Month:</label>
          <select
            id="monthSelect"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            <option value="">-- Select Month --</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <h3>{filteredMembers.length} birthdays this Month</h3>
        <List memberS={allMemberS} selectedMonth={selectedMonth} />
        <button className="button_bd" onClick={clearHandleButton}>
          clear all
        </button>
      </section>
    </main>
  );
};

export default BirthDay;
