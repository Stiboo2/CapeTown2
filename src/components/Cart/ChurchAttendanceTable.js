import React, { useState } from "react";
import "./ChurchAttendanceTable.css";

const ChurchAttendanceTable = ({ branches }) => {
  const [selectedBranch, setSelectedBranch] = useState(branches[0]._id);
  const uniqueDates = Array.from(
    new Set(branches.flatMap((branch) => branch.attendance.map((a) => a.date)))
  );

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
  };

  return (
    <div>
      <label htmlFor="branchSelect">Select a Branch: </label>
      <select
        id="branchSelect"
        value={selectedBranch}
        onChange={handleBranchChange}
      >
        <option value="">All Branches</option>
        {branches.map((branch) => (
          <option key={branch._id} value={branch._id}>
            {branch.name}
          </option>
        ))}
      </select>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Church</th>
            <th>Pastor</th>
            <th>Attended</th>
            <th>Absent</th>
          </tr>
        </thead>
        <tbody>
          {uniqueDates.map((date) => (
            <tr key={date}>
              <td>{date}</td>
              {branches.map((branch) => {
                if (selectedBranch && branch._id !== selectedBranch) {
                  return null; // Skip branches if a specific branch is selected and it doesn't match
                }
                const attendance = branch.attendance.find(
                  (a) => a.date === date
                );
                return (
                  <React.Fragment key={branch._id}>
                    <td>{branch.name}</td>
                    <td>{attendance ? attendance.pastor_id : ""}</td>
                    <td>{attendance ? attendance.total_attended : ""}</td>
                    <td>{attendance ? attendance.total_absent : ""}</td>
                  </React.Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChurchAttendanceTable;
