import React, { useState } from "react";

import {
  ChevronLeft,
  UploadCloud
} from "lucide-react";

import {
  db,
  storage
} from "../../lib/firebase";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "firebase/storage";

import {
  collection,
  addDoc,
  serverTimestamp
} from "firebase/firestore";

import {
  getAuth
} from "firebase/auth";

interface Props {
  onBack: () => void;
}

const UploadPPT: React.FC<Props> = ({ onBack }) => {

  const [loading, setLoading] = useState(false);

  const [school, setSchool] =
    useState("School of Engineering");

  const [program, setProgram] =
    useState("BTech");

  const [semester, setSemester] =
    useState("Sem 1");

  const [section, setSection] =
    useState("A");

  const [subject, setSubject] =
    useState("Machine Learning");

  const [title, setTitle] =
    useState("");

  const [file, setFile] =
    useState<File | null>(null);

  // ================= UPLOAD =================

  const handleUpload = async () => {

    if (!title || !file) {

      alert("Please fill all fields");

      return;

    }

    try {

      setLoading(true);

      const auth = getAuth();

      // ✅ CHECK LOGIN
      if (!auth.currentUser) {

        alert("Teacher not logged in");

        return;

      }

      // ✅ FILE TYPE VALIDATION
      const allowedTypes = [
        "application/pdf",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation"
      ];

      if (
        !allowedTypes.includes(file.type)
      ) {

        alert("Only PDF and PPT files allowed");

        return;

      }

      console.log("UPLOADING FILE...");

      // ✅ STORAGE PATH
      const storageRef = ref(
        storage,
        `study-materials/${Date.now()}-${file.name}`
      );

      // ✅ UPLOAD
      await uploadBytes(
        storageRef,
        file
      );

      // ✅ FILE URL
      const fileUrl =
        await getDownloadURL(storageRef);

      console.log("FILE URL:", fileUrl);

      // ✅ SAVE FIRESTORE
      await addDoc(
        collection(db, "materials"),
        {

          title,

          subject,

          school,

          program,

          semester,

          section,

          teacher_id:
            auth.currentUser.uid,

          teacher_email:
            auth.currentUser.email,

          file_name: file.name,

          file_type: file.type,

          file_url: fileUrl,

          created_at:
            serverTimestamp()

        }
      );

      alert("Study Material Uploaded 🚀");

      // RESET
      setTitle("");

      setFile(null);

    } catch (error) {

      console.error(
        "UPLOAD ERROR:",
        error
      );

      alert("Upload Failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="p-6 max-w-5xl mx-auto">

      {/* HEADER */}

      <header className="flex items-center gap-4 mb-10">

        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-500 active:scale-90"
        >

          <ChevronLeft size={24} />

        </button>

        <h2 className="text-2xl font-bold text-slate-800">

          Upload Study Material 📤

        </h2>

      </header>

      {/* CARD */}

      <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 space-y-6">

        {/* FILTERS */}

        <div className="grid md:grid-cols-2 gap-4">

          <select
            value={school}
            onChange={(e) =>
              setSchool(e.target.value)
            }
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-semibold"
          >

            <option>
              School of Engineering
            </option>

            <option>
              School of Law
            </option>

          </select>

          <select
            value={program}
            onChange={(e) =>
              setProgram(e.target.value)
            }
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-semibold"
          >

            <option>BTech</option>

            <option>MTech</option>

          </select>

          <select
            value={semester}
            onChange={(e) =>
              setSemester(e.target.value)
            }
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-semibold"
          >

            <option>Sem 1</option>
            <option>Sem 2</option>
            <option>Sem 3</option>
            <option>Sem 4</option>

          </select>

          <select
            value={section}
            onChange={(e) =>
              setSection(e.target.value)
            }
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-semibold"
          >

            <option>A</option>
            <option>B</option>
            <option>C</option>

          </select>

        </div>

        {/* SUBJECT */}

        <div>

          <label className="text-xs font-bold text-slate-500 block mb-2">

            Subject

          </label>

          <select
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-semibold"
          >

            <option>
              Machine Learning
            </option>

            <option>
              AI Basics
            </option>

          </select>

        </div>

        {/* TITLE */}

        <div>

          <label className="text-xs font-bold text-slate-500 block mb-2">

            Material Title

          </label>

          <input
            type="text"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            placeholder="e.g. Unit 1 Notes"
            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl font-semibold"
          />

        </div>

        {/* FILE */}

        <label className="border-2 border-dashed border-slate-300 rounded-3xl p-10 flex flex-col items-center justify-center text-slate-500 bg-slate-50 hover:border-indigo-500 hover:bg-white transition-all cursor-pointer">

          <UploadCloud
            size={48}
            className="mb-4 text-indigo-500"
          />

          <p className="font-semibold text-sm text-center">

            {file
              ? file.name
              : "Click to select PDF / PPT"}

          </p>

          <input
            type="file"
            accept=".pdf,.ppt,.pptx"
            hidden
            onChange={(e) => {

              if (
                e.target.files?.[0]
              ) {

                setFile(
                  e.target.files[0]
                );

              }

            }}
          />

        </label>

        {/* BUTTON */}

        <button
          onClick={handleUpload}
          disabled={loading}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-md hover:bg-indigo-700 transition-all"
        >

          {loading
            ? "Uploading..."
            : "Upload to LMS"}

        </button>

      </div>

    </div>

  );

};

export default UploadPPT;