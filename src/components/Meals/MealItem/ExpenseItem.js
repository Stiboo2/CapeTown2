import "./ExpenseItem.css";
import Card from "../../UI/MemberCard/Card";
import IdPhotoRound from "./IdPhotoRound";
import classes from "./MealItem.module.css";
import { useGlobalContext } from "../../../store/context";

const ExpenseItem = (props) => {
  const { increase, decrease, branchdate, branch_Date } = useGlobalContext();
  console.log(branchdate, branch_Date);
  const increaseHandler = () => {
    increase(props.id, props.attendance);
  };

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
