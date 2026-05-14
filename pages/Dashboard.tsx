import React, { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { DASHBOARD_CONFIGS } from '../constants';
import { ChevronRight } from 'lucide-react';
import {
  collection,
  getDocs
} from 'firebase/firestore';

import { db } from '../lib/firebase';

interface DashboardProps {
  user: User;
  setCurrentPage: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, setCurrentPage }) => {
  const [studentCount, setStudentCount] = useState(0);
const [teacherCount, setTeacherCount] = useState(0);
const [parentCount, setParentCount] = useState(0);
const [showSOS, setShowSOS] = useState(false);
  const config =
    DASHBOARD_CONFIGS[user.role] ||
    DASHBOARD_CONFIGS[UserRole.STUDENT];

  const ROLE_THEME: Record<UserRole, any> = {
    [UserRole.STUDENT]: {
      accent: "bg-indigo-600",
      iconBg: "bg-indigo-100",
    },
    [UserRole.TEACHER]: {
      accent: "bg-teal-600",
      iconBg: "bg-teal-100",
    },
    [UserRole.PARENT]: {
      accent: "bg-orange-500",
      iconBg: "bg-orange-100",
    },
    [UserRole.MANAGEMENT]: {
      accent: "bg-rose-700",
      iconBg: "bg-rose-100",
    },
  };

  const theme = ROLE_THEME[user.role];
useEffect(() => {

  const fetchCounts = async () => {

    try {

      const usersRef = collection(db, 'users');

      const snapshot = await getDocs(usersRef);

      let students = 0;
      let teachers = 0;
      let parents = 0;

      snapshot.forEach((doc) => {

        const data = doc.data();

        if (data.role === 'student') {
          students++;
        }

        if (data.role === 'teacher') {
          teachers++;
        }

        if (data.role === 'parent') {
          parents++;
        }

      });

      setStudentCount(students);
      setTeacherCount(teachers);
      setParentCount(parents);

    } catch (error) {

      console.error(error);

    }

  };

  fetchCounts();

}, []);
  return (
    <div className="p-5 space-y-6 max-w-lg mx-auto">

      {/* ================= PRIMARY CARD ================= */}
      <section
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 text-center cursor-pointer"
        onClick={() => config.primary1.id && setCurrentPage(config.primary1.id)}
      >
        {config.primary1.value ? (
          <>
            <span className="text-5xl font-semibold text-slate-800">
              {user.role === UserRole.MANAGEMENT
  ? studentCount
  : config.primary1.value}
            </span>
            <p className="text-xs font-semibold text-slate-400 mt-3 uppercase tracking-widest">
              {config.primary1.label}
            </p>
          </>
        ) : (
          <>
            <div className="text-3xl mb-3">
              {config.primary1.emoji}
            </div>
            <h4 className="font-semibold text-xl text-slate-800">
              {config.primary1.label}
            </h4>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              {config.primary1.sub}
            </p>
          </>
        )}

        <div
          className={`w-14 h-1.5 ${config.primary1.accent || theme.accent}
          rounded-full mt-5 mx-auto opacity-40`}
        ></div>
      </section>

      {/* ================= SECONDARY CARD ================= */}
      <section
        className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 flex items-center justify-between cursor-pointer"
        onClick={() => config.primary2.id && setCurrentPage(config.primary2.id)}
      >
        <div className="flex items-center gap-4">

          <div
            className={`w-14 h-14 rounded-2xl ${theme.iconBg}
            flex items-center justify-center text-2xl`}
          >
            {config.primary2.emoji}
          </div>

          <div>
            <h4 className="font-semibold text-lg text-slate-800">
              {config.primary2.label}
            </h4>
            <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">
              {config.primary2.sub}
            </p>
          </div>

        </div>

        <ChevronRight size={18} className="text-slate-300" />
      </section>

      {/* ================= GRID ================= */}
      <section className="grid grid-cols-2 gap-5">
        {user.role === UserRole.MANAGEMENT && (
  <section className="grid grid-cols-2 gap-5">

    {/* TEACHERS */}
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-4xl font-bold text-slate-800">
        {teacherCount}
      </h2>

      <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">
        Total Teachers
      </p>
    </div>

    {/* PARENTS */}
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <h2 className="text-4xl font-bold text-slate-800">
        {parentCount}
      </h2>

      <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">
        Total Parents
      </p>
    </div>

  </section>
)}
        {config.grid.map((card: any) => (
          <button
            key={card.id}
            onClick={() => setCurrentPage(card.id)}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 text-left"
          >
            <div
              className={`w-14 h-14 rounded-2xl ${card.bg || theme.iconBg}
              flex items-center justify-center mb-6 text-2xl`}
            >
              {card.emoji}
            </div>

            <h4 className="font-semibold text-slate-800 text-sm">
              {card.label}
            </h4>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
              {card.sub}
            </p>
          </button>
        ))}
      </section>

      {/* ===== STUDENT : LEAVE STATUS CARD ===== */}
      {user.role === UserRole.STUDENT && (
        <div className="mt-8">
          <div
            onClick={() => setCurrentPage('leave_status')}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <div className={`w-14 h-14 ${theme.iconBg} flex items-center justify-center rounded-2xl mb-4 text-2xl`}>
              📄
            </div>
            <h3 className="font-semibold">Leave Status</h3>
            <p className="text-sm text-gray-500 mt-1">
              Parent approval status
            </p>
          </div>
        </div>
      )}

      {/* ===== PARENT : LEAVE APPROVAL CARD ===== */}
      {user.role === UserRole.PARENT && (
        <div className="mt-8">
          <div
            onClick={() => setCurrentPage('leave_parent')}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <div className={`w-14 h-14 ${theme.iconBg} flex items-center justify-center rounded-2xl mb-4 text-2xl`}>
              📝
            </div>
            <h3 className="font-semibold">Leave Requests</h3>
            <p className="text-sm text-gray-500 mt-1">
              Pending student approvals
            </p>
          </div>
        </div>
      )}

      {/* ===== MANAGEMENT : APPROVED LEAVES CARD ===== */}
      {user.role === UserRole.MANAGEMENT && (
        <div className="mt-8">
          <div
            onClick={() => setCurrentPage('approved_leaves')}
            className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
          >
            <div className={`w-14 h-14 ${theme.iconBg} flex items-center justify-center rounded-2xl mb-4 text-2xl`}>
              ✅
            </div>
            <h3 className="font-semibold">Approved Leaves</h3>
            <p className="text-sm text-gray-500 mt-1">
              Parent verified requests
            </p>
          </div>
        </div>
      )}
      {/* ===== STUDENT : SOS EMERGENCY CARD ===== */}
{user.role === UserRole.STUDENT && (
  <div className="mt-8">
    <div
onClick={() => setShowSOS(true)}
      className="bg-red-50 border border-red-200 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer"
    >
      <div className="w-14 h-14 bg-red-100 flex items-center justify-center rounded-2xl mb-4 text-2xl">
        🚨
      </div>

      <h3 className="font-semibold text-red-600">SOS Emergency</h3>
      <p className="text-sm text-red-400 mt-1">
        Tap to call parent & share live location
      </p>
    </div>
  </div>
)}
{showSOS && (
  <div 
  className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  onClick={() => setShowSOS(false)}
>
    <div 
  className="bg-white rounded-3xl p-6 w-[90%] max-w-sm shadow-xl"
  onClick={(e) => e.stopPropagation()}
>

      <h2 className="text-lg font-semibold mb-4 text-center">
        🚨 Emergency Options
      </h2>

      {/* CALL */}
      <button
        onClick={() => {
          const parentNumber = user.parentPhone || "8707760882";
          window.open(`tel:${parentNumber}`, "_self");
          setShowSOS(false);
        }}
        className="w-full mb-3 py-3 rounded-xl bg-red-100 text-red-600 font-semibold"
      >
        📞 Call Parent
      </button>

      {/* LOCATION */}
      <button
        onClick={() => {
          const parentNumber = user.parentPhone || "8707760882";

          navigator.geolocation.getCurrentPosition((pos) => {
            const { latitude, longitude } = pos.coords;
            const link = `https://maps.google.com/?q=${latitude},${longitude}`;

            const msg = `📍 My Location: ${link}`;
            window.location.href = `https://wa.me/${parentNumber}?text=${encodeURIComponent(msg)}`;
          });

          setShowSOS(false);
        }}
        className="w-full mb-3 py-3 rounded-xl bg-blue-100 text-blue-600 font-semibold"
      >
        📍 Share Location
      </button>

      {/* FULL SOS */}
      <button
        onClick={() => {
          const parentNumber = user.parentPhone || "8707760882";

          const audio = new Audio("https://www.soundjay.com/misc/sounds/siren.wav");
          audio.play();
navigator.geolocation.getCurrentPosition(
  (pos) => {
    const { latitude, longitude } = pos.coords;
    const link = `https://maps.google.com/?q=${latitude},${longitude}`;

    const msg = `🚨 SOS ALERT!\nI need help!\n📍 Location: ${link}`;

    // WhatsApp
    window.location.href = `https://wa.me/${parentNumber}?text=${encodeURIComponent(msg)}`;

    // Call (mobile only)
    if (/Mobi|Android/i.test(navigator.userAgent)) {
      setTimeout(() => {
        window.open(`tel:${parentNumber}`, "_self");
      }, 1500);
    }
  },
  () => {
    alert("Location allow karo ⚠️");
  }
);

          setShowSOS(false);
        }}
        className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold"
      >
        🚨 FULL SOS
      </button>

      {/* CLOSE */}
      <button
        onClick={() => setShowSOS(false)}
        className="w-full mt-3 text-gray-400 text-sm"
      >
        Cancel
      </button>

    </div>
  </div>
)}
      <div className="h-10"></div>
    </div>
  );
};

export default Dashboard;