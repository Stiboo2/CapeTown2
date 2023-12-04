import React, { useState } from "react";
import "./IntSetUp.css"; // Import the CSS file

const AttendanceSetup = ({ onAttendanceChange }) => {
  const [date, setDate] = useState("");
  const [churchBranchId, setChurchBranchId] = useState("");
  const [pastorId, setPastorId] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleChurchBranchIdChange = (event) => {
    setChurchBranchId(event.target.value);
  };

  const handlePastorIdChange = (event) => {
    setPastorId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Pass the updated values to the parent component
    onAttendanceChange(date, churchBranchId, pastorId);

    // Reset the form fields
    setDate("");
    setChurchBranchId("");
    setPastorId("");
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="date" value={date} onChange={handleDateChange} />
        </div>
        <div>
          <label htmlFor="churchBranchSelect">Church Branch ID:</label>
          <select
            id="churchBranchSelect"
            value={churchBranchId}
            onChange={handleChurchBranchIdChange}
          >
            <option value="">Select Branch</option>
            <option value="branch1">Dunoon</option>
            <option value="branch2">Paarl</option>
            <option value="branch3">Mfuleni</option>
            <option value="branch4">Capricon</option>
          </select>
        </div>
        <div>
          <label htmlFor="BabaSelect">Pastor ID:</label>
          <select
            id="BabaSelect"
            value={pastorId}
            onChange={handlePastorIdChange}
          >
            <option value="">Select Baba Ophethe</option>
            <option value="Baba Dlamini">Baba Dlamini</option>
            <option value="Baba Msiya">Baba Msiya</option>
            <option value="Baba Mkhize">Baba Mkhize</option>
            <option value="Baba Mkhabela">Baba Mkhabela</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AttendanceSetup;
