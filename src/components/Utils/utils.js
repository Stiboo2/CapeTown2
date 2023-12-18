export const getTotals = (banch_date, branchs) => {
  let totalAmount = 0;
  let totalCost = 0;

  const newBranchs = new Map(branchs);
  const branchId = banch_date.church_branch_id;
  const branch = newBranchs.get(branchId);
  const date = banch_date.date;
  let branchName = null;
  let uBaba = null;
  let TotalAttend_amount = 0;
  let Day_attendance_cost = 0;
  if (branch) {
    let Day_attendance = null;
    branchName = branch.name;

    // Find the attendance record for the specified date
    branch.attendance.forEach((record) => {
      if (record.date === date) {
        Day_attendance = record;
      }
    });

    if (Day_attendance) {
      Day_attendance_cost = Day_attendance.total_absent;
      TotalAttend_amount = Day_attendance.total_attended;
    }

    switch (banch_date.pastor_id) {
      case "Baba Dlamini":
        uBaba = " Baba Dlamini";
        break;
      case "Baba Msiya":
        uBaba = " Baba Msiya";
        break;
      case "Baba Mkhize":
        uBaba = " Baba Mkhize";
        break;
      case "Baba Mkhabela":
        uBaba = " Baba Mkhabela";
        break;
      default:
        uBaba = "Unknown";
        break;
    }

    console.log(uBaba);
  }
  totalAmount = TotalAttend_amount;
  totalCost = Day_attendance_cost;

  return { totalAmount, totalCost, branchName, date, uBaba };
};
