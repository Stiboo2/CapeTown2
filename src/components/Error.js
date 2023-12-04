import "./Error.css";
import { Link } from "react-router-dom"; 
const Error = () => {
  return (
    <div className="content">
      <h1>An Error Occurred</h1>
      <p>Could not find this Page!</p>
      <Link to="/">HOME</Link>
    </div>
  );
};
export default Error;
