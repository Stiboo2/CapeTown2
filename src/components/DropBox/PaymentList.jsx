import React, { useState, useEffect } from "react";
import classes from "./PaymentsList.module.css"; // Update with your actual stylesheet path
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../store/user_context";

const PaymentsList = () => {

  const navigate = useNavigate();
  const { myUser } = useUserContext();
  
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
  const [payments, setPayments] = useState([]);

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
      <ul>
        {payments.map((payment) => (
          <li key={payment.id}>
            <img src={payment.image} alt={`Payment ${payment.id}`} className={classes.paymentImage} />
            <p>ID: {payment.id}</p>
            <p>Name: {payment.name}</p>
            <p>Date: {payment.date}</p>
            <p>Title: {payment.title}</p>
            <p>Branch: {payment.branch}</p>
            <p>Type: {payment.type}</p>
            <p>Cell: {payment.cell}</p>
            <p>Amount: {payment.amount}</p>
            <p>Province: {payment.province}</p> 
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentsList;
