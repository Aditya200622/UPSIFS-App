import { UserRole, Notice, Lab, Assignment, Subject, Grievance } from './types';
import { 
   
  BookOpen, 
  FileText, 
  Bell, 
  CreditCard, 
  MessageSquare,
  
  UploadCloud,
  
  Users,
  Calendar,
  
  TrendingUp,
  LayoutGrid,
  ShieldCheck,
  UserPlus,
  Pencil
} from 'lucide-react';

export const UPSIFS_LOGO_URL = "/upsifs-logo.png";


// ================= USERS =================



// ================= DASHBOARD CONFIG =================

export const DASHBOARD_CONFIGS: Record<UserRole, any> = {
  [UserRole.STUDENT]: {
    primary1: {
      id: 'attendance',
      label: 'Attendance Percentage',
      value: '82%',
      sub: 'Good Standing',
      accent: 'bg-indigo-600'
    },
    primary2: {
      id: 'timetable',
      label: 'Time Table',
      sub: 'Next: Machine Learning at 10:00 AM',
      icon: Calendar,
      emoji: '📅'
    },
    
    grid: [
  { id: 'lms', label: 'Study Material', icon: BookOpen, emoji: '📚', sub: 'Units & PDFs' },
  { id: 'results', label: 'Results', icon: FileText, emoji: '📊', sub: 'SGPA & Marks' },
  { id: 'notices', label: 'Notices', icon: Bell, emoji: '🔔', sub: 'Campus Updates' },
  { id: 'fee', label: 'Fee', icon: CreditCard, emoji: '💳', sub: 'Pay Online' },
  {
  id: 'leave_student',
  label: 'Apply Leave',
  icon: FileText,
  emoji: '📝',
  sub: 'Request leave approval'
},
],
    
    
    support: {
  id: 'grievance',
  label: 'Student Support',
  sub: 'Help Desk & Grievance',
  icon: MessageSquare,
  emoji: '💬'
}
  },

  [UserRole.TEACHER]: {
    primary1: {
      id: 'mark_attendance',
      label: "Mark Attendance",
      sub: "Verify today's student presence",
      emoji: '✅',
      accent: 'bg-teal-600'
    },
    primary2: {
      id: 'timetable',
      label: "Time Table",
      sub: "View your weekly schedule",
      icon: Calendar,
      emoji: '📅'
    },
    grid: [
  { id: 'upload_ppt', label: 'Upload PPT', icon: UploadCloud, emoji: '📤', sub: 'Add Study Material' },
  { id: 'upload_marks', label: 'Upload Marks', icon: FileText, emoji: '📝', sub: 'Enter Scores' },
  { id: 'edit_timetable', label: 'Edit Timetable', icon: Pencil, emoji: '✏️', sub: 'Adjust session hours' },
  { id: 'students_list', label: 'Students List', icon: Users, emoji: '👥', sub: 'Class Directory' }
],
   support: {
  id: 'queries',
  label: 'Respond to Queries',
  sub: 'Answer student doubts',
  icon: MessageSquare,
  emoji: '💬'
}
  },

  [UserRole.PARENT]: {
    primary1: {
      id: 'attendance',
      label: 'Attendance Summary',
      value: '84%',
      sub: 'Consistent Performance',
      accent: 'bg-orange-500'
    },
    primary2: {
      id: 'fee',
      label: 'Fee Status',
      sub: 'Next Installment due in 12 days',
      icon: CreditCard,
      emoji: '💳'
    },
   grid: [
  { id: 'results', label: 'Results', icon: FileText, emoji: '📊', sub: 'Mid-Sem Marks' },
  { id: 'notices', label: 'Notices', icon: Bell, emoji: '🔔', sub: 'Parent Notifications' },
  { id: 'timetable', label: 'Timetable', icon: Calendar, emoji: '📅', sub: 'View Class Hours' },
  { id: 'calendar', label: 'Academic Calendar', icon: TrendingUp, emoji: '📆', sub: 'Exam & Holidays' },
  {
  id: 'leave_parent',
  label: 'Leave Approval',
  icon: FileText,
  emoji: '📝',
  sub: 'Approve student leaves'
},
],
    support: {
      id: 'contact',
      label: 'Contact Faculty',
      sub: 'Speak to Class Teacher',
      emoji: '📞'
    }
  },

  [UserRole.MANAGEMENT]: {
    primary1: {
      id: 'reports',
      label: 'Total Students',
      value: '1,450',
      sub: '+12% from last year',
      accent: 'bg-rose-700'
    },
    primary2: {
      id: 'approvals',
      label: 'Pending Requests',
      sub: '43 Approvals required',
      icon: ShieldCheck,
      emoji: '🛡️'
    },
grid: [
  { id: 'add_notice', label: 'Notice Mgmt', icon: Bell, emoji: '📢', sub: 'Publish Updates' },

  { id: 'events', label: 'Events', icon: LayoutGrid, emoji: '🎉', sub: 'Campus Activities' },

  { id: 'grievance', label: 'Grievances', icon: MessageSquare, emoji: '💬', sub: 'Resolve Tickets' },

  { id: 'students_list', label: 'Students List', icon: Users, emoji: '👥', sub: 'View All Students' },

  { id: 'add_student', label: 'Add Student', icon: UserPlus, emoji: '👨‍🎓', sub: 'Create Student Account' },
  { id: 'teachers_list', label: 'Teachers List', icon: Users, emoji: '👨‍🏫', sub: 'View All Teachers' },
  {
  id: 'add_teacher',
  label: 'Add Teacher',
  icon: UserPlus,
  emoji: '👨‍🏫',
  sub: 'Create Teacher Account'
},
{
  id: 'parents_list',
  label: 'Parents List',
  icon: Users,
  emoji: '👨‍👩‍👧',
  sub: 'View All Parents'
},

{
  id: 'add_parent',
  label: 'Add Parent',
  icon: UserPlus,
  emoji: '➕',
  sub: 'Create Parent Account'
}
],
    support: {
  id: 'reports',
  label: 'Reports & Analytics',
  sub: 'Financial & Academic Reports',
  icon: TrendingUp,
  emoji: '📊'
}
  }
};


