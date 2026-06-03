import React, { useEffect, useState } from "react";

import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../../lib/firebase";

const MarkAttendance = () => {

  const [students, setStudents] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [attendance, setAttendance] = useState<any>({});

  const [subject, setSubject] =
    useState("Machine Learning");
const [semester, setSemester] =
  useState(2);

  const [section, setSection] =
    useState("A");

  const [date, setDate] =
    useState(
      new Date().toISOString().split("T")[0]
    );

  /* =========================
      FETCH STUDENTS
  ========================= */

  const fetchStudents = async () => {

    try {

      setLoading(true);

      const q = query(
        collection(db, "users"),
        where("role", "==", "student"),
        where("semester", "==", semester),
        where("section", "==", section)
      );

      const snapshot = await getDocs(q);

      const studentsList =
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

      setStudents(studentsList);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchStudents();

  }, [semester, section]);

  /* =========================
      TOGGLE ATTENDANCE
  ========================= */

  const toggleAttendance = (
    studentId: string,
    status: string
  ) => {

    setAttendance({
      ...attendance,
      [studentId]: status,
    });
  };

  /* =========================
      SAVE ATTENDANCE
  ========================= */

  const handleSave = async () => {

    try {

      setLoading(true);

      for (const student of students) {

        await addDoc(
          collection(db, "attendance"),
          {
            studentId: student.id,

            studentName: student.name,

            roll: student.roll,

            semester,

            section,

            subject,

            date,

            status:
              attendance[student.id] || "absent",

            timestamp: serverTimestamp(),
          }
        );
      }

      alert("Attendance Saved Successfully");

    } catch (error) {

      console.log(error);

      alert("Error Saving Attendance");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="p-6 md:p-10 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Mark Attendance
        </h1>

        <p className="text-slate-500 mt-2">
          Manage daily student attendance
        </p>

      </div>

      {/* FILTERS */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">

        {/* SUBJECT */}
        <select
          value={subject}
          onChange={(e) =>
            setSubject(e.target.value)
          }
          className="p-4 rounded-2xl border border-slate-200"
        >
          <option>Machine Learning</option>
          <option>DBMS</option>
          <option>Operating System</option>
        </select>

        {/* SEM */}
        <select
          value={semester}
          onChange={(e) =>
            setSemester(Number(e.target.value))
          }
          className="p-4 rounded-2xl border border-slate-200"
        >
          <option value={1}>Sem 1</option>
<option value={2}>Sem 2</option>
<option value={3}>Sem 3</option>
<option value={4}>Sem 4</option>
<option value={5}>Sem 5</option>
<option value={6}>Sem 6</option>
<option value={7}>Sem 7</option>
<option value={8}>Sem 8</option>
        </select>

        {/* SECTION */}
        <select
          value={section}
          onChange={(e) =>
            setSection(e.target.value)
          }
          className="p-4 rounded-2xl border border-slate-200"
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>

        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
          className="p-4 rounded-2xl border border-slate-200"
        />

      </div>

      {/* LOADING */}
      {loading && (

        <div className="text-center py-10 font-semibold">
          Loading...
        </div>
      )}

      {/* STUDENT LIST */}
      <div className="space-y-4">

        {students.map((student) => (

          <div
            key={student.id}
            className="bg-white border border-slate-200 rounded-3xl p-5 flex items-center justify-between"
          >

            {/* LEFT */}
            <div>

              <h3 className="font-bold text-slate-800">
                {student.name}
              </h3>

              <p className="text-sm text-slate-500">
                Roll: {student.roll}
              </p>

            </div>

            {/* RIGHT */}
            <div className="flex gap-3">

              {/* PRESENT */}
              <button
                onClick={() =>
                  toggleAttendance(
                    student.id,
                    "present"
                  )
                }
                className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                  attendance[student.id] ===
                  "present"
                    ? "bg-green-500 text-white"
                    : "bg-slate-100"
                }`}
              >
                Present
              </button>

              {/* ABSENT */}
              <button
                onClick={() =>
                  toggleAttendance(
                    student.id,
                    "absent"
                  )
                }
                className={`px-5 py-2 rounded-xl font-semibold transition-all ${
                  attendance[student.id] ===
                  "absent"
                    ? "bg-red-500 text-white"
                    : "bg-slate-100"
                }`}
              >
                Absent
              </button>

            </div>
          </div>
        ))}
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 transition-all text-white py-4 rounded-2xl font-bold"
      >
        Save Attendance
      </button>

    </div>
  );
};

export default MarkAttendance;