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

  const [students, setStudents] =
    useState<any[]>([]);

  const [formData, setFormData] =
    useState({
      name: '',
      email: '',
      password: '',
      phone: '',
      childEmail: ''
    });

  // ================= FETCH STUDENTS =================

  useEffect(() => {

    const fetchStudents = async () => {

      try {

        const snapshot =
          await getDocs(
            collection(db, 'users')
          );

        const data: any[] = [];

        snapshot.forEach((d) => {

          const user = d.data();

          if (user.role === 'student') {

            data.push({
              id: d.id,
              ...user
            });

          }

        });

        setStudents(data);

      } catch (error) {

        console.error(error);

      }

    };

    fetchStudents();

  }, []);

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
      !formData.childEmail
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
              formData.phone,

            role:
              'parent',

            childEmail:
              formData.childEmail,

            createdAt:
              new Date()

          }
        );

      console.log(
        'Parent Firestore ID:',
        parentRef.id
      );

      // ================= FIND STUDENT =================

      const selectedStudent =
        students.find(
          (s) =>
            s.email ===
            formData.childEmail
        );

      // ================= LINK STUDENT =================

      if (selectedStudent) {

        await updateDoc(
          doc(
            db,
            'users',
            selectedStudent.id
          ),
          {

            parentId:
              parentRef.id,

            parentAuthId:
              parentAuthId,

            parentEmail:
              formData.email,

            parentPhone:
              formData.phone

          }
        );

        console.log(
          'Student linked with parent ✅'
        );

      }

      alert(
        'Parent Added Successfully ✅'
      );

      // ================= RESET =================

      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        childEmail: ''
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
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        />

        {/* STUDENT DROPDOWN */}
        <select
          name="childEmail"
          value={formData.childEmail}
          onChange={handleChange}
          className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none"
        >

          <option value="">
            Select Student
          </option>

          {students.map((student) => (

            <option
              key={student.id}
              value={student.email}
            >

              {student.name}
              {' '}
              ({student.email})

            </option>

          ))}

        </select>

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