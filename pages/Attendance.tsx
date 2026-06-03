import React, { useEffect, useState } from 'react';
import { User } from '../types';

import {
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

import { db } from '../lib/firebase';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface AttendanceProps {
  user: User;
}

const Attendance: React.FC<AttendanceProps> = ({ user }) => {

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAttendance = async () => {

      try {

        setLoading(true);

        const q = query(
          collection(db, 'attendance'),
          where('studentId', '==', user.id)
        );

        const snapshot = await getDocs(q);

        const records = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const grouped: any = {};

        records.forEach((record: any) => {

          const subject = record.subject;

          if (!grouped[subject]) {

            grouped[subject] = {
              total: 0,
              present: 0,
            };

          }

          grouped[subject].total++;

          if (record.status === 'present') {
            grouped[subject].present++;
          }

        });

        const finalData = Object.keys(grouped).map((subject) => ({

          name: subject,

          attendance: Math.round(
            (grouped[subject].present /
              grouped[subject].total) *
              100
          ),

        }));

        setData(finalData);

      } catch (error) {

        console.error(error);

      } finally {

        setLoading(false);

      }

    };

    fetchAttendance();

  }, [user.id]);

  const overall =
    data.length > 0
      ? Math.round(
          data.reduce(
            (acc, curr) => acc + curr.attendance,
            0
          ) / data.length
        )
      : 0;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-8">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Attendance Tracker
          </h2>

          <p className="text-slate-500 font-medium">
            Viewing attendance for{' '}
            <span className="font-semibold text-indigo-600">
              {user.name}
            </span>
          </p>

        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-6 shadow-xl shadow-slate-100">

          <div className="relative w-20 h-20 flex items-center justify-center">

            <svg className="w-full h-full transform -rotate-90">

              <circle
                cx="40"
                cy="40"
                r="36"
                fill="transparent"
                stroke="#f1f5f9"
                strokeWidth="8"
              />

              <circle
                cx="40"
                cy="40"
                r="36"
                fill="transparent"
                stroke="#4f46e5"
                strokeWidth="8"
                strokeDasharray={226}
                strokeDashoffset={
                  226 - (226 * overall) / 100
                }
                strokeLinecap="round"
              />

            </svg>

            <span className="absolute text-xl font-black text-slate-800">
              {overall}%
            </span>

          </div>

          <div>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Overall Score
            </p>

            <h4 className="text-xl font-bold text-indigo-600">
              {overall >= 75
                ? 'Good Standing'
                : 'At Risk'}
            </h4>

          </div>

        </div>

      </div>

      {/* INFO CARDS */}

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-teal-50 p-6 rounded-3xl border border-teal-100">

          <CheckCircle2
            className="text-teal-600 mb-4"
            size={32}
          />

          <h4 className="font-bold text-slate-800">
            Regular
          </h4>

          <p className="text-xs text-slate-600 mt-1">
            Keep attending classes regularly.
          </p>

        </div>

        <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">

          <TrendingUp
            className="text-indigo-600 mb-4"
            size={32}
          />

          <h4 className="font-bold text-slate-800">
            Performance
          </h4>

          <p className="text-xs text-slate-600 mt-1">
            Maintain above 75% attendance.
          </p>

        </div>

        <div className="bg-rose-50 p-6 rounded-3xl border border-rose-100">

          <AlertTriangle
            className="text-rose-600 mb-4"
            size={32}
          />

          <h4 className="font-bold text-slate-800">
            Warning
          </h4>

          <p className="text-xs text-slate-600 mt-1">
            Below 75% may cause debarment.
          </p>

        </div>

      </div>

      {/* SUBJECT CARDS */}

      <div className="grid gap-5">

        {loading ? (

          <div className="bg-white p-8 rounded-3xl text-center">
            Loading attendance...
          </div>

        ) : data.length === 0 ? (

          <div className="bg-white p-8 rounded-3xl text-center">
            No attendance records found
          </div>

        ) : (

          data.map((subject, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
            >

              <div className="flex items-center justify-between mb-4">

                <div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {subject.name}
                  </h3>

                  <p className="text-sm text-slate-400 mt-1">
                    Subject Attendance
                  </p>

                </div>

                <div
                  className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                    subject.attendance >= 75
                      ? 'bg-green-100 text-green-600'
                      : 'bg-red-100 text-red-600'
                  }`}
                >
                  {subject.attendance}%
                </div>

              </div>

              <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden">

                <div
                  className={`h-full rounded-full ${
                    subject.attendance >= 75
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                  style={{
                    width: `${subject.attendance}%`,
                  }}
                />

              </div>

            </div>

          ))

        )}

      </div>

      {/* CHART */}

      {data.length > 0 && (

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">

          <h3 className="text-xl font-bold text-slate-800 mb-8">
            Subject-wise Analytics
          </h3>

          <div className="h-80 w-full">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  domain={[0, 100]}
                />

                <Tooltip />

                <Bar
                  dataKey="attendance"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                >

                  {data.map((entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={
                        entry.attendance < 75
                          ? '#f43f5e'
                          : '#4f46e5'
                      }
                    />

                  ))}

                </Bar>

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      )}

    </div>
  );
};

export default Attendance;