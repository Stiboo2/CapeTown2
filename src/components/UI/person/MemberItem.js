import classes from "./MemberItem.module.css";
import Card from "../MemberCard/Card";
import IdPhoto from "./IdPhoto";
import { useGlobalContext } from "../../../store/context";
import { useState } from "react";
import { Link } from "react-router-dom";
import Delete from "./Delete";
const MemberItem = (props) => {
  const [showDeleteSmg, setShowDeleteSmg] = useState(false);
  const { deleteMember } = useGlobalContext();

  const deleteHanler = () => {
    setShowDeleteSmg(true);
  };

  const hideDeleteHandler = (status) => {
    setShowDeleteSmg(false);
    if (status) {
      deleteMember(props.id);
    }
  };
  return (
    <div>
      <li>
        <Card className={classes["expense-item"]}>
          <IdPhoto img={props.img} />
          <div className={classes["expense-item__description"]}>
            <div className={classes["discription"]}>
              <div>Title: {props.title}</div>
              <div>Surname: {props.surname}</div>
              <div className={classes.price}>Branch: {props.branch}</div>
            </div>
            <div className={classes["discription"]}>
              <div>Cell: {props.cell}</div>
              <div>ID: {props.idNumber}</div>
              <div className={classes.price}>Birthday: {props.birthday}</div>
            </div>
            <div className={classes["discription"]}>
              <div>Active: {props.active}</div>
              <div>Sealed: {props.sealed}</div>
              <div className={classes.price}>
                Year/s of Service: {props.serviceYears}
              </div>
            </div>
            <div className={classes["button_ud"]}>
              <Link
                className={classes["expense-item__pressent"]}
                to={`/updateMember/ ${props.id}`}
              >
                Edit
              </Link>
              <button
                className={classes["expense-item__absent"]}
                onClick={deleteHanler}
              >
                Delete
              </button>
            </div>
          </div>
        </Card>
        {showDeleteSmg && <Delete onClose={hideDeleteHandler} />}
      </li>
    </div>
  );
};

export default MemberItem;
