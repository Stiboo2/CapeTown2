const Popup = () => {
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`popup ${showPopup ? "show" : ""}`}>
      <p>This is a popup message!</p>
      <button onClick={closePopup}>Close</button>
    </div>
  );
};
