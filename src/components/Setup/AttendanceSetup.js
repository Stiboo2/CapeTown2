import React, { useState } from "react";
import "./IntSetUp.css"; // Import the CSS file
import { useGlobalContext } from "../../store/context";
const AttendanceSetup = ({ onAttendanceChange }) => {
  const { insetData, updateAttendanceRecord } = useGlobalContext();
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
  const attendance = {
    date,
    church_branch_id: churchBranchId,
    pastorId,
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    updateAttendanceRecord(attendance);

    onAttendanceChange();

    insetData(attendance);

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
            <option value="branch5">Stellenbosch</option>
            <option value="branch6">Strand</option>
            <option value="branch7">Atlantis</option>
            <option value="branch8">Khayelisha</option>
            <option value="branch9">Greenpark</option>
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
            <option value="Baba Shezi">Baba Shezi</option>
            <option value="Baba Zikula">Baba Zikula</option>
            <option value="Baba Mbhele">Baba Mbhele</option>
            <option value="Baba Sibanyoni">Baba Sibanyoni</option>
            <option value="Baba Madlala">Baba Madlala</option>
            <option value="Baba Kopo">Baba Kopo</option>
            <option value="Baba Mbongo">Baba Mbongo</option>
            <option value="Baba Mbobi">Baba Mbobi</option>
            <option value="Baba Khumalo">Baba Khumalo</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AttendanceSetup;
