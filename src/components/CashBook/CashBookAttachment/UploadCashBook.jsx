import { useState } from "react";
import classes from "./UploadCashBook.module.css";
import { useGlobalContext } from "../../../store/context";
const UploadCashBook = (props) => {
  const { setFlagProof } = useGlobalContext();
  const [ProofPic, setProofPic] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadeBtn, setIshowUploadeBtn] = useState(false);
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleImageChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setProofPic(selectedPhoto);
    setImagePreview(URL.createObjectURL(selectedPhoto));
    setIshowUploadeBtn(true);
    setFlagProof(true);
  };

  const uploadImage = async () => {
    setIsLoading(true);
    setIshowUploadeBtn(false);
    let imageURL;
    try {
      if (
        ProofPic &&
        (ProofPic.type === "image/png" ||
          ProofPic.type === "image/jpeg" ||
          ProofPic.type === "application/pdf")
      ) {
        const imageFormData = new FormData();
        imageFormData.append("file", ProofPic);
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
      props.onImageUpload(imageURL);
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <section className="--flex-center">
      <div className="container">
        <div className={classes.imageCard}>
          <div className={classes["profile-photo"]}>
            <div>
              {ProofPic && <img src={imagePreview} alt="profileImage" />}
            </div>
          </div>
          <div className="--form-control">
            <div>
              <div>
                <label>Proof of Purchase :</label>
              </div>
              <input
                className={classes.imageinput}
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                name="image"
                onChange={handleImageChange}
              />
            </div>
            <div>
              {isLoading
                ? "Uploading..."
                : showUploadeBtn && (
                    <button onClick={uploadImage} className={classes.imageSave}>
                      Upload Image
                    </button>
                  )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadCashBook;
