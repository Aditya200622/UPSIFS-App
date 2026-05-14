import React, {
  useEffect,
  useState
} from "react";

import { db } from "../lib/firebase";

import {
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from "firebase/firestore";

import {
  LeaveRequest,
  User
} from "../types";

interface Props {
  user: User;
}

const LeaveParent: React.FC<Props> = ({
  user
}) => {

  const [leaves, setLeaves] =
    useState<LeaveRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH =================

  const fetchLeaves = async () => {

    try {

      setLoading(true);

      console.log(
        "FETCHING PARENT LEAVES..."
      );

      // ✅ FIXED QUERY
      const q = query(

        collection(
          db,
          "leave_requests"
        ),

        where(
          "status",
          "==",
          "PENDING_PARENT"
        )

      );

      const snapshot =
        await getDocs(q);

      console.log(
        "SNAPSHOT EMPTY:",
        snapshot.empty
      );

      const data =
        snapshot.docs.map((d) => ({

          id: d.id,

          ...d.data()

        }));

      console.log(
        "PARENT LEAVES:",
        data
      );

      setLeaves(
        data as LeaveRequest[]
      );

    } catch (error) {

      console.error(
        "FETCH ERROR:",
        error
      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchLeaves();

  }, []);

  // ================= APPROVE =================

  const approve = async (
    id: string
  ) => {

    try {

      await updateDoc(

        doc(
          db,
          "leave_requests",
          id
        ),

        {

          status:
            "PENDING_MANAGEMENT",

          parent_action_at:
            new Date()

        }

      );

      alert(
        "Leave Approved ✅"
      );

      fetchLeaves();

    } catch (error) {

      console.error(error);

      alert(
        "Approval failed"
      );

    }

  };

  // ================= REJECT =================

  const reject = async (
    id: string
  ) => {

    try {

      await updateDoc(

        doc(
          db,
          "leave_requests",
          id
        ),

        {

          status:
            "REJECTED_PARENT",

          parent_action_at:
            new Date()

        }

      );

      alert(
        "Leave Rejected ❌"
      );

      fetchLeaves();

    } catch (error) {

      console.error(error);

      alert(
        "Reject failed"
      );

    }

  };

  return (

    <div className="p-5 max-w-lg mx-auto space-y-5">

      {/* HEADER */}

      <div>

        <h2 className="text-2xl font-bold text-slate-800">

          👨‍👩‍👧 Parent Approval

        </h2>

        <p className="text-sm text-slate-500 mt-1">

          Approve or reject leave requests

        </p>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="bg-white rounded-2xl p-5 text-center text-slate-400 shadow-sm">

          Loading...

        </div>

      )}

      {/* EMPTY */}

      {!loading &&
        leaves.length === 0 && (

          <div className="bg-white rounded-2xl p-5 text-center text-slate-400 shadow-sm">

            No pending leave requests

          </div>

        )}

      {/* LIST */}

      {leaves.map((l) => (

        <div

          key={l.id}

          className="bg-white p-5 rounded-3xl shadow-sm space-y-4"

        >

          {/* STUDENT */}

          <div>

            <h3 className="font-bold text-lg text-slate-800">

              {l.studentName}

            </h3>

            <p className="text-sm text-slate-500">

              {l.from} → {l.to}

            </p>

          </div>

          {/* REASON */}

          <div className="bg-slate-50 p-4 rounded-2xl">

            <p className="text-sm text-slate-700">

              {l.reason}

            </p>

          </div>

          {/* STATUS */}

          <div className="flex justify-between items-center">

            <span className="text-sm text-slate-500">

              Status

            </span>

            <span className="font-semibold text-orange-500">

              {l.status}

            </span>

          </div>

          {/* ACTIONS */}

          <div className="flex gap-3">

            <button

              onClick={() =>
                approve(l.id)
              }

              className="flex-1 py-3 bg-green-600 text-white rounded-2xl font-semibold"

            >

              Approve

            </button>

            <button

              onClick={() =>
                reject(l.id)
              }

              className="flex-1 py-3 bg-red-500 text-white rounded-2xl font-semibold"

            >

              Reject

            </button>

          </div>

        </div>

      ))}

    </div>

  );

};

export default LeaveParent;