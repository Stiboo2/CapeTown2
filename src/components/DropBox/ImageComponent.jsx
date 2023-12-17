import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ImageComponent.module.css"; // Import the CSS module

const ImageComponent = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchImage = async () => {
        try {
          const apiEndpoint = process.env.REACT_APP_API_BASE_URL;
          const response = await fetch(`${apiEndpoint}/payments/${id}.json`);

          if (!response.ok) {
            throw new Error(`Failed to fetch image ID ${id}`);
          }

          const imageData = await response.json();

          if (imageData && imageData.image) {
            setImage(imageData.image);
          } else {
            console.error(`Image data or image URL missing for ID: ${id}`);
          }
        } catch (error) {
          console.error(error.message);
        }
      };

      fetchImage();
    } else {
      console.error("Invalid ID or missing 'id' parameter");
    }
  }, [id]);

  return (
    <div className={styles.Imagecontainer}>
      <div>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
      <h2>Image Details</h2>
      {image ? (
        <img src={image} alt="" className={`${styles.image} ${styles.cardSize}`} />
      
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default ImageComponent;
