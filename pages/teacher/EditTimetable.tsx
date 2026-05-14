import React, { useState } from "react";
import { ChevronLeft, Pencil } from "lucide-react";

interface Props {
  onBack: () => void;
  timetableData: any;
  setTimetableData: React.Dispatch<React.SetStateAction<any>>;
}

const EditTimetable: React.FC<Props> = ({
  onBack,
  timetableData,
  setTimetableData,
}) => {
  const [editingDay, setEditingDay] = useState<string | null>(null);
  const [tempSubject, setTempSubject] = useState("");

  /* ================= SAFE DEFAULT PATH ================= */

const school: string | null =
  Object.keys(timetableData || {})[0] || null;

const program: string | null =
  school
    ? Object.keys(timetableData[school] || {})[0] || null
    : null;

const semester: string | null =
  school && program
    ? Object.keys(timetableData[school][program] || {})[0] || null
    : null;

const section: string | null =
  school && program && semester
    ? Object.keys(
        timetableData[school][program][semester] || {}
      )[0] || null
    : null;

  /* ================= UPDATE FUNCTION ================= */

const handleUpdate = () => {
  if (
    !editingDay ||
    !tempSubject ||
    !school ||
    !program ||
    !semester ||
    !section
  )
    return;

  const updated = JSON.parse(JSON.stringify(timetableData));

  // Create missing path safely
  if (!updated[school][program][semester][section][editingDay]) {
    updated[school][program][semester][section][editingDay] = {};
  }

  updated[school][program][semester][section][editingDay]["10:00-10:55"] = {
    subject: tempSubject,
    faculty: "Faculty",
    room: "Room 101",
  };

  setTimetableData(updated);
  setTempSubject("");
  setEditingDay(null);

  alert("Timetable Updated Successfully!");
};

  /* ================= UI ================= */

  return (
    <div className="p-5 max-w-lg mx-auto">
      {/* HEADER */}
      <header className="flex items-center gap-4 mb-8">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-500 active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-xl font-bold text-slate-800">
          Edit Timetable ✏️
        </h2>
      </header>

      {/* DAYS LIST */}
      <div className="space-y-4">
        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
          (dayItem) => (
            <div key={dayItem} className="bg-white shadow rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 font-bold">
                    {dayItem[0]}
                  </div>

                  <h4 className="font-bold text-slate-800">
                    {dayItem} Schedule
                  </h4>
                </div>

                <button
                  onClick={() => setEditingDay(dayItem)}
                  className="p-3 text-slate-400 hover:text-orange-500"
                >
                  <Pencil size={20} />
                </button>
              </div>

              {/* EDIT INPUT */}
              {editingDay === dayItem && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter new subject"
                    className="border p-2 rounded w-full focus:ring-2 focus:ring-green-400"
                    value={tempSubject}
                    onChange={(e) => setTempSubject(e.target.value)}
                  />

                  <button
                    onClick={handleUpdate}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
          )
        )}
      </div>

      <p className="mt-8 text-center text-xs font-bold text-slate-400">
        Request change for major rescheduling
      </p>
    </div>
  );
};

export default EditTimetable;