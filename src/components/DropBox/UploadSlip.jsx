import React, { useState } from 'react';

const UploadSlip = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // You can implement the file upload logic here
    if (selectedFile) {
      console.log('Uploading file:', selectedFile);
      // Add your file upload logic (e.g., send to server)
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div>
      <h2>Upload Slip</h2>
      <input
        type="file"
        accept=".pdf, .jpg, .jpeg, .png" // Add the accepted file types
        onChange={handleFileChange}
      />
      {selectedFile && <button onClick={handleUpload}>Upload</button>}
    </div>
  );
};

export default UploadSlip;
