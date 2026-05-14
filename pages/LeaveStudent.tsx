import React, { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { User } from "../types";

interface Props {
  user: User;
}

const LeaveStudent: React.FC<Props> = ({ user }) => {

  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [phone, setPhone] = useState(user.parentPhone || "");

  const submitLeave = async () => {

    if (!reason || !fromDate || !toDate || !phone) {
      alert("Fill all fields");
      return;
    }

    await addDoc(collection(db, "leave_requests"), {

      studentId: user.id,
      studentName: user.name,

      parentEmail: user.parentEmail || "",

      reason,
      from: fromDate,
      to: toDate,
      phone,

      status: "PENDING_PARENT",

      created_at: new Date()

    });

    alert("Leave request submitted");

    setReason("");
    setFromDate("");
    setToDate("");

  };

  return (
    <div className="p-5 max-w-lg mx-auto">

      <h2 className="text-3xl font-bold mb-2">
        📝 Apply Leave
      </h2>

      <p className="text-gray-500 mb-6">
        Submit leave request for approval
      </p>

      {/* FROM DATE */}
      <div className="mb-4">

        <label className="block mb-2 font-medium">
          From Date
        </label>

        <input
          type="datetime-local"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full p-4 rounded-2xl border border-gray-200"
        />

      </div>

      {/* TO DATE */}
      <div className="mb-4">

        <label className="block mb-2 font-medium">
          To Date
        </label>

        <input
          type="datetime-local"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full p-4 rounded-2xl border border-gray-200"
        />

      </div>

      {/* PHONE */}
      <div className="mb-4">

        <label className="block mb-2 font-medium">
          Parent Phone Number
        </label>

        <input
          type="tel"
          placeholder="Enter parent number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-4 rounded-2xl border border-gray-200"
        />

      </div>

      {/* REASON */}
      <div className="mb-4">

        <label className="block mb-2 font-medium">
          Leave Reason
        </label>

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter leave reason..."
          className="w-full h-40 p-4 rounded-2xl border border-gray-200 outline-none"
        />

      </div>

      <button
        onClick={submitLeave}
        className="w-full mt-5 bg-indigo-600 text-white py-4 rounded-2xl font-semibold text-lg"
      >
        Submit Leave
      </button>

    </div>
  );
};

export default LeaveStudent;