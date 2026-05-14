import React, { useState } from 'react';

import { ChevronLeft, UserPlus } from 'lucide-react';

import {
  createUserWithEmailAndPassword
} from 'firebase/auth';

import {
  doc,
  setDoc
} from 'firebase/firestore';

import { auth, db } from '../../lib/firebase';

interface Props {
  onBack: () => void;
}

const AddStudent: React.FC<Props> = ({ onBack }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('');

  const [loading, setLoading] = useState(false);

  // 🔥 CREATE STUDENT
  const handleAddStudent = async () => {

    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !semester
    ) {
      alert('Please fill all fields');
      return;
    }

    try {

      setLoading(true);

      // ✅ FIREBASE AUTH
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const firebaseUser = userCredential.user;

      // ✅ FIRESTORE SAVE
      await setDoc(
        doc(db, 'users', firebaseUser.uid),
        {
          name,
          email,
          role: 'student',
          department,
          semester: Number(semester),
          attendance: 0,
          marks: 0
        }
      );

      alert('Student Added Successfully ✅');

      // RESET
      setName('');
      setEmail('');
      setPassword('');
      setDepartment('');
      setSemester('');

    } catch (error: any) {

      console.error(error);

      alert(error.message);

    } finally {

      setLoading(false);

    }

  };

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
          Add Student 👨‍🎓
        </h2>

      </header>

      {/* FORM */}
      <div className="card-3d p-6 space-y-4">

        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
        />

        <input
          type="email"
          placeholder="Student Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
        />

        <input
          type="number"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
        />

      </div>

      {/* BUTTON */}
      <button
        onClick={handleAddStudent}
        disabled={loading}
        className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 active:scale-95 transition-all"
      >

        <UserPlus size={20} />

        {loading
          ? 'Creating Student...'
          : 'Add Student'}

      </button>

    </div>
  );
};

export default AddStudent;