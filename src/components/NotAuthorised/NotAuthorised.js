// UnauthorizedPage.js

import React from "react";
import { Link } from "react-router-dom";
import styles from "./UnauthorizedPage.module.css"; // Import the module.css file

const UnauthorizedPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>You Are Not Authorized</h1>
      <p className={styles.paragraph}>
        Sorry, but you do not have the necessary permissions to access the TAC
        DATABASE.
      </p>
      <p className={styles.paragraph}>Please contact Admin for rights.</p>

      <Link to="/" className={styles.link}>
        HOME
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
