// AccountNumber.jsx

import React from 'react';
import styles from './AccountNumber.module.css'; // Adjust the import path

const AccountNumber = () => {
  const imageUrl = 'https://res.cloudinary.com/dkayrcyeb/image/upload/v1701881007/church/AccountTAC_qtcmsn.jpg';

  return (
    <div className={styles.container}>
      <h2>Account Number</h2>
      <img src={imageUrl} alt="Church" className={styles.image} />
    </div>
  );
}

export default AccountNumber;
