import React, { useEffect, useState } from 'react';

import { ChevronLeft, Mail, Briefcase } from 'lucide-react';

import { UPSIFS_LOGO_URL } from '../../constants';

import {
  doc,
  getDoc
} from 'firebase/firestore';

import { db } from '../../lib/firebase';

interface Props {
  teacherId: string | null;
  onBack: () => void;
}

const TeacherDetail: React.FC<Props> = ({
  teacherId,
  onBack
}) => {

  const [teacher, setTeacher] = useState<any>(null);

  // 🔥 FETCH TEACHER
  useEffect(() => {

    const fetchTeacher = async () => {

      if (!teacherId) return;

      try {

        const docRef = doc(db, 'users', teacherId);

        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {

          setTeacher(snapshot.data());

        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchTeacher();

  }, [teacherId]);

  if (!teacher) {

    return (
      <div className="p-5 text-center text-slate-500">
        Loading Teacher...
      </div>
    );

  }

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
          Teacher Detail
        </h2>

      </header>

      {/* PROFILE CARD */}
      <div className="card-3d p-8 flex flex-col items-center text-center mb-6">

        <div className="w-24 h-24 bg-teal-50 rounded-[2rem] flex items-center justify-center border border-teal-100 p-4 shadow-xl overflow-hidden">

          <img
            src={UPSIFS_LOGO_URL}
            alt="UPSIFS"
            className="w-full h-full object-contain"
          />

        </div>

        <h3 className="text-2xl font-bold text-slate-800 mt-4">
          {teacher.name}
        </h3>

        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">

          {teacher.department || 'Faculty'}

        </p>

      </div>

      {/* DETAILS */}
      <div className="space-y-4">

        {/* EMAIL */}
        <div className="card-3d p-5 flex items-center gap-4">

          <div className="p-3 bg-slate-50 rounded-xl">
            <Mail size={20} className="text-slate-500" />
          </div>

          <div>
            <h5 className="font-bold text-sm text-slate-800">
              Email
            </h5>

            <p className="text-xs text-slate-400">
              {teacher.email}
            </p>
          </div>

        </div>

        {/* DESIGNATION */}
        <div className="card-3d p-5 flex items-center gap-4">

          <div className="p-3 bg-slate-50 rounded-xl">
            <Briefcase size={20} className="text-slate-500" />
          </div>

          <div>
            <h5 className="font-bold text-sm text-slate-800">
              Role
            </h5>

            <p className="text-xs text-slate-400 uppercase">
              {teacher.role}
            </p>
          </div>

        </div>

      </div>

      <div className="h-10"></div>

    </div>
  );
};

export default TeacherDetail;