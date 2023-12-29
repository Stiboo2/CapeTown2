import React, { Fragment, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [accountVisible, setAccountVisible] = useState(true);
  const [confirmWindowIsShown, setConfirmWindowIsShown] = useState(false);
  const [messageWindowIsShown, SetMessageWindowIsShown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackSubVisible, setFeedbackSubVisible] = useState(true);
  const [feedbackCount, setFeedbackCount] = useState(false);
  const [exportedMessage, setExportedMessage] = useState(null);
  const [submitMessage, setSubmitMessage] = useState(false);

  const MemberHandler = () => {
    setAddMemberButton(!addMemberButton);
    setFeedback(true);
    setFeedbackVisible(false);
  };

  const SaveProof = (ProofofPayment) => {
    setProofofPayment(ProofofPayment);
    MemberHandler();
    setFeedback(true);
    setFeedbackCount(false);
    setFeedbackSubVisible(false);
  };

  const handleFeedbackButtonClick = () => {
    if (feedbackCount) {
      setFeedbackSubVisible(false);
      setSubmitMessage(true);
      setFeedbackCount(false);
    } else {
      setFeedbackCount(true);
    }

    setFeedbackVisible((prevVisible) => !prevVisible);
  };

  const AccountHandler = () => {
    setAccountVisible((prevVisible) => !prevVisible);
  };
  const hideMessageWindowHandler = () => {
    SetMessageWindowIsShown(false);
  };
  const hideConfirmWindowHandler = () => {
    setConfirmWindowIsShown(false);
  };

  const handleExportedMessageChange = (newMessage) => {
    setExportedMessage(newMessage);
  };
  useEffect(() => {
    if (submitMessage && submitMessage.message !== "") {
      setIsLoading(true);
      const sendProofCloud = async () => {
        const parentNode = "paymentsComments";
        const apiEndpoint = process.env.REACT_APP_API_BASE_URL;
        const random_id = uuidv4(); // Generate a unique ID
        try {
          const response = await fetch(
            `${apiEndpoint}/${parentNode}/${random_id}.json`,
            {
              method: "PUT",
              body: JSON.stringify(exportedMessage),
            }
          );

          setIsLoading(false);

          if (response.ok) {
            SetMessageWindowIsShown(true);
          }

          if (!response.ok) {
            throw new Error("Sending Comments data failed.");
          }

          setIsSubmitting(false);
        } catch (error) {
          // Handle error
        }
      };

      sendProofCloud();
    }
  }, [submitMessage]);
  useEffect(() => {
    if (proofofPayment) {
      setIsLoading(true);
      const sendProofCloud = async () => {
        const parentNode = "payments";
        const apiEndpoint = process.env.REACT_APP_API_BASE_URL;
        try {
          const response = await fetch(
            `${apiEndpoint}/${parentNode}/${proofofPayment.id}.json`,
            {
              method: "PUT",
              body: JSON.stringify(proofofPayment),
            }
          );
          setIsLoading(false);
          if (response.ok) {
            setConfirmWindowIsShown(true);
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
      {isLoading && <CircularLoadingModal />}
      {!addMemberButton && (
        <button className={classes.buttonAdd} onClick={AccountHandler}>
          {accountVisible ? "Account Number" : "Got it"}
        </button>
      )}
      {!accountVisible && !addMemberButton && <AccountNumber />}
      <div>
        <div className="meals">
          {confirmWindowIsShown && (
            <ConfirmWindow
              firstMsg={"Thank You "}
              title={proofofPayment.title}
              name={proofofPayment.name}
              lastMsg={" for submiting your tithe"}
              onClose={hideConfirmWindowHandler}
            />
          )}
          {messageWindowIsShown && (
            <ConfirmWindow
              firstMsg={"Thank you"}
              title={""}
              name={""}
              lastMsg={" for your feedback"}
              onClose={hideMessageWindowHandler}
            />
          )}
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

          {!addMemberButton &&
            feedback &&
            myUser &&
            !myUser.email.endsWith("@tac-idwalalethu.com") | !myUser &&
            feedbackSubVisible && (
              <button
                className={classes.buttonAdd}
                onClick={handleFeedbackButtonClick}
              >
                {feedbackVisible ? "Submit" : "Feedback"}
              </button>
            )}
          {feedbackVisible &&
            myUser &&
            !myUser.email.endsWith("@tac-idwalalethu.com") &&
            !addMemberButton &&
            feedbackSubVisible && (
              <FeedBack onFeedbackSubmit={handleExportedMessageChange} />
            )}

          {myUser &&
            myUser.email.endsWith("@tac-idwalalethu.com") &&
            !addMemberButton && <Administrator />}
        </div>
      </div>
      <div>{LogIn && <LoginPage />}</div>
    </div>
  );
};

export default SubmitProof;
