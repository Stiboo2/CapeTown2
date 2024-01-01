import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import classes from "./CashBook.module.css"; // Adjust the import path
import UploadCashBook from "./CashBookAttachment/UploadCashBook";

const CashBook = () => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  const folder = process.env.REACT_APP_CLOUDINARY_CLOUD_FOLDER_TAC;
  const dynamicValue = "hkj7nwjctabyzrsvhtbj";
  const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/v1700912962/${folder}/${dynamicValue}.png`;
  const [selectedOtherOptions, setSelectedOtherOptions] = useState(false);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotBackFromLoadingImage, setIsNotBackFromLoadingImage] =
    useState(true);
  const [imageSuccefullySend, SetImageSuccefullySend] = useState(false);
  const [isAttachment, setIsAttachment] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [imageInputURL, setImageInputURL] = useState("");
  const [branch, setBranch] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [spender, setSpender] = useState("");
  const [signBy, setSignBy] = useState("");
  const [options, setOptions] = useState("");

  useEffect(() => {
    if (selectedOptions.includes("Other")) {
      // Remove "Other" from selectedOptions
      const updatedOptions = selectedOptions.filter(
        (option) => option !== "Other"
      );

      // Append otherInputValue with a comma if it is not empty
      const comma = otherInputValue.trim() !== "" ? "," : "";
      const Option = updatedOptions.join(",") + comma + otherInputValue;

      // Update the options state
      setOptions(Option);
    } else {
      // "Other" is not present, use selectedOptions.join(",")
      setOptions(selectedOptions.join(","));
    }
  }, [selectedOptions, otherInputValue]);

  useEffect(() => {
    // Get today's date in the format "YYYY-MM-DD"
    const formattedDate = new Date().toISOString().split("T")[0];
    setSelectedDate(formattedDate);
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };
  const handleOptionChange = (e) => {
    const option = e.target.value;

    if (option === "Other") {
      // Toggle the input field for "Other" when selected
      setSelectedOtherOptions((prev) => !prev);
    }
    // If the option is not "Other", handle as before
    if (selectedOptions.includes(option)) {
      setSelectedOptions(
        selectedOptions.filter((selected) => selected !== option)
      );
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };
  const handleOtherInputChange = (e) => {
    // Update the value of the "Other" input field
    setOtherInputValue(e.target.value);
  };
  const submitHandler = async () => {
    console.log("submitHandler ");
    try {
      console.log("in side ");
      if (isAttachment) {
        await uploadImage();
      }
      console.log("after try ");

      if (!isAttachment || (isAttachment && imageSuccefullySend)) {
        // Prepare the data to be sent to the database
        const formData = {
          selectedProvince,
          selectedDate,
          imageInputURL: isAttachment ? imageInputURL : "", // Use the uploaded image URL if available
          branch,
          receivedBy,
          spender,
          signBy,
          options,
        };

        // Send formData to the "recipts" database
        const parentNode = "recipts";
        const apiEndpoint = process.env.REACT_APP_API_BASE_URL;
        const random_id = uuidv4(); // Generate a unique ID
        console.log(formData);
        const response = await fetch(
          `${apiEndpoint}/${parentNode}/${random_id}.json`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              // Add any other headers as needed
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          // Handle success (e.g., show a success message)
          console.log("Data sent to the recipts database successfully!");
          // You may also show your success message or navigate to another page.
          // SetMessageWindowIsShown(true);
        } else {
          // Handle failure (e.g., show an error message)
          console.error("Failed to send data to the recipts database");
        }
      } else {
        console.log("Data was not sent to the recipts database !!!!!!!!!!!!");
      }
    } catch (error) {
      // Handle any unexpected errors during the process
      console.error("An error occurred:", error);
    }
  };

  const imageUploadedHandler = (LoadedImage) => {
    setImage(LoadedImage);
    setIsAttachment(true);
  };
  const uploadImage = async () => {
    setIsLoading(true);
    let imageURL;
    try {
      if (
        image &&
        (image.type === "image/png" ||
          image.type === "image/jpeg" ||
          image.type === "application/pdf")
      ) {
        const imageFormData = new FormData();
        imageFormData.append("file", image);
        imageFormData.append("cloud_name", cloudName);
        imageFormData.append("upload_preset", uploadPreset);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "post",
            body: imageFormData,
          }
        );

        const imgData = await response.json();
        imageURL = imgData.url.toString();

        // setImagePreview(null);
      }
      setImageInputURL(imageURL);
      SetImageSuccefullySend(true);
    } catch (error) {
      SetImageSuccefullySend(false);
      console.log(error);
    }

    setIsLoading(false);
    setIsNotBackFromLoadingImage(false);
  };
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
  };
  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };
  const handleReceivedByChange = (event) => {
    setReceivedBy(event.target.value);
  };
  const handleSpenderChange = (event) => {
    setSpender(event.target.value);
  };

  const handleSignByChange = (event) => {
    setSignBy(event.target.value);
  };
  return (
    <div className={classes.container}>
      <div className={classes.mainBox}>
        <div className={classes.firstRows}>
          <div className={classes.imageContainer}>
            <img src={imageUrl} alt="Church" className={classes.image} />
          </div>

          <div className={classes.address}>
            <div className={classes.addressText}>ADDRESS</div>
            <div className={classes.addressTextdetails}>
              Office 117, Cromton Street, Abbour House
            </div>
            <div className={classes.addressTextdetails}>
              Pinetown KZN, South Africa, 3600
            </div>
          </div>

          <div className={classes.receiptNumber}>123456789</div>
        </div>

        <div className={classes.secondRow}>
          <div className={classes.receivedFromLabel}>RECEIVED FROM : </div>
          <select
            id="province"
            className={classes.provinceControlClasses}
            value={selectedProvince}
            onChange={handleProvinceChange}
          >
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
          <input
            type="text"
            id="Branch"
            placeholder="Branch"
            className={classes.input}
            value={branch}
            onChange={handleBranchChange}
          />
        </div>

        <div className={classes.thirdRow}>
          <span className={classes.receivedFromLabel}>EXPENDITURE: </span>

          <label>
            <input
              type="checkbox"
              value="Rent"
              checked={selectedOptions.includes("Rent")}
              onChange={handleOptionChange}
            />
            Rent
          </label>

          <label>
            <input
              type="checkbox"
              value="HolyCommunion"
              checked={selectedOptions.includes("HolyCommunion")}
              onChange={handleOptionChange}
            />
            Holy Communion
          </label>

          <label>
            <input
              type="checkbox"
              value="Transport"
              checked={selectedOptions.includes("Transport")}
              onChange={handleOptionChange}
            />
            Transport
          </label>

          <label>
            <input
              type="checkbox"
              value="Other"
              checked={
                selectedOptions.includes("Other") || selectedOtherOptions
              }
              onChange={handleOptionChange}
            />
            Other
          </label>
          <label className={classes.receivedFromLabel} htmlFor="date">
            Date:
          </label>
          <input
            className={classes.date}
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        {selectedOtherOptions && (
          <input
            type="text"
            id="Other"
            placeholder="Please specify"
            className={classes.input}
            value={otherInputValue}
            onChange={handleOtherInputChange}
          />
        )}
        <div className={classes.fourthRow}>
          <span className={classes.receivedFromLabel}>RECIEVED BY : </span>
          <input
            type="text"
            id="sign_by"
            placeholder="High Authority"
            className={classes.input}
            value={signBy}
            onChange={handleSignByChange}
          />
          <span className={classes.receivedFromLabel}>SIGN BY : </span>
          <input
            type="text"
            id="spender"
            placeholder="Spender"
            className={classes.input}
            value={spender}
            onChange={handleSpenderChange}
          />
        </div>
        {selectedOptions.length > 0 && (
          <p>
            Selected Options:{" "}
            {selectedOptions.includes("Other")
              ? selectedOptions
                  .filter((option) => option !== "Other")
                  .join(", ")
              : selectedOptions.join(", ")}
            {selectedOptions.includes("Other") && `, Other: ${otherInputValue}`}
            <span className={classes.amount}>
              AMOUNT :<span style={{ color: "black" }}>R</span>
              <input
                type="text"
                id="recieved_by"
                placeholder="0.00"
                className={classes.inputAmount}
                value={receivedBy}
                onChange={handleReceivedByChange}
              />
            </span>
          </p>
        )}
      </div>
      <UploadCashBook onImageUploaded={imageUploadedHandler} />

      {isLoading ? (
        <p>Uploading...</p>
      ) : (
        <button onClick={submitHandler} className={classes.imageSave}>
          Submit
        </button>
      )}
    </div>
  );
};

export default CashBook;
