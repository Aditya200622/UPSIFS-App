import React, {
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';

import { LeaveRequest } from '../types';

import {

  collection,

  getDocs,

  addDoc,

  updateDoc,

  doc,

  orderBy,

  query

} from 'firebase/firestore';

import { db } from '../lib/firebase';

type LeaveCtx = {

  leaves: LeaveRequest[];

  addLeave: (
    l: LeaveRequest
  ) => Promise<void>;

  approve: (
    id: string
  ) => Promise<void>;

  reject: (
    id: string
  ) => Promise<void>;

};

const Ctx =
  createContext<LeaveCtx | null>(
    null
  );

export const LeaveProvider:
React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {

  const [leaves, setLeaves] =
    useState<LeaveRequest[]>([]);

  // ================= FETCH =================

  const fetchLeaves = async () => {

    try {

      const q = query(

        collection(
          db,
          'leave_requests'
        ),

        orderBy(
          'created_at',
          'desc'
        )

      );

      const snapshot =
        await getDocs(q);

      const data =
        snapshot.docs.map((d) => ({

          id: d.id,

          ...d.data()

        }));

      setLeaves(
        data as LeaveRequest[]
      );

    } catch (error) {

      console.error(error);

    }

  };

  useEffect(() => {

    fetchLeaves();

  }, []);

  // ================= ADD =================

  const addLeave = async (
    l: LeaveRequest
  ) => {

    try {

      await addDoc(

        collection(
          db,
          'leave_requests'
        ),

        l

      );

      fetchLeaves();

    } catch (error) {

      console.error(error);

    }

  };

  // ================= APPROVE =================

  const approve = async (
    id: string
  ) => {

    try {

      await updateDoc(

        doc(
          db,
          'leave_requests',
          id
        ),

        {

          status:
            'PENDING_MANAGEMENT',

          parentActionAt:
            new Date().toISOString()

        }

      );

      fetchLeaves();

    } catch (error) {

      console.error(error);

    }

  };

  // ================= REJECT =================

  const reject = async (
    id: string
  ) => {

    try {

      await updateDoc(

        doc(
          db,
          'leave_requests',
          id
        ),

        {

          status:
            'REJECTED_PARENT',

          parentActionAt:
            new Date().toISOString()

        }

      );

      fetchLeaves();

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <Ctx.Provider
      value={{

        leaves,

        addLeave,

        approve,

        reject

      }}
    >

      {children}

    </Ctx.Provider>

  );

};

// ================= HOOK =================

export const useLeaves = () => {

  const c =
    useContext(Ctx);

  if (!c) {

    throw new Error(

      'useLeaves must be used inside LeaveProvider'

    );

  }

  return c;

};