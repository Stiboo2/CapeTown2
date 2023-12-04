import { useRef, useState,useEffect } from "react";
import UploadProof from "./UploadProof";
import "./ProofForm.css";
import classes from "./ProofForm.module.css";
import { v4 as uuidv4 } from 'uuid';

const isEmpty = (value) => value.trim() === "";
const ProofForm = (props) => {
  useEffect(() => {
    // Autofill the current date
    const currentDate = new Date().toISOString().split('T')[0];
    if (dateInputRef.current) {
      dateInputRef.current.defaultValue = currentDate;
    }
  }, []);
  const [imageInputRef, setImageInputRef] = useState("");
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    serviceYears: true,
    date: true,
    title: true,
    branch: true,
    type: true,
    cell: true,
    amount: true,
    province: true,
    image: true,
  });

  const nameInputRef = useRef();
  const dateInputRef = useRef();
  const titleInputRef = useRef();
  const branchInputRef = useRef();
  const typeInputRef = useRef();
  const cellInputRef = useRef();
  const amountInputRef = useRef();
  const provinceInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
  
    const enteredName = nameInputRef.current ? nameInputRef.current.value : '';
    const entereddate = dateInputRef.current ? dateInputRef.current.value : '';
    const enteredtitle = titleInputRef.current ? titleInputRef.current.value : '';
    const enteredbranch = branchInputRef.current ? branchInputRef.current.value : '';
    const enteredtype = typeInputRef.current ? typeInputRef.current.value : '';
    const enteredCell = cellInputRef.current ? cellInputRef.current.value : '';
    const enteredamount = amountInputRef.current ? amountInputRef.current.value : '';
    const enteredprovince = provinceInputRef.current ? provinceInputRef.current.value : '';
    const enteredImage = imageInputRef;
  
    const enteredNameIsValid = !isEmpty(enteredName);
    const entereddateIsValid = !isEmpty(entereddate);
    const enteredtitleIsValid = !isEmpty(enteredtitle);
    const enteredbranchIsValid = !isEmpty(enteredbranch);
    const enteredtypeIsValid = !isEmpty(enteredtype);
    const enteredCellIsValid = true;
    const enteredamountIsValid = !isEmpty(enteredamount);
    const enteredprovinceIsValid = !isEmpty(enteredprovince);
    const enteredImageIsValid = !isEmpty(enteredImage);
  
    setFormInputsValidity({
      name: enteredNameIsValid,
      image: enteredImageIsValid,
      date: entereddateIsValid,
      title: enteredtitleIsValid,
      branch: enteredbranchIsValid,
      type: enteredtypeIsValid,
      cell: enteredCellIsValid,
      amount: enteredamountIsValid,
      province: enteredprovinceIsValid,
    });
  
    const formIsValid =
      enteredNameIsValid &&
      enteredImageIsValid &&
      entereddateIsValid &&
      enteredtitleIsValid &&
      enteredbranchIsValid &&
      enteredtypeIsValid &&
      enteredCellIsValid &&
      enteredamountIsValid &&
      enteredprovinceIsValid;
  
    if (!formIsValid) {
      return;
    }
  
    const uniqueId = uuidv4();
    props.onConfirm({
      id: uniqueId,
      name: enteredName,
      image: enteredImage,
      date: entereddate,
      title: enteredtitle,
      branch: enteredbranch,
      type: enteredtype,
      cell: enteredCell,
      amount: enteredamount,
      province: enteredprovince,
    });
  };
  
  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const dateControlClasses = `${classes.control} ${
    formInputsValidity.date ? "" : classes.invalid
  }`;
  const titleControlClasses = `${classes.control} ${
    formInputsValidity.title ? "" : classes.invalid
  }`;
  const branchControlClasses = `${classes.control} ${
    formInputsValidity.branch ? "" : classes.invalid
  }`;
  const typeControlClasses = `${classes.control} ${
    formInputsValidity.type ? "" : classes.invalid
  }`;

  const cellControlClasses = `${classes.control} ${
    formInputsValidity.cell ? "" : classes.invalid
  }`;
  const amountControlClasses = `${classes.control} ${
    formInputsValidity.amount ? "" : classes.invalid
  }`;
  const provinceControlClasses = `${classes.control} ${
    formInputsValidity.province ? "" : classes.invalid
  }`;
  const imageControlClasses = `${classes.control} ${
    formInputsValidity.image ? "" : classes.invalid
  }`;

  const cancelHandler = () => {
    props.onCancelMeal();
  };
  const imageUploadHandler = (imageURL) => {
    setImageInputRef(imageURL);
  };


  
  return (
    <form className={classes.forma} onSubmit={confirmHandler}>
      <UploadProof onImageUpload={imageUploadHandler} />

      <div className={titleControlClasses}>
        <label htmlFor="title">Title</label>
        <div className="custom-select">
          <select id="title" ref={titleInputRef}>
            <option value="">Select Title</option>
            <option value="Sister">Sister</option>
            <option value="Brother">Brother</option>
            <option value="Deacon">Deacon</option>
            <option value="Ma-Deacon">Ma-Deacon</option>
            <option value="Priest">Priest</option>
            <option value="Ma-Priest">Ma-Priest</option>
            <option value="Ouster">Ouster</option>
            <option value="Ma-Ouster">Ma-Ouster</option>
            <option value="District">District</option>
            <option value="Ma-District">Ma-District</option>
            <option value="Overseer">Overseer</option>
            <option value="Ma-Overseer">Ma-Overseer</option>
            <option value="Apostle">Apostle</option>
            <option value="Ma-Apostle">Ma-Apostle</option>
          </select>
          <div className="arrow"></div>
        </div>
        {!formInputsValidity.title && (
          <p className={classes.redParagraph}>
            Please select a valid option for the title!
          </p>
        )}
      </div>


      <div className={nameControlClasses}>
        <label htmlFor="name">Initials and Surname</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && (
          <p className={classes.redParagraph}>Please enter a valid name!</p>
        )}
      </div>
 

      <div className={dateControlClasses}>
        <label htmlFor="date">Date of Deposit</label>
        <input type="date" id="date" ref={dateInputRef} />
        {!formInputsValidity.date && (
          <p className={classes.redParagraph}>Please enter a valid date!</p>
        )}
      </div>

      <div className={cellControlClasses}>
        <label htmlFor="cell">Cell Number</label>
        <input type="text" id="cell" ref={cellInputRef} />
        {!formInputsValidity.cell && (
          <p className={classes.redParagraph}>
            Please enter a valid Cell Phone Number!
          </p>
        )}
      </div>
      <div className={amountControlClasses}>
        <label htmlFor="amount">Amount</label>
        <input type="text" id="amount" ref={amountInputRef} />
        {!formInputsValidity.amount && (
          <p className={classes.redParagraph}>
            Please enter a valid Amount!
          </p>
        )}
      </div>
      <div className={provinceControlClasses}>
  <label htmlFor="province">Province</label>
  <div className="custom-select">
    <select id="province" ref={provinceInputRef}>
      <option value="">Select Province</option>
      <option value="Eastern Cape">Eastern Cape</option>
      <option value="Free State">Free State</option>
      <option value="Gauteng">Gauteng</option>
      <option value="KwaZulu-Natal">KwaZulu-Natal</option>
      <option value="Limpopo">Limpopo</option>
      <option value="Mpumalanga">Mpumalanga</option>
      <option value="North West">North West</option>
      <option value="Northern Cape">Northern Cape</option>
      <option value="Western Cape">Western Cape</option>
    </select>
    <div className="arrow"></div>
  </div>
  {!formInputsValidity.province && (
    <p className={classes.redParagraph}>
      Please select a valid Province!
    </p>
  )}
</div>


     
      <div className={branchControlClasses}>
        <label htmlFor="branch">Branch</label>
        <input type="text" id="branch" ref={branchInputRef} />
        {!formInputsValidity.branch && (
          <p className={classes.redParagraph}>Please select a valid branch!</p>
        )}
      </div>

      <div className={typeControlClasses}>
        <label htmlFor="type">Individual or Bulk Deposit</label>
        <div className="custom-select">
          <select id="type" ref={typeInputRef}>
            <option value="">Choose</option>
            <option value="Individual">Individual</option>
            <option value="Bulk">Bulk</option>
          </select>
          <div className="arrow"></div>
        </div>
        {!formInputsValidity.type && (
          <p className={classes.redParagraph}>Choose if Old member or not</p>
        )}
      </div>
      <div className={imageControlClasses}>
        {!formInputsValidity.image && (
          <p className={classes.redParagraph}> Please Press upload button </p>
        )}
      </div>

      <div className={classes.actions}>
        <button
          type="button"
          className={classes.cancelButten}
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button className={classes.submitbutton}>Confirm</button>
      </div>
    </form>
  );
};

export default ProofForm;
