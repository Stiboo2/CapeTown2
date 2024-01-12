import ShowAllMembers from "../ShowAllMembers";
import { useGlobalContext } from "../../../store/context";
import { useState } from "react";
import classes from "./Database.module.css";
import AllMember from "./AllMember";

const Database = () => {
  const [showAllMember, setShowAllMember] = useState(false);
  const [showNewMember, setShowNewMember] = useState(false);
  const { cart } = useGlobalContext();
  const memberS = Array.from(cart.entries()).map(([id, item]) => ({
    id,
    ...item,
  }));

  const toggleMemberTableHandler = () => {
    setShowAllMember((prevShowAllMember) => !prevShowAllMember);
  };
  const toggleNewemberHandler = () => {
    setShowNewMember((prevShowNewMember) => !prevShowNewMember);
  };
  return (
    <div className={classes.parentContainer}>
      <div className={classes.container}>
        <div className={classes.buttons}>
          <button
            className={classes.buttonAdd}
            onClick={toggleMemberTableHandler}
          >
            Show All Members
          </button>
          <button className={classes.buttonAdd} onClick={toggleNewemberHandler}>
            {!showNewMember ? "Show New Members" : "Show All Members"}
          </button>
        </div>
      </div>

      {showAllMember && <ShowAllMembers tableData={memberS} />}
      {!showAllMember && <AllMember showNewMember={showNewMember} />}
    </div>
  );
};
export default Database;
