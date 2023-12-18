import { useRef, useState } from "react";
import ImageUpload from "./ImageUpload";
import "./MemberForm.css";
import classes from "./MemberForm.module.css";

const isEmpty = (value) => value.trim() === "";
const isTenChars = (value) => /^\d{10}$/.test(value.trim());
const MemberForm = (props) => {
  const [imageInputRef, setImageInputRef] = useState("");
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    serviceYears: true,
    birthday: true,
    title: true,
    branch: true,
    sealed: true,
    cell: true,
    idNumber: true,
    homePlace: true,
    image: true,
  });

  const nameInputRef = useRef();
  const serviceYearsInputRef = useRef();
  const birthdayInputRef = useRef();
  const titleInputRef = useRef();
  const branchInputRef = useRef();
  const sealedInputRef = useRef();
  const cellInputRef = useRef();
  const idNumberInputRef = useRef();
  const homePlaceInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredserviceYears = serviceYearsInputRef.current.value;
    const enteredbirthday = birthdayInputRef.current.value;
    const enteredtitle = titleInputRef.current.value;
    const enteredbranch = branchInputRef.current.value;
    const enteredsealed = sealedInputRef.current.value;
    const enteredCell = cellInputRef.current.value;
    const enteredIdNumber = idNumberInputRef.current.value;
    const enteredHomePlace = homePlaceInputRef.current.value;
    const enteredImage = imageInputRef;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredserviceYearsIsValid = !isEmpty(enteredName);
    const enteredbirthdayIsValid = !isEmpty(enteredbirthday);
    const enteredtitleIsValid = !isEmpty(enteredtitle);
    const enteredbranchIsValid = !isEmpty(enteredbranch);
    const enteredsealedIsValid = !isEmpty(enteredbranch);
    const enteredCellIsValid = isTenChars(enteredCell);
    const enteredIdNumberIsValid = true; // Always valid, regardless of input
    const enteredHomePlaceIsValid = true; // Always valid, regardless of input
    const enteredImageIsValid = !isEmpty(enteredImage);

    setFormInputsValidity({
      name: enteredNameIsValid,
      image: enteredImageIsValid,
      birthday: enteredbirthdayIsValid,
      title: enteredtitleIsValid,
      branch: enteredbranchIsValid,
      sealed: enteredsealedIsValid,
      cell: enteredCellIsValid,
      serviceYears: enteredserviceYearsIsValid,
      idNumber: enteredIdNumberIsValid,
      homePlace: enteredHomePlaceIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredImageIsValid &&
      enteredbirthdayIsValid &&
      enteredtitleIsValid &&
      enteredbranchIsValid &&
      enteredsealedIsValid &&
      enteredCellIsValid &&
      enteredserviceYearsIsValid &&
      enteredIdNumberIsValid &&
      enteredHomePlaceIsValid;

    if (!formIsValid) {
      return;
    } 

    props.onConfirm({
      name: enteredName,
      image: enteredImage,
      birthday: enteredbirthday,
      title: enteredtitle,
      branch: enteredbranch,
      sealed: enteredsealed,
      cell: enteredCell,
      serviceYears: enteredserviceYears,
      idNumber: enteredIdNumber,
      homePlace: enteredHomePlace,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;
  const serviceYearsControlClasses = `${classes.control} ${
    formInputsValidity.serviceYears ? "" : classes.invalid
  }`;
  const birthdayControlClasses = `${classes.control} ${
    formInputsValidity.birthday ? "" : classes.invalid
  }`;
  const titleControlClasses = `${classes.control} ${
    formInputsValidity.title ? "" : classes.invalid
  }`;
  const branchControlClasses = `${classes.control} ${
    formInputsValidity.branch ? "" : classes.invalid
  }`;
  const sealedControlClasses = `${classes.control} ${
    formInputsValidity.sealed ? "" : classes.invalid
  }`;

  const cellControlClasses = `${classes.control} ${
    formInputsValidity.cell ? "" : classes.invalid
  }`;
  const idNumberControlClasses = `${classes.control} ${
    formInputsValidity.idNumber ? "" : classes.invalid
  }`;
  const homePlaceControlClasses = `${classes.control} ${
    formInputsValidity.homePlace ? "" : classes.invalid
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
      <ImageUpload onImageUpload={imageUploadHandler} />
      <div className={nameControlClasses}>
        <label htmlFor="name">Name and Surname</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && (
          <p className={classes.redParagraph}>Please enter a valid name!</p>
        )}
      </div>
      <div className={serviceYearsControlClasses}>
        <label htmlFor="serviceYears">Number of years</label>
        <div className="custom-select">
          <select id="serviceYears" ref={serviceYearsInputRef} defaultValue="">
            <option value="" disabled>
              Select a number of years
            </option>
            {[...Array(100).keys()].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <div className="arrow"></div>
        </div>
        {!formInputsValidity.serviceYears && (
          <p className={classes.redParagraph}>
            Please select a valid number of years!
          </p>
        )}
      </div>

      <div className={birthdayControlClasses}>
        <label htmlFor="birthday">Birthday</label>
        <input type="date" id="birthday" ref={birthdayInputRef} />
        {!formInputsValidity.birthday && (
          <p className={classes.redParagraph}>Please enter a valid birthday!</p>
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
      <div className={idNumberControlClasses}>
        <label htmlFor="idNumber">ID Number</label>
        <input type="text" id="idNumber" ref={idNumberInputRef} />
        {!formInputsValidity.idNumber && (
          <p className={classes.redParagraph}>
            Please enter a valid ID number!
          </p>
        )}
      </div>
      <div className={homePlaceControlClasses}>
        <label htmlFor="homePlace">Your Born Home Place</label>
        <input type="text" id="homePlace" ref={homePlaceInputRef} />
        {!formInputsValidity.homePlace && (
          <p className={classes.redParagraph}>
            Please enter a valid HomePlace!
          </p>
        )}
      </div>

      <div className={titleControlClasses}>
        <label htmlFor="title">Title</label>
        <div className="custom-select">
          <select id="title" ref={titleInputRef}>
            <option value="">Select Title</option>
            <option value="Dade">Dade</option>
            <option value="Mzalwane">Mzalwane</option>
            <option value="Baba Priest">Baba Priest</option>
            <option value="Mama Mshumayeli">Mama Mshumayeli</option>
          </select>
          <div className="arrow"></div>
        </div>
        {!formInputsValidity.title && (
          <p className={classes.redParagraph}>
            Please select a valid option for the title!
          </p>
        )}
      </div>
      <div className={branchControlClasses}>
        <label htmlFor="postal">Branch</label>
        <div className="custom-select">
          <select id="postal" ref={branchInputRef}>
            <option value="">Select Branch</option>
            <option value="Dunoon">Dunoon</option>
            <option value="Paarl">Paarl</option>
            <option value="Mfuleni">Mfuleni</option>
            <option value="Caprocon">Caprocon</option>
          </select>
          <div className="arrow"></div>
        </div>
        {!formInputsValidity.branch && (
          <p className={classes.redParagraph}>Please select a valid branch!</p>
        )}
      </div>
      <div className={sealedControlClasses}>
        <label htmlFor="sealed">Old Memeber</label>
        <div className="custom-select">
          <select id="sealed" ref={sealedInputRef}>
            <option value="">Yes/No</option>
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
          <div className="arrow"></div>
        </div>
        {!formInputsValidity.sealed && (
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

export default MemberForm;
