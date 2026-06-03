import React, { useState } from 'react';

import { ChevronLeft, UserPlus } from 'lucide-react';

import {
  collection,
  addDoc
} from 'firebase/firestore';

import {
  createUserWithEmailAndPassword
} from 'firebase/auth';

import {
  db,
  auth
} from '../../lib/firebase';

interface Props {
  onBack: () => void;
}

const AddTeacher: React.FC<Props> = ({ onBack }) => {

  const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  phone: '',
  department: ''
});
  // ================= HANDLE INPUT =================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  // ================= SUBMIT =================

  const handleSubmit = async () => {

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.department
    ) {

      alert('Please fill all fields');

      return;

    }

    try {

      setLoading(true);

      // 🔥 CREATE AUTH USER
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const uid = userCredential.user.uid;

      // 🔥 SAVE FIRESTORE USER
    await addDoc(collection(db, 'users'), {

  authId: uid,

  uid,

  name: formData.name,

  email: formData.email,

  phone: `+91${formData.phone}`,

  department: formData.department,

  role: 'teacher',

  createdAt: new Date()

});
      alert('Teacher Added Successfully ✅');

      // RESET
    setFormData({
  name: '',
  email: '',
  password: '',
  phone: '',
  department: ''
});

    } catch (error: any) {

      console.error(error);

      // 🔥 FIREBASE ERRORS
      if (
        error.code === 'auth/email-already-in-use'
      ) {

        alert('Email already exists');

      } else if (
        error.code === 'auth/weak-password'
      ) {

        alert('Password should be at least 6 characters');

      } else {

        alert('Failed to add teacher');

      }

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

          Add Teacher 👨‍🏫

        </h2>

      </header>

      {/* FORM */}

      <div className="card-3d p-6 space-y-4">

        {/* NAME */}

        <input
          type="text"
          name="name"
          placeholder="Teacher Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        />

        {/* EMAIL */}

        <input
          type="email"
          name="email"
          placeholder="Teacher Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        />

        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        />
        <input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  value={formData.phone}
  onChange={(e) =>
    setFormData({
      ...formData,
      phone: e.target.value.replace(/\D/g, '')
    })
  }
  maxLength={10}
  className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
/>

        {/* DEPARTMENT */}

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        />

        {/* BUTTON */}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-all"
        >

          <UserPlus size={20} />

          {loading
            ? 'Creating Teacher...'
            : 'Add Teacher'}

        </button>

      </div>

    </div>

  );

};

export default AddTeacher;