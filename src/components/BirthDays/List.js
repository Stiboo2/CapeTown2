import React from "react";
import "./BirthDay.css";

const List = ({ memberS, selectedMonth }) => {
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const groupByMonth = (members) => {
    const groupedMembers = {};
    members.forEach((member) => {
      const birthDate = new Date(member.birthday);
      const month = birthDate.toLocaleString("default", { month: "long" });
      if (!groupedMembers[month]) {
        groupedMembers[month] = [];
      }
      groupedMembers[month].push(member);
    });
    return groupedMembers;
  };

  const filteredMembers = selectedMonth
    ? memberS.filter((member) => {
        const birthDate = new Date(member.birthday);
        const month = birthDate.toLocaleString("default", { month: "long" });
        return month === selectedMonth;
      })
    : memberS;

  const groupedMembers = groupByMonth(filteredMembers);

  return (
    <>
      {Object.keys(groupedMembers).map((month) => (
        <div key={month}>
          <h3>{month}</h3>
          {groupedMembers[month].map((member) => {
            const { id, surname, birthday, img } = member;
            const age = calculateAge(birthday);
            return (
              <article key={id} className="person">
                <img src={img} alt={surname} />
                <div>
                  <h4>{surname}</h4>
                  <p>Date of Birth: {birthday}</p>
                  <p>Age: {age} years</p>
                </div>
              </article>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default List;
