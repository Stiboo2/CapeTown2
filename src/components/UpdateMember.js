import React, { useState } from "react";
import UpdateMemberForm from "./UpdateMember/UpdateMemberForm";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../store/context";

const UpdateMember = () => {
  const { cart, editmember, setIsSubmitting } = useGlobalContext();
  const { id } = useParams();
  const memberS = Array.from(cart.entries()).map(([id, item]) => ({
    id,
    ...item,
  }));
  const memberIdToSearch = id.trim();
  const memberToFind = memberS.find((member) => member.id === memberIdToSearch); // Fixed the arrow function

  if (memberToFind) {
  } else {
    console.log("Member not found!");
  }

  const [data, setData] = useState(memberToFind);
  const handleUpdate = (updatedData) => {
    editmember(updatedData);
    setIsSubmitting(true);
  };
  return (
    <>
      <UpdateMemberForm data={data} onUpdate={handleUpdate} />
    </>
  );
};

export default UpdateMember;
