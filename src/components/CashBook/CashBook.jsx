import React, { useState, useEffect  } from 'react';
import classes from './CashBook.module.css'; // Adjust the import path

const CashBook = () => {
  const imageUrl = 'https://res.cloudinary.com/dkayrcyeb/image/upload/v1700912962/church/hkj7nwjctabyzrsvhtbj.png';
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedOtherOptions, setSelectedOtherOptions] = useState(false);
  const [otherInputValue, setOtherInputValue] = useState('');
  
  const handleOptionChange = (e) => {
    const option = e.target.value;

    if (option === 'Other') {
      // Toggle the input field for "Other" when selected
      setSelectedOtherOptions((prev) => !prev);
       } 
      // If the option is not "Other", handle as before
      if (selectedOptions.includes(option)) {
        setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
    
  };
  const handleOtherInputChange = (e) => {
    // Update the value of the "Other" input field
    setOtherInputValue(e.target.value);
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
            <div className={classes.addressTextdetails}>Office 117, Cromton Street, Abbour House</div>
            <div className={classes.addressTextdetails}>Pinetown KZN, South Africa, 3600</div>
          </div>

          <div className={classes.receiptNumber}>123456789</div>
        </div>

        <div className={classes.secondRow}>
          <div className={classes.receivedFromLabel}>RECEIVED FROM : </div>
          <select id="province" className={classes.provinceControlClasses}>
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
          <input type="text" id="Branch" placeholder="Branch" className={classes.input} />
        </div>

        <div className={classes.thirdRow}>
          <span className={classes.receivedFromLabel}>EXPENDITURE: </span>

          <label>
            <input
              type="checkbox"
              value="Rent"
              checked={selectedOptions.includes('Rent')}
              onChange={handleOptionChange}
            />
            Rent
          </label>

          <label>
            <input
              type="checkbox"
              value="HolyCommunion"
              checked={selectedOptions.includes('HolyCommunion')}
              onChange={handleOptionChange}
            />
            Holy Communion
          </label>

          <label>
            <input
              type="checkbox"
              value="Transport"
              checked={selectedOptions.includes('Transport')}
              onChange={handleOptionChange}
            />
            Transport
          </label>

          <label>
            <input
              type="checkbox"
              value="Other"
              checked={selectedOptions.includes('Other') || selectedOtherOptions}
              onChange={handleOptionChange}
            />
            Other
          </label>
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
          <span className={classes.receivedFromLabel}>RECIEVED BY :   </span>
          <input type="text" id="Branch" placeholder="Branch" className={classes.input} />
          <span className={classes.receivedFromLabel}>SIGN BY :   </span>
          <input type="text" id="Branch" placeholder="Branch" className={classes.input} />
        </div>
        {selectedOptions.length > 0 && (
          <p>
            Selected Options: {selectedOptions.includes('Other') ? selectedOptions.filter(option => option !== 'Other').join(', ') : selectedOptions.join(', ')}
            {selectedOptions.includes('Other') && `, Other: ${otherInputValue}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default CashBook;