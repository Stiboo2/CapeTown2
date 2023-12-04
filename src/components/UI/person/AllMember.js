import React, { useEffect, useState } from "react";
import ActiveMembers from "./ActiveMembers";
import Calculated from "./Calculated";
import classes from "./AllMember.module.css";
const AllMember = ({ showNewMember }) => {
  const [branchCounts, setBranchCounts] = useState({});
  const [titleCounts, setTitleCounts] = useState({});
  const [sealedFalseCount, setSealedFalseCount] = useState(0);
  const [CountMembers, setCountMembers] = useState(0);

  const onDataReceived = (
    branchCounts,
    titleCounts,
    sealedFalseCount,
    CountMembers
  ) => {
    setBranchCounts(branchCounts);
    setTitleCounts(titleCounts);
    setSealedFalseCount(sealedFalseCount);
    setCountMembers(CountMembers);
  };
  return (
    <div className={classes.MemberCalculated}>
      <Calculated
        branchCounts={branchCounts}
        titleCounts={titleCounts}
        sealedFalseCount={sealedFalseCount}
        CountMembers={CountMembers}
      />
      <ActiveMembers
        showNewMember={showNewMember}
        onDataReceived={onDataReceived}
      />
    </div>
  );
};
export default AllMember;
