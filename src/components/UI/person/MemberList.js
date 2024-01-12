import React, { useEffect } from "react";
import { useGlobalContext } from "../../../store/context";
import MemberItem from "./MemberItem";
import classes from "./MemberList.module.css";
import Calculated from "./Calculated";

const MemberList = ({ showNewMember, onDataReceived }) => {
  const { cart } = useGlobalContext();
  const members = Array.from(cart.entries());

  // Count the number of members with sealed set to false
  const branchCounts = {};
  const titleCounts = {};
  let sealedFalseCount = 0,
    CountMembers = 0;
  const sendDataToParent = () => {
    onDataReceived(branchCounts, titleCounts, sealedFalseCount, CountMembers);
  };
  useEffect(() => {
    sendDataToParent();
  }, [showNewMember, cart]);
  return (
    <ul className={classes["expenses-list"]}>
      {members.map((memberCombo) => {
        const [id, member] = memberCombo;

        if (
          member.active === "no" ||
          (showNewMember && member.sealed === "yes")
        ) {
          return null; // Skip rendering the CartItem component
        }
        CountMembers++;

        if (member.sealed === "no") {
          sealedFalseCount++;
        }

        titleCounts[member.title] = (titleCounts[member.title] || 0) + 1;

        branchCounts[member.branch] = (branchCounts[member.branch] || 0) + 1;

        return (
          <MemberItem
            key={id}
            id={id}
            title={member.title}
            surname={member.surname}
            branch={member.branch}
            img={member.img}
            cell={member.cell}
            idNumber={member.idNumber}
            serviceYears={member.serviceYears}
            birthday={member.birthday}
            active={member.active}
            sealed={member.sealed}
          />
        );
      })}
    </ul>
  );
};

export default MemberList;
