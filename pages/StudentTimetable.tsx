import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";

import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const colorThemes: any = {
  blue: "bg-blue-100 border-blue-300 text-blue-900",
  purple: "bg-purple-100 border-purple-300 text-purple-900",
  green: "bg-emerald-100 border-emerald-300 text-emerald-900",
  red: "bg-rose-100 border-rose-300 text-rose-900",
  yellow: "bg-yellow-100 border-yellow-300 text-yellow-900",
  gray: "bg-slate-100 border-slate-300 text-slate-900",
};

const StudentTimetable: React.FC = () => {
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const [timetableData, setTimetableData] = useState<any>({});

  const orderedDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const ENGINEERING_SLOTS = [
    "10:00-10:55",
    "11:00-11:55",
    "12:00-12:55",
    "02:00-02:55",
    "03:00-03:55",
    "04:00-04:55",
  ];

  const LAW_SLOTS = [
    "09:30-10:25",
    "10:30-11:25",
    "11:30-12:25",
    "01:30-02:25",
    "02:30-03:25",
    "03:30-04:25",
  ];

  const timeSlots =
    selectedSchool === "law"
      ? LAW_SLOTS
      : ENGINEERING_SLOTS;

  /* ================= FETCH TIMETABLE ================= */

  const fetchTimetable = async () => {
    if (
      !selectedSchool ||
      !selectedProgram ||
      !selectedSemester ||
      !selectedSection
    ) {
      setTimetableData({});
      return;
    }

    try {
      const q = query(
        collection(db, "timetables"),
        where("school", "==", selectedSchool),
        where("program", "==", selectedProgram),
        where("semester", "==", selectedSemester),
        where("section", "==", selectedSection)
      );

      const snapshot = await getDocs(q);

      const formatted: any = {};

      snapshot.docs.forEach((doc) => {
        const data = doc.data();

        if (!formatted[data.day]) {
          formatted[data.day] = {};
        }

        formatted[data.day][data.time] = {
          subject: data.subject,
          faculty: data.faculty,
          room: data.room,
          emoji: data.emoji,
          color: data.color,
        };
      });

      setTimetableData(formatted);

    } catch (error) {
      console.error("Error fetching timetable:", error);
    }
  };

  useEffect(() => {
    fetchTimetable();
  }, [
    selectedSchool,
    selectedProgram,
    selectedSemester,
    selectedSection,
  ]);

  const days = orderedDays.filter(
    (day) => timetableData[day]
  );

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          📚 Student Time Table
        </h2>

        <button
          onClick={() => window.print()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow"
        >
          🖨 Print
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-8">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          {/* SCHOOL */}
          <select
            value={selectedSchool}
            onChange={(e) => {
              setSelectedSchool(e.target.value);
              setSelectedProgram("");
              setSelectedSemester("");
              setSelectedSection("");
            }}
            className="border p-3 rounded-xl"
          >
            <option value="">🏫 Select School</option>
            <option value="engineering">
              🎓 School of Engineering
            </option>

            <option value="law">
              ⚖️ School of Law
            </option>
          </select>

          {/* PROGRAM */}
          <select
            value={selectedProgram}
            onChange={(e) => {
              setSelectedProgram(e.target.value);
              setSelectedSemester("");
              setSelectedSection("");
            }}
            className="border p-3 rounded-xl"
          >
            <option value="">📘 Select Program</option>

            {selectedSchool === "engineering" && (
              <>
                <option value="btech">BTech</option>
                <option value="mtech">MTech</option>
              </>
            )}

            {selectedSchool === "law" && (
              <>
                <option value="bsc-llb">
                  B.Sc LLB
                </option>

                <option value="llm-criminal">
                  LLM Criminal Law
                </option>

                <option value="llm-cyber">
                  LLM Cyber Law
                </option>
              </>
            )}
          </select>

          {/* SEMESTER */}
          <select
            value={selectedSemester}
            onChange={(e) => {
              setSelectedSemester(e.target.value);
              setSelectedSection("");
            }}
            className="border p-3 rounded-xl"
          >
            <option value="">📅 Select Semester</option>

            <option value="Sem 2">Sem 2</option>
            <option value="Sem 4">Sem 4</option>
          </select>

          {/* SECTION */}
          <select
            value={selectedSection}
            onChange={(e) =>
              setSelectedSection(e.target.value)
            }
            className="border p-3 rounded-xl"
          >
            <option value="">🏷 Select Section</option>

            <option value="A">A</option>
            <option value="B">B</option>
            <option value="Default">Default</option>
          </select>

        </div>
      </div>

      {/* TIMETABLE */}
      {days.length > 0 && (
        <div className="bg-white shadow-xl rounded-2xl overflow-x-auto">

          <table className="min-w-full text-sm text-left">

            <thead className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">

              <tr>
                <th className="p-4 font-bold text-lg">
                  📅 Day
                </th>

                {timeSlots.map((time) => (
                  <th
                    key={time}
                    className="p-4 font-semibold"
                  >
                    ⏰ {time}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {days.map((day, index) => (
                <tr
                  key={day}
                  className={
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50"
                  }
                >
                  <td className="p-4 font-bold text-indigo-700">
                    {day}
                  </td>

                  {timeSlots.map((time) => (
                    <td
                      key={time}
                      className="p-4 align-top"
                    >
                      {timetableData?.[day]?.[time] ? (
                        <div
                          className={`p-4 rounded-2xl border shadow-md hover:shadow-xl transition duration-300 ${
                            colorThemes[
                              timetableData[day][time].color
                            ]
                          }`}
                        >
                          <div className="font-bold flex items-center gap-2">
                            {timetableData[day][time].emoji}

                            {
                              timetableData[day][time]
                                .subject
                            }
                          </div>

                          <div className="text-xs mt-2">
                            👨‍🏫{" "}
                            {
                              timetableData[day][time]
                                .faculty
                            }
                          </div>

                          <div className="text-xs">
                            🏫 Room{" "}
                            {
                              timetableData[day][time]
                                .room
                            }
                          </div>
                        </div>
                      ) : (
                        <div className="h-20 rounded-xl bg-gray-50"></div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default StudentTimetable;