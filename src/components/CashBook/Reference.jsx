import React, { useState, useEffect } from "react";
import { get, ref, push, set } from "firebase/database";
import { database } from "../../LoginPage/firebase-config";

const Reference = (props) => {
  const [receipts, setReceipts] = useState([]);
  const [newSessionId, setNewSessionId] = useState("thabo.radebe@live.com");
  const [dataSentToDatabase, setDataSentToDatabase] = useState(false);

  const fetchReference = async () => {
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
    await fetchReference();
    setTimeout(() => {
      handleAllocateReference();
    }, 10);
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

    let newReceipts;
    setReceipts((updatedReceipts) => {
      const allocatedReferenceData = updatedReceipts.find(
        (receipt) =>
          receipt.holderSessionId === newSessionId && receipt.status === "hold"
      );

      if (allocatedReferenceData) {
        result = allocatedReferenceData;
        console.log(
          "result inside allocatedReferenceData",
          allocatedReferenceData
        );
        console.log("result inside result", result);

        console.log("IT WILL REPLACE THE REF");

        allocatedReferenceData.status = "hold";
        allocatedReferenceData.holderSessionId = newSessionId;
        const newExpirationTime = Date.now() + 2 * 60 * 1000; // 2 minutes in milliseconds
        allocatedReferenceData.holdExpiration = newExpirationTime;
        console.log(
          `Assigned old session: ${allocatedReferenceData.holderSessionId} to reference: ${allocatedReferenceData.reference}`
        );
        console.log(
          "allocatedReferenceData reference",
          allocatedReferenceData.reference
        );
        newReceipts = [...updatedReceipts];
        newReceipts[newReceipts.indexOf(allocatedReferenceData)] =
          allocatedReferenceData;
      } else {
        console.log("IT WILL CREATE A NEW REF");
        const maxReceiptId = Math.max(
          ...updatedReceipts.map((receipt) =>
            parseInt(receipt.reference.slice(4))
          )
        );
        console.log("maxReceiptId", maxReceiptId);
        const newReceipt = {
          id: `TAC-${maxReceiptId + 1}`,
          holderSessionId: newSessionId,
          holdExpiration: Date.now() + 2 * 60 * 1000,
          reference: `TAC-${maxReceiptId + 1}`,
          status: "hold",
        };

        newReceipts = [...updatedReceipts, newReceipt];
      }

      console.log("After Allocated new receipts array", newReceipts);
      return newReceipts;
    });
    console.log("result outside", result);
  };

  const pushDataToDatabase = async (allocatedReferenceData) => {
    if (!dataSentToDatabase) {
      try {
        const referenceId = allocatedReferenceData.id; // Assuming 'id' is the unique identifier
        const referencePath = `reference/${referenceId}`;

        // Use set method to update or create data at the specific path
        await set(ref(database, referencePath), allocatedReferenceData);

        console.log(
          `Data successfully pushed to the database with reference key ${allocatedReferenceData.key}`
        );
        setDataSentToDatabase(true);
      } catch (error) {
        console.error(`Error pushing data to the database:`, error);
      }
    } else {
      console.log("Data hasn't changed. Skipping push to the database.");
    }
  };

  const handleAllocateReference = () => {
    findValidHold();

    setReceipts((updatedReceipts) => {
      const allocatedReferenceData = updatedReceipts.find(
        (receipt) =>
          receipt.holderSessionId === newSessionId && receipt.status === "hold"
      );
      if (allocatedReferenceData) {
        props.onReference(allocatedReferenceData.reference);
        pushDataToDatabase(allocatedReferenceData);
      }

      return updatedReceipts;
    });
  };

  return <div></div>; // Replace with your actual JSX content
};

export default Reference;
