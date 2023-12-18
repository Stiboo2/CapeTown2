import React, { useState } from "react";
import { Link } from "react-router-dom";
import classes from "./UpdateMemberForm.module.css";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../Meals/Data/ImageUpload";
import { useGlobalContext } from "../../store/context";
import Warning from "../UI/Warning";
const UpdateMemberForm = ({ data, onUpdate }) => {
  const { setFlag, flag } = useGlobalContext();
  const [showWarningSmg, setShowWarningSmg] = useState(false);
  const [imageInput, setImageInput] = useState(data.img);
  const [title, setTitle] = useState(data.title);
  const [surname, setSurname] = useState(data.surname);
  const [cell, setCell] = useState(data.cell);
  const [idNumber, setTdNumber] = useState(data.idNumber);
  const [img, setImg] = useState(data.img);
  const [branch, setbranch] = useState(data.branch);
  const [amount, setAmount] = useState(data.amount);
  const [active, setActive] = useState(data.active);
  const [sealed, setSealed] = useState(data.sealed);
  const [birthday, setBirthday] = useState(data.birthday);
  const [serviceYears, setServiceYears] = useState(data.serviceYears);
  const [homePlace, setHomePlace] = useState(data.homePlace);
  const navigate = useNavigate();

  const FirstHandleSubmit = (e) => {
    e.preventDefault();
    if (flag) {
      setShowWarningSmg(true);
    } else {
      SecondHandleSubmit();
    }
  };
  const SecondHandleSubmit = () => {
    const updatedData = {
      ...data,
      title,
      surname,
      cell,
      idNumber,
      img,
      branch,
      amount,
      active,
      sealed,
      birthday,
      serviceYears,
      homePlace,
    };

    onUpdate(updatedData);
    navigate("/churchDataBase");
  };
  const imageUploadHandler = (imageURL) => {
    setImageInput(imageURL);
    setImg(imageURL);
    setFlag(false);
  };
  const valueWarningHandler = (status) => {
    setShowWarningSmg(false);
    if (status) {
      setFlag(false);
      SecondHandleSubmit();
    }
  };

  return (
    <div>
      {showWarningSmg && <Warning onClose={valueWarningHandler} />}
      <form className={classes.EditFormMaim} onSubmit={FirstHandleSubmit}>
        <div className={classes.EditForm}>
          <div className={classes.ImageContainer}>
            <img src={imageInput} alt="Your Image" className={classes.Image} />
          </div>
          <ImageUpload onImageUpload={imageUploadHandler} />
          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Title : </label>
            <select
              className={classes.TitleInputEdit}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select a title</option>
              <option value="Dade">Dade</option>
              <option value="Mzalwane">Mzalwane</option>
              <option value="Baba Mshumayeli">Baba Mshumayeli</option>
              <option value="Baba Priest">Baba Priest</option>
              <option value="Baba Oster">Baba Oster</option>
              <option value="Baba District">Baba District</option>
              <option value="Baba Ovarsea">Baba Ovarsea</option>
              <option value="Baba Mpostoli">Baba Mpostoli</option>
              <option value="Mama Mshumayeli">Mama Mshumayeli</option>
              <option value="Mama Priest">Mama Priest</option>
              <option value="Mama Oster">Mama Oster</option>
              <option value="Mama District">Mama District</option>
              <option value="Mama Ovarsea">Mama Ovarsea</option>
              <option value="Mama Mpostoli">Mama Mpostoli</option>
            </select>
          </div>

          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Surname : </label>
            <input
              className={classes.SurnameInputEdit}
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <br />
          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Cell Number : </label>
            <input
              className={classes.CellInputEdit}
              type="text"
              value={cell}
              onChange={(e) => setCell(e.target.value)}
            />
          </div>
          <br />
          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Id Number : </label>
            <input
              className={classes.IdNumberInputEdit}
              type="nummber"
              value={idNumber}
              onChange={(e) => setTdNumber(e.target.value)}
            />
          </div>
          <br />
          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Image : </label>

            <input
              className={classes.ImageInputEdit}
              type="text"
              value={imageInput}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>

          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Branch : </label>
            <select
              className={classes.BranchInputEdit}
              value={branch}
              onChange={(e) => setbranch(e.target.value)}
            >
              <option value="">Select a branch</option>
              <option value="Dunoon">Dunoon</option>
              <option value="Paarl">Paarl</option>
              <option value="Capricon">Capricon</option>
              <option value="Mfuleni">Mfuleni</option>
              <option value="Strand">Strand</option>
              <option value="Greenpark">Greenpark</option>
              <option value="Delf">Delf</option>
              <option value="Khayelisha">Khayelisha</option>
            </select>
          </div>

          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Amount : </label>
            <input
              className={classes.AmountInputEdit}
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Active : </label>
            <select
              className={classes.ActiveInputEdit}
              value={active}
              onChange={(e) => setActive(e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Sealed : </label>
            <select
              className={classes.SeaInputEdit}
              value={sealed}
              onChange={(e) => setSealed(e.target.value)}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className={classes.lineUpText}>
            <label className={classes.labelEdit}>Birthday : </label>
            <input
              className={classes.BirthdayInputEdit}
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div className={classes.lineUpText}>
            <label htmlFor="serviceYears">Number of years : </label>
            <div className={classes["custom-select"]}>
              <select
                id="serviceYears"
                value={serviceYears}
                onChange={(e) => setServiceYears(e.target.value)}
              >
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
          </div>
          <label className={classes.labelEdit}>
            <label> HomePlace : </label>
            <input
              className={classes.HomePlacenputEdit}
              type="text"
              value={homePlace}
              onChange={(e) => setHomePlace(e.target.value)}
            />
          </label>
          <br />
          <div className={classes.EditbuttonItem}>
            <button className={classes.buttonUpdate} type="submit">
              Update
            </button>
            <div>
              <Link className={classes.buttonBack} to="../churchDataBase">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateMemberForm;
