import React, {
  useState,
  useEffect
} from 'react';

import {
  ChevronLeft,
  UserPlus
} from 'lucide-react';

import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc
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

const AddParent: React.FC<Props> = ({ onBack }) => {

  const [loading, setLoading] =
    useState(false);

 
const [matchedStudent, setMatchedStudent] =
  useState<any>(null);
  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: '',
      phone: '',

    });

  // ================= FETCH STUDENTS =================

  

  // ================= HANDLE CHANGE =================

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    });

  };

  // ================= SUBMIT =================

  const handleSubmit = async () => {

   if (
  !formData.name ||
  !formData.email ||
  !formData.password ||
  !formData.phone
) {

      alert(
        'Please fill all fields'
      );

      return;

    }

    try {

      setLoading(true);

      // ================= CREATE AUTH ACCOUNT =================

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

      const parentAuthId =
        userCredential.user.uid;

      console.log(
        'PARENT AUTH ID:',
        parentAuthId
      );

      // ================= SAVE PARENT =================

      const parentRef =
        await addDoc(
          collection(db, 'users'),
          {

            authId:
              parentAuthId,

            name:
              formData.name,

            email:
              formData.email,

            password:
              formData.password,

           phone:
  `+91${formData.phone}`,
            role:
              'parent',

           
            createdAt:
              new Date()

          }
        );

      console.log(
        'Parent Firestore ID:',
        parentRef.id
      );

      // ================= FIND STUDENT =================

const studentSnapshot =
  await getDocs(
    collection(db, 'users')
  );

let linkedStudent = null;

for (const studentDoc of studentSnapshot.docs) {

  const studentData = studentDoc.data();

  if (
    studentData.role === 'student' &&
    (
      studentData.parentEmail === formData.email ||
      studentData.parentPhone === `+91${formData.phone}`
    )
  ) {

    linkedStudent = {
      id: studentDoc.id,
      ...studentData
    };

 await updateDoc(
  doc(db, 'users', studentDoc.id),
  {
    parentId: parentRef.id,
    parentAuthId: parentAuthId,
    parentEmail: formData.email,
    parentPhone: `+91${formData.phone}`
  }
);
setMatchedStudent(linkedStudent);
    break;
  }
}
if (!linkedStudent) {

  alert(
    'Parent Added Successfully ✅\n\nNo matching student found.'
  );

} else {

  alert(
    'Parent Added Successfully ✅\n\nStudent Linked Successfully 🎉'
  );

}

      // ================= RESET =================

      setFormData({
        name: '',
        email: '',
        password: '',
        phone: ''
      });

    } catch (error: any) {

      console.error(error);

      if (
        error.code ===
        'auth/email-already-in-use'
      ) {

        alert(
          'Email already exists'
        );

      } else {

        alert(
          'Failed to add parent'
        );

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
          Add Parent 👨‍👩‍👧
        </h2>

      </header>

      {/* FORM */}
      <div className="card-3d p-6 space-y-4">

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Parent Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Parent Email"
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

        {/* PHONE */}
        <input
          type="text"
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
        {matchedStudent && (
  <div className="bg-green-50 border border-green-200 rounded-xl p-3">

    <p className="font-semibold text-green-700">
      Student Linked ✅
    </p>

    <p>{matchedStudent.name}</p>

    <p className="text-sm text-gray-500">
      {matchedStudent.email}
    </p>

  </div>
)}

        
      

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-4 bg-orange-500 text-white rounded-2xl font-bold flex items-center justify-center gap-2"
        >

          <UserPlus size={20} />

          {loading
            ? 'Creating Parent...'
            : 'Add Parent'}

        </button>

      </div>

    </div>

  );

};

export default AddParent;