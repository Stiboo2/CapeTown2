import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./PaymentsList.module.css"; // Update with your actual stylesheet path
import { useUserContext } from "../../store/user_context";

const PaymentsList = () => {
  const navigate = useNavigate();
  const { myUser } = useUserContext();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    console.log("inside BirthDay component useEffect");
    if (!myUser) {
      console.log("User not authenticated. Redirecting...");
      navigate('/unauthorizedpage');
    } else {
      console.log("Authentication check passed. Proceeding...");
      // Perform other actions related to BirthDay component
    }
  }, [myUser, navigate]);

  useEffect(() => {
    const fetchPayments = async () => {
      // Fetch payments data from your API
      const apiEndpoint = process.env.REACT_APP_API_BASE_URL;
      const response = await fetch(`${apiEndpoint}/payments.json`);

      if (!response.ok) {
        console.error("Failed to fetch payments data");
        return;
      }

      const data = await response.json();

      if (data) {
        const paymentsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));

        setPayments(paymentsArray);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className={classes.paymentsList}>
      <h2>Payments List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Title</th>
            <th>Name</th>
            <th>Cell</th>
            <th>Province</th>
            <th>Branch</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Slip</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.id}>
              <td style={style.tbody}>{payment.id}</td>
              <td style={style.tbody}>{payment.date}</td>
              <td style={style.tbody}>{payment.title}</td>
              <td style={style.tbody}>{payment.name}</td>
              <td style={style.tbody}>{payment.cell}</td>
              <td style={style.tbody}>{payment.province}</td>
              <td style={style.tbody}>{payment.branch}</td>
              <td style={style.tbody}>{payment.type}</td>
              <td style={style.tbody}>{payment.amount}</td>
              <td>
                <Link to={`/image/${payment.id}`} className={classes.linkCell}>
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
};

// Define styles
const style = {
  tbody: {
    color: 'white',
    padding: '10px',
  },
  linkCell: {
    // Add any additional styles you need
  },
};

export default PaymentsList;
