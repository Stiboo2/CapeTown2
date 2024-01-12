import { useState } from "react";
import classes from "./ImageUpload.module.css";
import { useGlobalContext } from "../../../store/context";
const ImageUpload = (props) => {
  const { setFlag } = useGlobalContext();
  const [IdPhoto, setIdPhoto] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showUploadeBtn, setIshowUploadeBtn] = useState(false);
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  const handleImageChange = (e) => {
    const selectedPhoto = e.target.files[0];
    setIdPhoto(selectedPhoto);
    setImagePreview(URL.createObjectURL(selectedPhoto));
    setIshowUploadeBtn(true);
    setFlag(true);
  };

  const uploadImage = async () => {
    setIsLoading(true);
    setIshowUploadeBtn(false);
    let imageURL;
    try {
      if (
        IdPhoto &&
        (IdPhoto.type === "image/png" || IdPhoto.type === "image/jpeg")
      ) {
        const imageFormData = new FormData();
        imageFormData.append("file", IdPhoto);
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
              {IdPhoto && <img src={imagePreview} alt="profileImage" />}
            </div>
          </div>
          <div className="--form-control">
            <div>
              <div>
                <label>ID Photo:</label>
              </div>
              <input
                className={classes.imageinput}
                type="file"
                accept="image/png, image/jpeg"
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

export default ImageUpload;
