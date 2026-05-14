import React, { useEffect, useState } from 'react';

import { UPSIFS_LOGO_URL } from '../../constants';

import {
  ChevronLeft,
  Search,
  ChevronRight
} from 'lucide-react';

import {
  collection,
  getDocs
} from 'firebase/firestore';

import { db } from '../../lib/firebase';

interface Props {
  onBack: () => void;
  onSelectTeacher: (id: string) => void;
}

const TeachersList: React.FC<Props> = ({
  onBack,
  onSelectTeacher
}) => {

  const [search, setSearch] = useState('');

  const [teachers, setTeachers] = useState<any[]>([]);

  // 🔥 FETCH TEACHERS
  useEffect(() => {

    const fetchTeachers = async () => {

      try {

        const usersRef = collection(db, 'users');

        const snapshot = await getDocs(usersRef);

        const teachersData: any[] = [];

        snapshot.forEach((doc) => {

          const data = doc.data();

          // ✅ ONLY TEACHERS
          if (data.role === 'teacher') {

            teachersData.push({
              id: doc.id,
              ...data
            });

          }

        });

        setTeachers(teachersData);

      } catch (error) {

        console.error(error);

      }

    };

    fetchTeachers();

  }, []);

  // 🔍 SEARCH
  const filtered = teachers.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5 max-w-lg mx-auto">

      {/* HEADER */}
      <header className="flex items-center gap-4 mb-6">

        <button
          onClick={onBack}
          className="p-2 -ml-2 text-slate-500 active:scale-90"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-xl font-bold text-slate-800">
          Teachers List 👨‍🏫
        </h2>

      </header>

      {/* SEARCH */}
      <div className="relative mb-8">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search teacher..."
          className="w-full bg-white border border-slate-100 p-4 pl-12 rounded-2xl shadow-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-800"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filtered.map((t) => (

          <button
            key={t.id}
            onClick={() => onSelectTeacher(t.id)}
            className="card-3d w-full p-4 flex items-center justify-between text-left"
          >

            <div className="flex items-center gap-4">

              {/* AVATAR */}
              <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100 p-2 overflow-hidden">

                <img
                  src={UPSIFS_LOGO_URL}
                  alt="UPSIFS Logo"
                  className="w-full h-full object-contain"
                />

              </div>

              {/* INFO */}
              <div>

                <h4 className="font-bold text-slate-800">
                  {t.name}
                </h4>

                <p className="text-[10px] text-slate-400 font-black uppercase">

                  {t.department || 'Faculty'} • {t.email}

                </p>

              </div>

            </div>

            <ChevronRight
              size={18}
              className="text-slate-300"
            />

          </button>

        ))}

      </div>

    </div>
  );
};

export default TeachersList;