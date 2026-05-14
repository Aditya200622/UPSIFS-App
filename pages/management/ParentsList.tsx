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
  onSelectParent: (id: string) => void;
}

const ParentsList: React.FC<Props> = ({
  onBack,
  onSelectParent
}) => {

  const [search, setSearch] = useState('');

  const [parents, setParents] = useState<any[]>([]);

  // 🔥 FETCH PARENTS
  useEffect(() => {

    const fetchParents = async () => {

      try {

        const snapshot = await getDocs(
          collection(db, 'users')
        );

        const data: any[] = [];

        snapshot.forEach((doc) => {

          const parent = doc.data();

          if (parent.role === 'parent') {

            data.push({
              id: doc.id,
              ...parent
            });

          }

        });

        setParents(data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchParents();

  }, []);

  // SEARCH
  const filtered = parents.filter((p) =>
    p.name?.toLowerCase().includes(search.toLowerCase())
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
          Parents List 👨‍👩‍👧
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
          placeholder="Search parent..."
          className="w-full bg-white border border-slate-100 p-4 pl-12 rounded-2xl shadow-sm outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filtered.map((p) => (

          <button
            key={p.id}
            onClick={() => onSelectParent(p.id)}
            className="card-3d w-full p-4 flex items-center justify-between text-left"
          >

            <div className="flex items-center gap-4">

              {/* AVATAR */}
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center border border-orange-100 p-2 overflow-hidden">

                <img
                  src={UPSIFS_LOGO_URL}
                  alt="UPSIFS Logo"
                  className="w-full h-full object-contain"
                />

              </div>

              {/* INFO */}
              <div>

                <h4 className="font-bold text-slate-800">
                  {p.name}
                </h4>

                <p className="text-[10px] text-slate-400 font-black uppercase">

                  {p.email}

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

export default ParentsList;