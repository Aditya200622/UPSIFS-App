export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
  PARENT = 'parent',
  MANAGEMENT = 'management'
}

export interface User {
  id: string;
  uid?: string;
  name: string;
  email: string;
  password: string;

  role: UserRole;

  avatar?: string;
  enrollmentNo?: string;
  department?: string;
  semester?: number;
  batch?: string;

  parentPhone?: string;
  parentId?: string;
  parentEmail?: string;

  designation?: string;
  school?: string;
  section?: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'Exam' | 'Event' | 'Holiday' | 'General';
  isPinned?: boolean;
}

export interface Lab {
  id: string;
  name: string;
  subject: string;
  faculty: string;
  time: string;
  batch: string;
  instructions: string[];
}

export interface Assignment {
  id: string;
  title: string;
  subject: string;
  deadline: string;
  status: 'Pending' | 'Submitted' | 'Graded';
  marks?: string;
  remarks?: string;
}

export interface Subject {
  id: string;
  name: string;
  attendance: number;
  units: Unit[];
}

export interface Unit {
  id: string;
  title: string;
  resources: Resource[];
}

export interface Resource {
  id: string;
  name: string;
  type: 'PDF' | 'PPT' | 'VIDEO';
  url: string;
}

export interface Grievance {
  id: string;
  category: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Resolved';
  date: string;
  isAnonymous: boolean;
}
export interface LeaveRequest {

  id: string;

  studentId: string;

  studentName: string;

  parentId?: string;

  from: string;

  to: string;

  reason: string;

  phone: string;

  status:
    | 'PENDING_PARENT'
    | 'PENDING_MANAGEMENT'
    | 'APPROVED'
    | 'REJECTED_PARENT'
    | 'REJECTED_MANAGEMENT';

  parentActionAt?: string;

}