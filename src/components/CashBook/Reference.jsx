import React, { useState, useEffect } from "react";
import ValidHoldComponent from "./ValidHoldComponent";

const Reference = (props) => {
  const [receipts, setReceipts] = useState([]);
  const [next, setNext] = useState(false);
  const [newSessionId, setNewSessionId] = useState(
    "thradebe@tac-idwalalethu.com"
  );
  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const response = await fetch(
          "https://tac-capetown-default-rtdb.firebaseio.com/reference.json"
        );

        if (!response.ok) {
          console.error("Failed to fetch receipts data");
          return;
        }

        const data = await response.json();

        if (data) {
          const receiptsArray = Object.values(data);
          setReceipts(receiptsArray);
          console.log("Fetched Reference Data:", data);
        }
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };

    fetchReceipts();
  }, []); // Empty dependency array to ensure the effect runs only once on component mount

  // Replace with actual new session ID

  const findValidHold = () => {
    const firstCondition = (receipt) =>
      receipt.status === "hold" && receipt.holderSessionId === newSessionId;
    const secondCondition = (receipt) =>
      receipt.status === "hold" &&
      receipt.holdExpiration !== null &&
      Date.now() > receipt.holdExpiration;

    // Find the receipt based on the first condition
    let result = receipts.find(firstCondition);

    // If not found, find the receipt based on the second condition
    if (!result) {
      result = receipts.find(secondCondition);
    }

    return result;
  };
  const reassignReference = (validHold) => {
    console.log(`Releasing old session: ${validHold.holderSessionId}`);
    validHold.status = "hold";
    validHold.holderSessionId = newSessionId;
    const newExpirationTime = Date.now() + 2 * 60 * 1000; // 2 minutes in milliseconds
    validHold.holdExpiration = newExpirationTime;
    console.log(
      `Assigned old session: ${validHold.holderSessionId} to reference: ${validHold.reference}`
    );
    console.log(`New expiration time: ${new Date(newExpirationTime)}`);
    console.log("Reassigned Reference:", validHold.reference);
    // Update setReceipts
    setReceipts((prevReceipts) =>
      prevReceipts.map((receipt) =>
        receipt.reference === validHold.reference ? validHold : receipt
      )
    );
    console.log("After Allocated new receipts array", receipts);
  };
  useEffect(() => {
    const handleAllocateReference = () => {
      const validHold = findValidHold();

      if (validHold) {
        reassignReference(validHold);
      } else {
        console.log(
          "All receipt IDs:",
          receipts.map((receipt) => receipt.reference)
        );

        const maxReceiptId = Math.max(
          ...receipts.map((receipt) => parseInt(receipt.reference.slice(4)))
        );

        console.log("maxReceiptId", maxReceiptId);
        const newReceipt = {
          reference: `TAC-${maxReceiptId + 1}`,
          status: "hold",
          holderSessionId: newSessionId,
          holdExpiration: Date.now() + 2 * 60 * 1000, // Assuming 2 minutes expiration time
        };

        // Use the callback provided by setReceipts to ensure you have the latest state
        setReceipts((prevReceipts) => [...prevReceipts, newReceipt]);

        console.log("After Allocated new receipts array", [
          ...receipts,
          newReceipt,
        ]);

        // Use the callback provided by setReceipts to ensure you have the latest state
        setReceipts((updatedReceipts) => {
          const allocatedReferenceData = updatedReceipts.find(
            (receipt) =>
              receipt.holderSessionId === newSessionId &&
              receipt.status === "hold"
          );
          if (allocatedReferenceData) {
            console.log(allocatedReferenceData);
            props.onReference(allocatedReferenceData.reference);
          }

          const allocatedReference = allocatedReferenceData.reference;
          console.log(allocatedReference);

          // Log the array of newSessionId values
          console.log(updatedReceipts);

          // Call the onReference prop with the reference
          props.onReference(allocatedReference);

          return updatedReceipts;
        });
      }
    };
    handleAllocateReference();
    console.log("props.change", props.change);
  }, [props.change]); // Add props.change to the dependency array

  // ... (existing return statement and component logic)

  return <div></div>;
};

export default Reference;
