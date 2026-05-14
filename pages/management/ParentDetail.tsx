import React, { useEffect, useState } from 'react';

import { UPSIFS_LOGO_URL } from '../../constants';

import {
  ChevronLeft,
  Mail,
  Phone,
  Briefcase
} from 'lucide-react';

import {
  doc,
  getDoc
} from 'firebase/firestore';

import { db } from '../../lib/firebase';

interface Props {
  parentId: string | null;
  onBack: () => void;
}

const ParentDetail: React.FC<Props> = ({
  parentId,
  onBack
}) => {

  const [parent, setParent] = useState<any>(null);

  // 🔥 FETCH PARENT
  useEffect(() => {

    const fetchParent = async () => {

      if (!parentId) return;

      try {

        const docRef = doc(db, 'users', parentId);

        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {

          setParent(snapshot.data());

        }

      } catch (error) {

        console.error(error);

      }

    };

    fetchParent();

  }, [parentId]);

  if (!parent) {

    return (
      <div className="p-5 text-center text-slate-400">
        Loading...
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
          Parent Detail
        </h2>

      </header>

      {/* PROFILE CARD */}
      <div className="card-3d p-8 flex flex-col items-center text-center mb-6">

        <div className="w-24 h-24 bg-orange-50 rounded-[2rem] flex items-center justify-center border border-orange-100 p-4 shadow-xl overflow-hidden">

          <img
            src={UPSIFS_LOGO_URL}
            alt="UPSIFS Logo"
            className="w-full h-full object-contain"
          />

        </div>

        <h3 className="text-2xl font-bold text-slate-800 mt-4">
          {parent.name}
        </h3>

        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">

          Parent Account

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

            <h5 className="font-bold text-slate-800">
              Email
            </h5>

            <p className="text-sm text-slate-400">
              {parent.email}
            </p>

          </div>

        </div>

        {/* PHONE */}
        <div className="card-3d p-5 flex items-center gap-4">

          <div className="p-3 bg-slate-50 rounded-xl">
            <Phone size={20} className="text-slate-500" />
          </div>

          <div>

            <h5 className="font-bold text-slate-800">
              Phone
            </h5>

            <p className="text-sm text-slate-400">
              {parent.phone || 'Not Available'}
            </p>

          </div>

        </div>

        {/* ROLE */}
        <div className="card-3d p-5 flex items-center gap-4">

          <div className="p-3 bg-slate-50 rounded-xl">
            <Briefcase size={20} className="text-slate-500" />
          </div>

          <div>

            <h5 className="font-bold text-slate-800">
              Role
            </h5>

            <p className="text-sm text-slate-400 uppercase">
              {parent.role}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

};

export default ParentDetail;