import React, { useState } from 'react';

import { User, UserRole } from '../types';

import { UPSIFS_LOGO_URL } from '../constants';

import {

  GraduationCap,

  UserCircle,

  Users,

  ShieldCheck,

  Info,

  Mail,

  Phone

} from 'lucide-react';

import {

  signInWithEmailAndPassword

} from 'firebase/auth';

import {

  collection,

  getDocs,

  query,

  where

} from 'firebase/firestore';

import {

  auth,

  db

} from '../lib/firebase';

interface LoginProps {

  selectedRole: UserRole | null;

  onSelectRole: (

    role: UserRole

  ) => void;

  onLogin: (

    user: User

  ) => void;

}

const Login: React.FC<LoginProps> = ({

  selectedRole,

  onSelectRole,

  onLogin

}) => {

  const [mode, setMode] =
    useState<'email' | 'phone'>(
      'email'
    );

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [phone, setPhone] =
    useState('');

  const [otpSent, setOtpSent] =
    useState(false);

  const [otp, setOtp] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  // ================= ROLES =================

  const roles = [

    {

      id: UserRole.STUDENT,

      label: 'Student',

      icon: GraduationCap,

      color: 'text-indigo-500'

    },

    {

      id: UserRole.TEACHER,

      label: 'Teachers',

      icon: UserCircle,

      color: 'text-teal-600'

    },

    {

      id: UserRole.PARENT,

      label: 'Parents',

      icon: Users,

      color: 'text-orange-500'

    },

    {

      id: UserRole.MANAGEMENT,

      label: 'Management',

      icon: ShieldCheck,

      color: 'text-rose-700'

    }

  ];

  // ================= LOGIN =================

  const handleEmailLogin =
    async () => {

      if (!selectedRole) {

        alert(
          'Please select role first'
        );

        return;

      }

      if (!email || !password) {

        alert(
          'Please enter email & password'
        );

        return;

      }

      try {

        setLoading(true);

        // ================= FIREBASE AUTH =================

        const userCredential =
          await signInWithEmailAndPassword(

            auth,

            email.trim(),

            password

          );

        const firebaseUser =
          userCredential.user;

        console.log(

          'FIREBASE UID:',

          firebaseUser.uid

        );

        // ================= FIND USER IN FIRESTORE =================

        const q = query(

          collection(db, 'users'),

          where(

            'email',

            '==',

            email.trim()

          )

        );

        const snapshot =
          await getDocs(q);

        console.log(

          'SNAPSHOT EMPTY:',

          snapshot.empty

        );

        // ================= USER NOT FOUND =================

        if (snapshot.empty) {

          alert(
            'User data not found'
          );

          setLoading(false);

          return;

        }

        // ================= USER DATA =================

        const userDoc =
          snapshot.docs[0];

        const userData =
          userDoc.data();

        console.log(
          'USER DOC ID:',
          userDoc.id
        );

        console.log(
          'USER DATA:',
          userData
        );

        // ================= ROLE CHECK =================

        const firestoreRole =
          userData.role
            ?.toString()
            .toLowerCase()
            .trim();

        const selectedUserRole =
          selectedRole
            ?.toString()
            .toLowerCase()
            .trim();

        console.log(
          'Firestore Role:',
          firestoreRole
        );

        console.log(
          'Selected Role:',
          selectedUserRole
        );

        if (

          firestoreRole !==
          selectedUserRole

        ) {

          alert(
            'Wrong role selected'
          );

          setLoading(false);

          return;

        }

        // ================= SUCCESS =================

        console.log(
          'LOGIN SUCCESS'
        );

        onLogin({

          id: userDoc.id,

          uid: firebaseUser.uid,

          name:
            userData.name || '',

          email:
            userData.email || '',

          password: '',

          role:
            firestoreRole

        } as User);

      } catch (error: any) {

        console.error(error);

        alert(

          error?.message ||

          'Login failed'

        );

      } finally {

        setLoading(false);

      }

    };

  // ================= OTP =================

  const handleSendOtp = () => {

    if (

      !phone ||

      phone.length < 10

    ) {

      alert(
        'Enter valid phone number'
      );

      return;

    }

    setOtpSent(true);

  };

  const handleVerifyOtp = () => {

    alert(

      'Phone login disabled for now. Use email login.'

    );

  };

  return (

    <div className="min-h-screen bg-[#f7f9fc] flex flex-col">

      <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-10">

        {/* LOGO */}

        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-[0_12px_40px_-8px_rgba(0,0,0,0.08)] border border-slate-100 p-2">

          <img

            src={UPSIFS_LOGO_URL}

            alt="UPSIFS Logo"

            className="w-full h-full object-contain"

          />

        </div>

        {/* ROLE SELECT */}

        <div className="w-full max-w-sm grid grid-cols-2 gap-5">

          {roles.map((role) => {

            const active =
              selectedRole === role.id;

            return (

              <button

                key={role.id}

                onClick={() =>
                  onSelectRole(role.id)
                }

                className={`card-3d aspect-square rounded-[22px] flex flex-col items-center justify-center p-6 space-y-5 border transition

                ${

                  active

                    ? 'border-indigo-600 bg-indigo-50'

                    : 'border-transparent'

                }

              `}

              >

                <role.icon

                  className={role.color}

                  size={32}

                  strokeWidth={1.5}

                />

                <span className="font-medium text-slate-700 text-sm tracking-wide">

                  {role.label}

                </span>

              </button>

            );

          })}

        </div>

        {/* LOGIN CARD */}

        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 space-y-4">

          {/* TOGGLE */}

          <div className="flex gap-2">

            <button

              onClick={() =>
                setMode('email')
              }

              className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-2

              ${

                mode === 'email'

                  ? 'bg-slate-900 text-white'

                  : 'bg-slate-100 text-slate-600'

              }

            `}

            >

              <Mail size={16} />

              Email

            </button>

            <button

              onClick={() =>
                setMode('phone')
              }

              className={`flex-1 py-2 rounded-lg text-sm flex items-center justify-center gap-2

              ${

                mode === 'phone'

                  ? 'bg-slate-900 text-white'

                  : 'bg-slate-100 text-slate-600'

              }

            `}

            >

              <Phone size={16} />

              Phone

            </button>

          </div>

          {/* EMAIL LOGIN */}

          {mode === 'email' && (

            <div className="space-y-3">

              <input

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                placeholder="College Email"

                className="w-full border rounded-lg px-4 py-2 text-sm"

              />

              <input

                type="password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                placeholder="Password"

                className="w-full border rounded-lg px-4 py-2 text-sm"

              />

              <button

                disabled={
                  !selectedRole || loading
                }

                onClick={
                  handleEmailLogin
                }

                className="w-full py-2 rounded-lg bg-indigo-900 text-white disabled:opacity-50"

              >

                {loading

                  ? 'Logging in...'

                  : 'Login'}

              </button>

            </div>

          )}

          {/* PHONE LOGIN */}

          {mode === 'phone' && (

            <div className="space-y-3">

              <input

                value={phone}

                onChange={(e) =>
                  setPhone(e.target.value)
                }

                placeholder="Registered Phone Number"

                className="w-full border rounded-lg px-4 py-2 text-sm"

              />

              {!otpSent ? (

                <button

                  disabled={!selectedRole}

                  onClick={
                    handleSendOtp
                  }

                  className="w-full py-2 rounded-lg bg-indigo-900 text-white disabled:opacity-50"

                >

                  Send OTP

                </button>

              ) : (

                <>

                  <input

                    value={otp}

                    onChange={(e) =>
                      setOtp(e.target.value)
                    }

                    placeholder="Enter OTP"

                    className="w-full border rounded-lg px-4 py-2 text-sm"

                  />

                  <button

                    onClick={
                      handleVerifyOtp
                    }

                    className="w-full py-2 rounded-lg bg-indigo-900 text-white"

                  >

                    Verify & Login

                  </button>

                </>

              )}

            </div>

          )}

        </div>

      </div>

      {/* ABOUT */}

      <button className="h-16 bg-white border-t border-slate-100 flex items-center justify-center gap-2.5 text-slate-500 font-semibold text-xs uppercase tracking-widest active:bg-slate-50 transition-colors">

        <Info

          size={16}

          strokeWidth={2}

        />

        About Us

      </button>

    </div>

  );

};

export default Login;