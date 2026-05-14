import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";
import { LeaveRequest } from "../types";

const LeaveManagement: React.FC = () => {
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);

  const fetchLeaves = async () => {
    const q = query(
      collection(db, "leave_requests"),
      where("status", "==", "PENDING_MANAGEMENT")
    );

    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    setLeaves(data as any);
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const approveFinal = async (id: string) => {
    await updateDoc(doc(db, "leave_requests", id), {
      status: "APPROVED_FINAL",
      management_action_at: new Date()
    });

    fetchLeaves();
  };

  const rejectFinal = async (id: string) => {
    await updateDoc(doc(db, "leave_requests", id), {
      status: "REJECTED_MANAGEMENT",
      management_action_at: new Date()
    });

    fetchLeaves();
  };

  return (
    <div className="p-5 max-w-lg mx-auto space-y-4">
      <h2 className="text-xl font-semibold">🏢 Management Approval</h2>

      {leaves.map(l => (
        <div key={l.id} className="bg-white p-4 rounded shadow">
          <p className="font-semibold">{l.studentName}</p>
          <p>{l.reason}</p>

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => approveFinal(l.id)}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Final Approve
            </button>

            <button
              onClick={() => rejectFinal(l.id)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveManagement;
