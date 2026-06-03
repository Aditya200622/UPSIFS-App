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
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('');
  const [roll, setRoll] = useState('');
  const [semester, setSemester] = useState('');
  const [section, setSection] = useState('');
const [parentEmail, setParentEmail] = useState('');
const [parentPhone, setParentPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // 🔥 CREATE STUDENT
  const handleAddStudent = async () => {

  if (
  !name ||
  !email ||
  !password ||
  !phone ||
  !department ||
  !semester ||
  !roll ||
  !section ||
  !parentEmail ||
  !parentPhone
) {
      alert('Please fill all fields');
      return;
    }
if (phone.length !== 10) {
  alert('Student phone must be 10 digits');
  return;
}

if (parentPhone.length !== 10) {
  alert('Parent phone must be 10 digits');
  return;
}
    try {

      setLoading(true);

      // ✅ FIREBASE AUTH
      const userCredential =
      await createUserWithEmailAndPassword(
  auth,
  email.trim().toLowerCase(),
  password
);

      const firebaseUser = userCredential.user;

      // ✅ FIRESTORE SAVE
await setDoc(
  doc(db, 'users', firebaseUser.uid),
  {
    authId: firebaseUser.uid,
    name,
    email: email.trim().toLowerCase(),

    phone: `+91${phone}`,

    parentEmail: parentEmail.trim().toLowerCase(),

    parentPhone: `+91${parentPhone}`,

    role: 'student',

    department,

    semester: Number(semester),
    section,
roll,
    attendance: 0,

    marks: 0
  }
);

      alert('Student Added Successfully ✅');

      // RESET
      setName('');
      setEmail('');
      setPassword('');
      setPhone('');
      setDepartment('');
      setSemester('');
      setSection('');
      setRoll('');
      setParentEmail('');
      setParentPhone('');

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
        <input
  type="text"
  placeholder="Roll Number"
  value={roll}
  onChange={(e) => setRoll(e.target.value)}
  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
/>
        <select
  value={section}
  onChange={(e) => setSection(e.target.value)}
  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
>
  <option value="">Select Section</option>
  <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
  <option value="D">D</option>
</select>

      <input
  type="text"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) =>
    setPhone(
      e.target.value.replace(/\D/g, '')
    )
  }
  maxLength={10}
  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
/>
<input
  type="email"
  placeholder="Parent Email"
  value={parentEmail}
  onChange={(e) => setParentEmail(e.target.value)}
  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl font-medium text-slate-800 outline-none"
/>

<input
  type="text"
  placeholder="Parent Phone"
  value={parentPhone}
  onChange={(e) =>
    setParentPhone(
      e.target.value.replace(/\D/g, '')
    )
  }
  maxLength={10}
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