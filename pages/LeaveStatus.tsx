import React, {
  useEffect,
  useState
} from "react";

import {
  collection,
  getDocs,
  orderBy,
  query,
  where
} from "firebase/firestore";

import { auth, db } from "../lib/firebase";

import { LeaveRequest } from "../types";

const LeaveStatus: React.FC = () => {

  const [leaves, setLeaves] =
    useState<LeaveRequest[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ================= FETCH =================

  const fetchLeaves = async () => {

    try {

      // ✅ GET CURRENT USER
      const currentUser =
        auth.currentUser;

      if (!currentUser) {

        console.log(
          "NO LOGGED IN USER"
        );

        setLoading(false);

        return;

      }

      const uid =
        currentUser.uid;

      console.log(
        "FETCHING FOR UID:",
        uid
      );

      // ✅ FIRESTORE QUERY
      const q = query(

        collection(
          db,
          "leave_requests"
        ),

        where(
          "studentId",
          "==",
          uid
        ),

        orderBy(
          "created_at",
          "desc"
        )

      );

      const snapshot =
        await getDocs(q);

      console.log(
        "SNAPSHOT EMPTY:",
        snapshot.empty
      );

      // ✅ DATA
      const data =
        snapshot.docs.map((d) => ({

          id: d.id,

          ...d.data()

        }));

      console.log(
        "LEAVES:",
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

  // ================= STATUS COLOR =================

  const getStatusColor = (
    status: string
  ) => {

    switch (status) {

      case "APPROVED":

        return "text-green-600";

      case "REJECTED_PARENT":

      case "REJECTED":

        return "text-red-500";

      case "PENDING_MANAGEMENT":

        return "text-blue-500";

      default:

        return "text-orange-500";

    }

  };

  // ================= FORMAT STATUS =================

  const formatStatus = (
    status: string
  ) => {

    return status

      ?.replaceAll("_", " ")

      ?.toLowerCase()

      ?.replace(/\b\w/g, (c) =>
        c.toUpperCase()
      );

  };

  return (

    <div className="p-5 max-w-lg mx-auto">

      {/* HEADER */}

      <h2 className="text-2xl font-bold mb-2">

        📄 Leave Status

      </h2>

      <p className="text-gray-500 mb-6">

        Track your leave approval

      </p>

      {/* LOADING */}

      {loading && (

        <div className="text-center text-gray-400">

          Loading...

        </div>

      )}

      {/* EMPTY */}

      {!loading &&
        leaves.length === 0 && (

          <div className="bg-white rounded-3xl p-6 text-center text-gray-400">

            No leave requests found

          </div>

        )}

      {/* LIST */}

      {leaves.map((leave) => (

        <div
          key={leave.id}
          className="bg-white rounded-3xl p-5 shadow-sm mb-5"
        >

          <div className="flex justify-between mb-3">

            <span className="font-medium">

              Reason

            </span>

            <span>

              {leave.reason}

            </span>

          </div>

          <div className="flex justify-between mb-3">

            <span className="font-medium">

              From

            </span>

            <span>

              {leave.from}

            </span>

          </div>

          <div className="flex justify-between mb-3">

            <span className="font-medium">

              To

            </span>

            <span>

              {leave.to}

            </span>

          </div>

          <div className="flex justify-between">

            <span className="font-medium">

              Status

            </span>

            <span
              className={`font-semibold ${getStatusColor(
                leave.status
              )}`}
            >

              {formatStatus(
                leave.status
              )}

            </span>

          </div>

        </div>

      ))}

    </div>

  );

};

export default LeaveStatus;