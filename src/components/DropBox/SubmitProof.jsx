import React, { Fragment, useState, useEffect } from "react";
import "./Expenses.css";
import "./MealsButton.css"; 
import "./Meals.css";
import classes from "./page.module.css";
import ProofForm from "./ProofForm";
import LoginPage from "../../LoginPage/LoginPage";
import { useGlobalContext } from "../../store/context";
import Administrator from "./Administrator";
import { useUserContext } from "../../store/user_context";
import FeedBack from "./FeedBack/FeedBack";
import AccountNumber from "./AccountNumber";
import ConfirmWindow from "./ConfirmWindow";
import CircularLoadingModal from "./CircularLoadingModal";

const SubmitProof = () => {
  const { myUser } = useUserContext(); // Access the user information from context
  const { LogIn } = useGlobalContext();
  const [submitted, setSubmitted] = useState(false);
  const [addMemberButton, setAddMemberButton] = useState(false);
  const [feedback, setFeedback] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [proofofPayment, setProofofPayment] = useState(null);
  const [feedbackVisible, setFeedbackVisible] = useState(true);
  const [accountVisible, setAccountVisible] = useState(true);
  const [confirmWindowIsShown, setConfirmWindowIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSubVisible, setFeedbackSubVisible] = useState(true);
  const [feedbackCount, setFeedbackCount] = useState(false);

  const MemberHandler = () => {
    setAddMemberButton(!addMemberButton); // delete**** change the name
    setFeedback(true)
  };
  const SaveProof = (ProofofPayment) => {
    setProofofPayment(ProofofPayment);
    MemberHandler();
    setFeedback(true);
    setFeedbackCount(false);
    setFeedbackSubVisible(false);
  };
  const FeedbackHandler = () => {
    if (feedbackCount) {
    setFeedbackSubVisible(false)
    } else {
      setFeedbackCount(true)
    }
    setFeedbackVisible((prevVisible) => !prevVisible);
  };
  const AccountHandler = () => {
    setAccountVisible((prevVisible) => !prevVisible);
  };
  const hideConfirmWindowHandler = () => {
    setConfirmWindowIsShown(false);
  };
  useEffect(() => {
    if (proofofPayment) {
      setIsLoading(true)
      const sendProofCloud = async () => {
        const parentNode = "payments";
        const apiEndpoint = process.env.REACT_APP_API_BASE_URL;
        try {
          const response = await fetch(`${apiEndpoint}/${parentNode}/${proofofPayment.id}.json`, {
            method: "PUT",
            body: JSON.stringify(proofofPayment),
          });
          setIsLoading(false)
          if (response.ok) {
            setConfirmWindowIsShown(true)
          }
          if (!response.ok) {
            throw new Error("Sending proof data failed.");
          }
          setIsSubmitting(false);
          // Handle success
        } catch (error) {
          // Handle error
        }
      };

      sendProofCloud();
    }
  }, [proofofPayment]);

  return (
    <div>
      <div>{LogIn && <LoginPage />}</div>
      {isLoading && <CircularLoadingModal/>}
      { !addMemberButton &&    
          <button className={classes.buttonAdd} onClick={AccountHandler}>
            {accountVisible ? "Account Number"  : "Got it"}
          </button>
      } 
      {!accountVisible && !addMemberButton && <AccountNumber/>}
      <div>
      <div className="meals">
        {confirmWindowIsShown && <ConfirmWindow title={proofofPayment.title} name={proofofPayment.name} onClose={hideConfirmWindowHandler} />}
        {!submitted && (
          <Fragment>
            {addMemberButton && (
              <ProofForm onConfirm={SaveProof} onCancelMeal={MemberHandler} />
            )}
            {!addMemberButton && (
              <>
                <button className={classes.buttonAdd} onClick={MemberHandler}>
                  Submit the Recept/Proof Of Payment
                </button>

              </>
            )}
          </Fragment>
        )}


        { !addMemberButton && feedback && (myUser  && !myUser.email.endsWith("@tac-idwalalethu.com") | !myUser) && feedbackSubVisible &&
          <button className={classes.buttonAdd} onClick={FeedbackHandler}>
            {feedbackVisible ? "Feedback"  : "Submit"}
          </button>
        }
      
        {(!feedbackVisible && (myUser  && !myUser.email.endsWith("@tac-idwalalethu.com"))) && !addMemberButton && <FeedBack />}

        {myUser && myUser.email.endsWith("@tac-idwalalethu.com") && !addMemberButton && <Administrator/>}
      </div>
      
      </div>
      
    </div>
  );
};

export default SubmitProof;
