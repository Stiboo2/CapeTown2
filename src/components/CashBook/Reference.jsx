import React, { useState, useEffect } from "react";
import { get, ref } from "firebase/database";
import { database } from "../../LoginPage/firebase-config";

const Reference = (props) => {
  const [receipts, setReceipts] = useState([]);
  const [foundRef, setFoundRef] = useState(false);
  const [newSessionId, setNewSessionId] = useState(
    "thradebe@tac-idwalalethu.com"
  );

  const fetchPayments = async () => {
    try {
      const usersRef = ref(database, "reference");

      const snapshot = await get(usersRef);

      if (snapshot.exists()) {
        const refArray = Object.entries(snapshot.val()).map(([id, data]) => ({
          id,
          ...data,
        }));

        setReceipts(refArray);
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const executeEffects = async () => {
    await fetchPayments();
    setTimeout(() => {
      handleAllocateReference();
    }, 1000);
  };

  useEffect(() => {
    executeEffects();
  }, []); // Add dependencies if needed

  const findValidHold = () => {
    const firstCondition = (receipt) =>
      receipt.status === "hold" && receipt.holderSessionId === newSessionId;
    const secondCondition = (receipt) =>
      receipt.status === "hold" &&
      receipt.holdExpiration !== null &&
      Date.now() > receipt.holdExpiration;
    let result;
    setReceipts((prevReceipts) => {
      console.log("receipts", prevReceipts);

      result = prevReceipts.some(firstCondition);
      console.log("result firstCondition", result);

      if (!result) {
        console.log("try secondCondition");
        result = prevReceipts.some(secondCondition);
      }

      console.log("result inside secondCondition", result);
      return prevReceipts;
    });
    setReceipts((updatedReceipts) => {
      const allocatedReferenceData = updatedReceipts.find(
        (receipt) =>
          receipt.holderSessionId === newSessionId && receipt.status === "hold"
      );
      if (allocatedReferenceData) {
        setFoundRef(true);
        result = allocatedReferenceData;
        console.log(
          "result inside allocatedReferenceData",
          allocatedReferenceData
        );
      }

      return updatedReceipts;
    });
    console.log("result outside", result);
    return result;
  };

  const reassignReference = (validHold) => {
    validHold.status = "hold";
    validHold.holderSessionId = newSessionId;
    const newExpirationTime = Date.now() + 2 * 60 * 1000; // 2 minutes in milliseconds
    validHold.holdExpiration = newExpirationTime;
    console.log(
      `Assigned old session: ${validHold.holderSessionId} to reference: ${validHold.reference}`
    );

    setReceipts((prevReceipts) =>
      prevReceipts.map((receipt) =>
        receipt.reference === validHold.reference ? validHold : receipt
      )
    );
  };

  const handleAllocateReference = () => {
    const validHold = findValidHold();
    console.log("validHold", validHold);
    console.log("foundRef", foundRef);

    if (foundRef) {
      console.log("IT WILL REPLACE THE REF");
      reassignReference(validHold);
    } else {
      console.log("IT WILL CREATE A NEW REF");

      setReceipts((prevReceipts) => {
        const maxReceiptId = Math.max(
          ...prevReceipts.map((receipt) => parseInt(receipt.reference.slice(4)))
        );

        console.log(
          "All receipt IDs:",
          prevReceipts.map((receipt) => receipt.reference)
        );

        const newReceipt = {
          id: `TAC-${maxReceiptId + 1}`,
          holderSessionId: newSessionId,
          holdExpiration: Date.now() + 2 * 60 * 1000,
          reference: `TAC-${maxReceiptId + 1}`,
          status: "hold",
        };

        const newReceipts = [...prevReceipts, newReceipt];

        return newReceipts;
      });
    }

    setReceipts((updatedReceipts) => {
      const allocatedReferenceData = updatedReceipts.find(
        (receipt) =>
          receipt.holderSessionId === newSessionId && receipt.status === "hold"
      );
      if (allocatedReferenceData) {
        props.onReference(allocatedReferenceData.reference);
      }

      return updatedReceipts;
    });
  };

  return <div></div>; // Replace with your actual JSX content
};

export default Reference;
