import React from "react";
import "./IntSetUp.css"; // Import the CSS file

const InitSetUp = ({ date, church_branch_id, pastor_id }) => {
  return (
    <div className="home-pagea">
      {/* Add the "home-page" class */}
      <p className="date">Date: {date}</p> {/* Add the "date" class */}
      <p className="church-branch">Church Branch: {church_branch_id}</p>
      {/* Add the "church-branch" class */}
      <p className="pastor">Pastor: {pastor_id}</p>
      {/* Add the "pastor" class */}
    </div>
  );
};

export default InitSetUp;
