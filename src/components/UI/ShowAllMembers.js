import React from "react";
import "./ShowAllMembers.css";

const ShowAllMembers = ({ tableData }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>S.N</th>
          <th>Title</th>
          <th>Surname</th>
          <th>Cell Number</th>
          <th>ID Number</th>
          <th>Branch</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((data, index) => {
          const rowClass = index % 2 === 0 ? "even-row" : "odd-row";
          return (
            <tr key={index} className={rowClass}>
              <td>{index + 1}</td>
              <td>{data.title}</td>
              <td>{data.surname}</td>
              <td>{data.cell}</td>
              <td>{data.idNumber}</td>
              <td>{data.branch}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ShowAllMembers;
