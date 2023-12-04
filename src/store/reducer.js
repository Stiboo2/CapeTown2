import { v4 as uuidv4 } from "uuid";
import {
  CLEAR_CART,
  REMOVE,
  REMOVE_MEMBER,
  INCREASE,
  DECREASE,
  DELETA,
  LOADING,
  DISPLAY_ITEMS,
  NEW_BRANCH_DATE,
  UPDATE_ATTENDANCE_RECORD,
  NOTIFICATION_DISPLAY,
  WARNING,
  REPLACE_MEMBERS_DATA,
  SUBMITING,
  FLAG,
  FLAGPROOF,
  BRANCH_NAME,
  RELOAD_MEMBERS,
  ADD_MEMBER,
  WANT_TO_LOG_IN,
  EDITMEMBER,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SUBMITING) {
    return { ...state, isSubmitting: action.payload.status };
  }
  if (action.type === FLAG) {
    return { ...state, flag: action.payload.value };
  }
  if (action.type === FLAGPROOF) {
    return { ...state, flagProof: action.payload.value };
  }
  if (action.type === WANT_TO_LOG_IN) {
    return { ...state, LogIn: action.payload.status };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: new Map() };
  }
  if (action.type === REMOVE) {
    const newCart = new Map(state.cart);
    newCart.delete(action.payload.id);
    return { ...state, cart: newCart };
  }
  if (action.type === REPLACE_MEMBERS_DATA) {
    return {
      ...state,
      cart: new Map(action.payload.newCart.map((item) => [item.id, item])),
    };
  }
  if (action.type === BRANCH_NAME) {
    const newBranchs = new Map(state.branchs);
    const branchId = action.payload.attendanceRecord.church_branch_id;
    const branch = newBranchs.get(branchId);
    return branch.name;
  }
  if (action.type === RELOAD_MEMBERS) {
    const newCart = new Map(state.cart);

    newCart.forEach((item) => {
      const updatedItem = {
        ...item,
        status: "null",
      };
      newCart.set(item.id, updatedItem);
    });

    return { ...state, cart: newCart };
  }
  if (action.type === ADD_MEMBER) {
    const newCart = new Map(state.cart);

    const newCartItem = {
      id: uuidv4(), // Generate a unique ID
      title: action.payload.newMember.title,
      surname: action.payload.newMember.name,
      img: action.payload.newMember.image,
      branch: action.payload.newMember.branch,
      cell: action.payload.newMember.cell,
      idNumber: action.payload.newMember.idNumber,
      sealed: action.payload.newMember.sealed,
      birthday: action.payload.newMember.birthday,
      serviceYears: action.payload.newMember.serviceYears,
      homePlace: action.payload.newMember.homePlace,
      active: "yes",
      amount: 0,
      status: "null",
      attendance: ["dummy"],
      absent: ["dummy"],
    };
    newCart.set(newCartItem.id, newCartItem);

    return { ...state, cart: newCart };
  }

  if (action.type === REMOVE_MEMBER) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);

    const newBranchs = new Map(state.branchs);
    const branchId = action.payload.BI;

    const branch = newBranchs.get(branchId);
    const date = action.payload.date;

    const newItem = {
      ...item,
      status: "null",
      attendance: item.attendance.filter((attender) => attender.date !== date), // Update attendance record
    };
    newCart.set(itemId, newItem);

    if (branch) {
      const attendanceRecord = branch.attendance.find(
        (attendance) => attendance.date === date
      );
      if (attendanceRecord) {
        const newBranch = {
          ...branch,
          attendance: branch.attendance.map((attendance) => {
            if (attendance.date === date) {
              return {
                ...attendance,
                total_attended: attendance.total_attended - 1, // Subtract 1 from total_attended
              };
            }

            return attendance;
          }),
        };

        newBranchs.set(branchId, newBranch); // Update the branch in the branchs Map
      }
    }

    return { ...state, cart: newCart, branchs: newBranchs };
  }

  if (action.type === INCREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);

    const newBranchs = new Map(state.branchs);
    const branchId = action.payload.attendanceRecord.church_branch_id;
    const branch = newBranchs.get(branchId);

    const newItem = {
      ...item,

      status: "present",
      attendance: [...item.attendance, action.payload.attendanceRecord], // Update attendance record
    };
    newCart.set(itemId, newItem);
    if (branch) {
      const newBranch = {
        ...branch,
        attendance: branch.attendance.map((attendance) => {
          if (attendance.date === action.payload.attendanceRecord.date) {
            return {
              ...attendance,
              total_attended: attendance.total_attended
                ? attendance.total_attended + 1
                : 1,
            };
          }
          return attendance;
        }),
      };
      newBranchs.set(branchId, newBranch); // Update the branch in the branchs Map
    }

    return { ...state, cart: newCart, branchs: newBranchs };
  }
  if (action.type === DECREASE) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);

    const newBranchs = new Map(state.branchs);
    const branchId = action.payload.attendanceRecord.church_branch_id;
    const branch = newBranchs.get(branchId);

    const newItem = {
      ...item,

      status: "absent",
      absent: [...item.absent, action.payload.attendanceRecord], // Update attendance record
    };
    newCart.set(itemId, newItem);

    if (branch) {
      const newBranch = {
        ...branch,
        attendance: branch.attendance.map((attendance) => {
          if (attendance.date === action.payload.attendanceRecord.date) {
            return {
              ...attendance,
              total_absent: attendance.total_absent
                ? attendance.total_absent + 1
                : 1,
            };
          }
          return attendance;
        }),
      };
      newBranchs.set(branchId, newBranch); // Update the branch in the branchs Map
    }

    return { ...state, cart: newCart, branchs: newBranchs };
  }
  if (action.type === DELETA) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.id;
    const item = newCart.get(itemId);

    const newItem = {
      ...item,

      active: "no",
    };
    newCart.set(itemId, newItem);
    return { ...state, cart: newCart };
  }

  if (action.type === EDITMEMBER) {
    const newCart = new Map(state.cart);
    const itemId = action.payload.member.id;
    const item = newCart.get(itemId);
    const newItem = {
      ...item,

      title: action.payload.member.title,
      surname: action.payload.member.surname,
      cell: action.payload.member.cell,
      idNumber: action.payload.member.idNumber,
      img: action.payload.member.img,
      amount: action.payload.member.amount,
      active: action.payload.member.active,
      branch: action.payload.member.branch,
      sealed: action.payload.member.sealed,
      birthday: action.payload.member.birthday,
      serviceYears: action.payload.member.serviceYears,
      homePlace: action.payload.member.homePlace,
      status: action.payload.member.status,
    };
    newCart.set(itemId, newItem);

    return { ...state, cart: newCart };
  }

  if (action.type === LOADING) {
    return { ...state, loading: true };
  }
  if (action.type === UPDATE_ATTENDANCE_RECORD) {
    const newBranch_Date = action.payload.branch_Date;
    return { ...state, logging: false, branch_Date: newBranch_Date };
  }
  if (action.type === DISPLAY_ITEMS) {
    const newCart = new Map(action.payload.cart.map((item) => [item.id, item]));
    return { ...state, loading: false, cart: newCart };
  }
  if (action.type === NEW_BRANCH_DATE) {
    const newBranchs = new Map(state.branchs);
    const branchId = action.payload.attendanceRecord.church_branch_id;
    const branch = newBranchs.get(branchId);
    let My_Birthday = "1985-04-07";
    let isFirstTime = false;
    if (branch) {
      const date = action.payload.attendanceRecord.date;

      branch.attendance.forEach((record) => {
        if (record.date === date || date === My_Birthday) {
          isFirstTime = true;
          return;
        }
        return;
      });

      if (!isFirstTime) {
        const newBranch = {
          ...branch,
          attendance: [
            ...branch.attendance,
            {
              id: action.payload.attendanceRecord.date,
              date: action.payload.attendanceRecord.date,
              pastor_id: action.payload.attendanceRecord.pastor_id,
              total_attended: 0,
              total_absent: 0,
            },
          ],
        };

        newBranchs.set(branchId, newBranch);
      }
      return { ...state, branchs: newBranchs };
    }
  }
  if (action.type === NOTIFICATION_DISPLAY) {
    return {
      ...state,
      notification: {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      },
    };
  }
  if (action.type === WARNING) {
    return {
      ...state,
      warning: {
        title: action.payload.title,
        heading: action.payload.heading,
        message: action.payload.message,
      },
    };
  }
  throw new Error(`no matching action type: ${action.type}`);
};
export default reducer;
