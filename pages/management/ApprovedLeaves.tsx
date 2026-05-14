import React, { useEffect, useState } from "react";

import { db } from "../../lib/firebase";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  orderBy,
  query
} from "firebase/firestore";

import { LeaveRequest } from "../../types";

const ApprovedLeaves: React.FC = () => {

  const [leaves, setLeaves] =
    useState<LeaveRequest[]>([]);

  const [loading, setLoading] =
    useState(false);

  // ================= FETCH =================

  const fetchLeaves = async () => {

    try {

      const q = query(
        collection(db, "leave_requests"),
        orderBy("created_at", "desc")
      );

      const snapshot = await getDocs(q);

      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data()
      }));

      setLeaves(data as LeaveRequest[]);

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchLeaves();

  }, []);

  // ================= APPROVE =================

  const approveLeave = async (
    id: string
  ) => {

    try {

      setLoading(true);

      await updateDoc(
        doc(db, "leave_requests", id),
        {
          status: "APPROVED",
          management_action_at: new Date()
        }
      );

      fetchLeaves();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  // ================= REJECT =================

  const rejectLeave = async (
    id: string
  ) => {

    try {

      setLoading(true);

      await updateDoc(
        doc(db, "leave_requests", id),
        {
          status: "REJECTED_MANAGEMENT",
          management_action_at: new Date()
        }
      );

      fetchLeaves();

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-5 max-w-2xl mx-auto space-y-5">

      {/* HEADER */}
      <div>

        <h2 className="text-2xl font-bold text-slate-800">
          Leave Management 📋
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Approve or reject leave applications
        </p>

      </div>

      {/* EMPTY */}
      {leaves.length === 0 && (

        <div className="bg-white p-6 rounded-3xl text-center text-slate-400 border border-slate-100">

          No leave requests found

        </div>

      )}

      {/* LIST */}
      {leaves.map((l) => (

        <div
          key={l.id}
          className="card-3d p-5 space-y-4"
        >

          {/* TOP */}
          <div className="flex items-start justify-between gap-3">

            <div>

              <h3 className="font-bold text-slate-800 text-lg">
                {l.studentName}
              </h3>

              <p className="text-sm text-slate-500">
                {l.from} → {l.to}
              </p>

            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                l.status === "APPROVED"
                  ? "bg-green-100 text-green-600"
                  : l.status === "REJECTED_PARENT" ||
                    l.status === "REJECTED_MANAGEMENT"
                  ? "bg-red-100 text-red-600"
                  : "bg-amber-100 text-amber-600"
              }`}
            >

              {l.status}

            </span>

          </div>

          {/* REASON */}
          <div className="bg-slate-50 p-4 rounded-2xl">

            <p className="text-sm text-slate-700">
              {l.reason}
            </p>

          </div>

          {/* PHONE */}
          <div className="text-sm text-slate-500">

            📞 {l.phone}

          </div>

          {/* BUTTONS */}
          {l.status === "PENDING_MANAGEMENT" && (

            <div className="flex gap-3">

              <button
                onClick={() =>
                  approveLeave(l.id)
                }
                disabled={loading}
                className="flex-1 py-3 bg-green-600 text-white rounded-2xl font-bold active:scale-95"
              >

                Approve

              </button>

              <button
                onClick={() =>
                  rejectLeave(l.id)
                }
                disabled={loading}
                className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-bold active:scale-95"
              >

                Reject

              </button>

            </div>

          )}

        </div>

      ))}

    </div>

  );

};

export default ApprovedLeaves;