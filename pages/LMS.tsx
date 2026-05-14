import { db } from "../lib/firebase";
import { collection, getDocs, query, where, updateDoc, doc } from "firebase/firestore";

import React, { useEffect, useState } from "react";
import { User } from "../types";
import {
  BookOpen,
  FileText,
  Download,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

interface LMSProps {
  user: User;
}

interface Material {
  id: string;
  title: string;
  subject: string;
  file_url: string;
  school: string;
  program: string;
  semester: string;
  section: string;
}

const LMS: React.FC<LMSProps> = ({ user }) => {
  
  const [school, setSchool] = useState(user.school || "School of Engineering");
  const [program, setProgram] = useState(user.department || "BTech");
  const [semester, setSemester] = useState(user.semester || "Sem 1");
  const [section, setSection] = useState(user.section || "A");

  const [materials, setMaterials] = useState<Material[]>([]);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);

  // Fetch materials
 // Fetch materials from Supabase


  // Filtered materials
useEffect(() => {
  const fetchMaterials = async () => {
    const snapshot = await getDocs(collection(db, "materials"));

    const data = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));

    setMaterials(data as any);
  };

  fetchMaterials();
}, []);

  // Group by subject
 const groupedBySubject = materials.reduce((acc: any, material) => {
  if (!acc[material.subject]) {
    acc[material.subject] = [];
  }
  acc[material.subject].push(material);
  return acc;
}, {});
  

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-slate-800">
          Study Material 📚
        </h2>
        <p className="text-slate-500 font-medium mt-1">
          {program} | {semester} | Section {section}
        </p>
      </div>

      {/* Filters */}
      <div className="grid md:grid-cols-4 gap-4 mb-10">
        <select
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          className="bg-white border border-slate-200 p-3 rounded-xl font-semibold"
        >
          <option>School of Engineering</option>
          <option>School of Law</option>
        </select>

        <select
          value={program}
          onChange={(e) => setProgram(e.target.value)}
          className="bg-white border border-slate-200 p-3 rounded-xl font-semibold"
        >
          {school === "School of Engineering" && (
            <>
              <option>BTech</option>
              <option>MTech</option>
            </>
          )}
          {school === "School of Law" && (
            <>
              <option>B.Sc LLB</option>
              <option>LLM Criminal Law</option>
              <option>LLM Cyber Law</option>
            </>
          )}
        </select>

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="bg-white border border-slate-200 p-3 rounded-xl font-semibold"
        >
          <option>Sem 1</option>
          <option>Sem 2</option>
          <option>Sem 3</option>
          <option>Sem 4</option>
        </select>

        <select
          value={section}
          onChange={(e) => setSection(e.target.value)}
          className="bg-white border border-slate-200 p-3 rounded-xl font-semibold"
        >
          <option>A</option>
          <option>B</option>
          <option>C</option>
        </select>
      </div>

      {/* Materials */}
      {Object.keys(groupedBySubject).length === 0 ? (
        <div className="text-center py-20">
          <p className="text-slate-400 italic">
            No materials available for selected filters.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.keys(groupedBySubject).map((subject) => (
            <div
              key={subject}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm"
            >
              {/* Subject Header */}
              <button
                onClick={() =>
                  setExpandedSubject(
                    expandedSubject === subject ? null : subject
                  )
                }
                className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-indigo-600 text-white">
                    <BookOpen size={22} />
                  </div>
                  <h4 className="font-bold text-lg text-slate-800">
                    {subject}
                  </h4>
                </div>
                {expandedSubject === subject ? (
                  <ChevronDown size={22} className="text-slate-400" />
                ) : (
                  <ChevronRight size={22} className="text-slate-400" />
                )}
              </button>

              {/* Subject Materials */}
              {expandedSubject === subject && (
                <div className="p-6 bg-slate-50 space-y-4">
                  {groupedBySubject[subject].map((material: Material) => (
                    <div
                      key={material.id}
                      className="bg-white p-4 rounded-2xl flex items-center justify-between border border-slate-200 hover:border-indigo-500 transition"
                    >
                      <div className="flex items-center gap-3">
                        <FileText size={20} className="text-indigo-600" />
                        <span className="font-semibold text-slate-700 text-sm">
                          {material.title}
                        </span>
                      </div>

                      <a
                        href={material.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-indigo-600 font-semibold text-sm"
                      >
                        <Download size={16} />
                        Download
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};






export default LMS;