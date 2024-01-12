import "./ExpenseDate.css";
import "./Mothers.css";
import { FaQuoteRight } from "react-icons/fa";
const ExpenseDate = (props) => {
  // const month = props.date.toLocaleString("en-US", { month: "long" });
  // const year = props.date.toLocaleString("en-US", { day: "2-digit" });
  // const day = props.date.getFullYear();
  const image = props.img;
  return (
    <div className="expense-date">
      <article>
        <img src={image} alt="picture" className="person_m-img" />
      </article>
    </div>
  );
};
export default ExpenseDate;
