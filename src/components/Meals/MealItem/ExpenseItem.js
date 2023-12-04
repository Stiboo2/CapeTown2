import "./ExpenseItem.css";
import Card from "../../UI/MemberCard/Card";
import IdPhotoRound from "./IdPhotoRound";
import classes from "./MealItem.module.css";
import { useGlobalContext } from "../../../store/context";
import { useEffect } from "react";

const absentHandler = () => {
  console.log("Absent");
};
const ExpenseItem = (props) => {
  const { remove, increase, decrease, insetData, updateAttendanceRecord } =
    useGlobalContext();

  const increaseHandler = () => {
    increase(props.id, props.attendance);
  };
  useEffect(() => {
    updateAttendanceRecord(props.attendance);
  }, [props.attendance]);

  const decreaseHandler = () => {
    const apologySMS = window.prompt("Please enter the apology SMS:");

    if (apologySMS !== null && apologySMS.trim() !== "") {
      const updatedAttendance = {
        ...props.attendance,
        apologySMS: apologySMS,
      };

      decrease(props.id, updatedAttendance);
    }
  };

  useEffect(() => {
    insetData(props.attendance);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.attendance]);
  return (
    <li>
      <Card className="expense-item">
        <IdPhotoRound img={props.img} />
        <div className="expense-item__description">
          <div className="discription">
            <div>{props.title}</div>
            <h3>{props.surname}</h3>
            <div className={classes.price}>{props.branch}</div>
          </div>

          <div className="button_ud">
            <button
              className="expense-item__pressent"
              onClick={increaseHandler}
            >
              Present
            </button>
            <button className="expense-item__absent" onClick={decreaseHandler}>
              Absent
            </button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default ExpenseItem;
