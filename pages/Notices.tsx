import React, {
  useState,
  useEffect
} from 'react';

import {
  Bell,
  Pin,
  Calendar,
  ChevronRight,
  FileText,
  Image as ImageIcon
} from 'lucide-react';

import {
  collection,
  getDocs,
  orderBy,
  query
} from 'firebase/firestore';

import { db } from '../lib/firebase';

const Notices: React.FC = () => {

  const [filter, setFilter] =
    useState('All');

  const [notices, setNotices] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const categories = [
    'All',
    'Exam',
    'Event',
    'Holiday',
    'General'
  ];

  // ================= FETCH =================

  useEffect(() => {

    const fetchNotices =
      async () => {

      try {

        setLoading(true);

        const q = query(

          collection(
            db,
            'notices'
          ),

          orderBy(
            'createdAt',
            'desc'
          )

        );

        const snapshot =
          await getDocs(q);

        const data: any[] = [];

        snapshot.forEach((doc) => {

          data.push({

            id: doc.id,

            ...doc.data()

          });

        });

        console.log(
          'NOTICES:',
          data
        );

        setNotices(data);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchNotices();

  }, []);

  // ================= FILTER =================

  const filteredNotices =

    filter === 'All'

      ? notices

      : notices.filter(
          (n) =>
            n.category === filter
        );

  return (

    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">

            Campus Notices

          </h2>

          <p className="text-slate-500 font-medium">

            Stay updated with latest university circulars

          </p>

        </div>

        {/* FILTERS */}

        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto whitespace-nowrap">

          {categories.map((cat) => (

            <button

              key={cat}

              onClick={() =>
                setFilter(cat)
              }

              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === cat

                  ? 'bg-indigo-600 text-white'

                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >

              {cat}

            </button>

          ))}

        </div>

      </div>

      {/* LOADING */}

      {loading && (

        <div className="bg-white p-6 rounded-3xl text-center text-slate-400">

          Loading notices...

        </div>

      )}

      {/* EMPTY */}

      {!loading &&
        filteredNotices.length === 0 && (

          <div className="bg-white p-6 rounded-3xl text-center text-slate-400">

            No notices found

          </div>

        )}

      {/* NOTICES */}

      <div className="space-y-4">

        {filteredNotices.map((notice) => (

          <div

            key={notice.id}

            className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all relative overflow-hidden"

          >

            {/* PIN */}

            {notice.isPinned && (

              <div className="absolute top-0 right-0 p-3">

                <Pin
                  size={16}
                  className="text-rose-500 rotate-45"
                />

              </div>

            )}

            <div className="flex items-start gap-5">

              {/* ICON */}

              <div
                className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center ${
                  notice.category === 'Exam'

                    ? 'bg-amber-100 text-amber-600'

                    : notice.category === 'Holiday'

                    ? 'bg-teal-100 text-teal-600'

                    : 'bg-indigo-100 text-indigo-600'
                }`}
              >

                <Bell size={24} />

              </div>

              {/* CONTENT */}

              <div className="flex-1">

                {/* TOP */}

                <div className="flex items-center gap-3 mb-1 flex-wrap">

                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">

                    {notice.category}

                  </span>

                  <div className="w-1 h-1 rounded-full bg-slate-300"></div>

                  <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400">

                    <Calendar size={10} />

                    {notice.createdAt?.toDate

                      ? notice.createdAt
                          .toDate()
                          .toLocaleDateString()

                      : 'Today'}

                  </div>

                </div>

                {/* TITLE */}

                <h4 className="text-lg font-bold text-slate-800">

                  {notice.title}

                </h4>

                {/* CONTENT */}

                <p className="text-slate-600 text-sm mt-2 leading-relaxed">

                  {notice.content}

                </p>

                {/* IMAGE */}

                {notice.imageUrl && (

                  <img

                    src={notice.imageUrl}

                    alt="notice"

                    className="mt-4 rounded-2xl w-full max-h-80 object-cover border"

                  />

                )}

                {/* PDF */}

                {notice.pdfUrl && (

                  <a

                    href={notice.pdfUrl}

                    target="_blank"

                    rel="noreferrer"

                    className="mt-4 inline-flex items-center gap-2 px-4 py-3 bg-red-50 text-red-600 rounded-2xl font-semibold text-sm hover:bg-red-100 transition"

                  >

                    <FileText size={18} />

                    Open PDF

                  </a>

                )}

                {/* IMAGE LINK */}

                {notice.imageUrl && (

                  <a

                    href={notice.imageUrl}

                    target="_blank"

                    rel="noreferrer"

                    className="mt-4 ml-3 inline-flex items-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-2xl font-semibold text-sm hover:bg-indigo-100 transition"

                  >

                    <ImageIcon size={18} />

                    Open Image

                  </a>

                )}

                {/* READ */}

                <button className="mt-5 flex items-center gap-2 text-indigo-600 font-bold text-xs hover:underline">

                  Read Full Circular

                  <ChevronRight size={14} />

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

};

export default Notices;