// ================= MOCK USER FOR LEAVE =================

export const MOCK_USER_STUDENT = {
  id: 'S1',
  name: 'Aditya Mishra',
  email: 'adityam.2025@upsifs.ac.in',
  role: UserRole.STUDENT
};


// ================= MOCK LEAVE REQUESTS =================

export const MOCK_LEAVE_REQUESTS = [
  {
    id: 'L1',
    studentId: 'S1',
    studentName: 'Aditya Mishra',
    from: '2024-07-10T09:00',
    to: '2024-07-12T17:00',
    reason: 'Medical Leave',
    phone: '9876543210',
    status: 'PENDING_PARENT'
  }
];
// ================= MOCK SUBJECTS =================

export const MOCK_SUBJECTS: Subject[] = [
  {
    id: 'S1',
    name: 'Machine Learning',
    attendance: 85,
    units: []
  },
  {
    id: 'S2',
    name: 'Database Management',
    attendance: 72,
    units: []
  },
  {
    id: 'S3',
    name: 'Operating Systems',
    attendance: 90,
    units: []
  }
];


// ================= MOCK NOTICES =================

export const MOCK_NOTICES: Notice[] = [
  {
    id: '1',
    title: 'Exam Schedule Out',
    content: 'Final exams start from May 15.',
    date: '2024-04-20',
    category: 'Exam',
    isPinned: true
  }
];


// ================= MOCK GRIEVANCES =================

export const MOCK_GRIEVANCES: Grievance[] = [
  {
    id: 'G1',
    category: 'Infrastructure',
    description: 'AC not working.',
    status: 'Open',
    date: '2024-04-20',
    isAnonymous: false
  }
];


// ================= MOCK ASSIGNMENTS =================

export const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    id: 'A1',
    title: 'DBMS Normalization',
    subject: 'Database Management',
    deadline: '2024-05-02',
    status: 'Pending'
  }
];


// ================= MOCK LABS =================

export const MOCK_LABS: Lab[] = [
  {
    id: 'L1',
    name: 'AI Lab',
    subject: 'Machine Learning',
    faculty: 'Dr. Ramesh',
    time: '10:00 AM - 12:00 PM',
    batch: 'B1',
    instructions: ['Install Python', 'Bring Dataset']
  }
];
// ================= MOCK STUDENTS =================

