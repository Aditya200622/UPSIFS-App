import React, { useState, useEffect } from 'react';
import MarkAttendance from "./pages/teacher/MarkAttendance";
import AddNotice from './pages/management/AddNotice';
import ParentsList from './pages/management/ParentsList';
import ParentDetail from './pages/management/ParentDetail';
import AddParent from './pages/management/AddParent';
import AddTeacher from './pages/management/AddTeacher';
import TeachersList from './pages/management/TeachersList';
import TeacherDetail from './pages/management/TeacherDetail';
import { User, UserRole } from './types';
import { UPSIFS_LOGO_URL } from './constants';
import AddStudent from './pages/management/AddStudent';

import masterTimetable from './data/masterTimetable';

import StudentTimetable from './pages/StudentTimetable';
import TeacherTimetable from './pages/teacher/Timetable';
import EditTimetable from './pages/teacher/EditTimetable';

import { LeaveProvider } from './context/LeaveContext';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Attendance from './pages/Attendance';
import LMS from './pages/LMS';
import Assignments from './pages/Assignments';
import Results from './pages/Results';
import Notices from './pages/Notices';
import Grievances from './pages/Grievances';
import Profile from './pages/Profile';


import UploadPPT from './pages/teacher/UploadPPT';

import StudentsList from './pages/teacher/StudentsList';
import StudentDetail from './pages/teacher/StudentDetail';
import TeacherQueries from './pages/teacher/Queries';

import ApprovedLeaves from './pages/ApprovedLeaves';
import LeaveParent from './pages/LeaveParent';
import LeaveStudent from './pages/LeaveStudent';
import LeaveStatus from './pages/LeaveStatus';

import NotificationsPage from './pages/settings/Notifications';
import SecurityPage from './pages/settings/Security';
import PreferencesPage from './pages/settings/Preferences';

import SplashScreen from './components/SplashScreen';

import { Menu, X } from 'lucide-react';

const App: React.FC = () => {

  /* ---------------- GLOBAL STATE ---------------- */
  const [selectedClassData, setSelectedClassData] = useState<any>(null);
  const [timetableData, setTimetableData] = useState<any>(masterTimetable);

  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
  const savedUser = localStorage.getItem('upsifs_user');

  if (savedUser) {
    setUser(JSON.parse(savedUser));
  }
}, []);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [selectedTeacherId, setSelectedTeacherId] = useState<string | null>(null);
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  /* ---------------- SPLASH SCREEN ---------------- */
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  /* ---------------- AUTH ---------------- */
const handleLogin = (loggedInUser: User) => {

  localStorage.setItem(
    'upsifs_user',
    JSON.stringify(loggedInUser)
  );

  setUser(loggedInUser);
  setCurrentPage('dashboard');
};
  const handleLogout = () => {

  localStorage.removeItem('upsifs_user');

  setUser(null);
  setSelectedRole(null);
  setCurrentPage('dashboard');
  setIsDrawerOpen(false);
};

  /* ---------------- NAVIGATION ---------------- */
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

const navigateTo = (page: string, params?: any) => {

  // MANAGEMENT ONLY PAGES
  const managementPages = [
    'add_notice',
    'add_student',
    'add_teacher',
    'teachers_list',
    'approved_leaves',
  ];

  // TEACHER ONLY PAGES
  const teacherPages = [
    'upload_ppt',
    'edit_timetable',
    'queries',
  ];

  // BLOCK MANAGEMENT PAGES
  if (
    managementPages.includes(page) &&
    user?.role !== UserRole.MANAGEMENT
  ) {
    return;
  }

  // BLOCK TEACHER PAGES
  if (
    teacherPages.includes(page) &&
    user?.role !== UserRole.TEACHER
  ) {
    return;
  }

  setCurrentPage(page);

  if (params?.studentId) {
    setSelectedStudentId(params.studentId);
  }

  if (params?.parentId) {
    setSelectedParentId(params.parentId);
  }

  if (params?.teacherId) {
    setSelectedTeacherId(params.teacherId);
  }

  setIsDrawerOpen(false);
};
  

  /* ---------------- LOGIN SCREEN ---------------- */
  if (!user) {
    return (
      <Login
        selectedRole={selectedRole}
        onSelectRole={setSelectedRole}
        onLogin={handleLogin}
      />
    );
  }

  const brandColor =
    user.role === UserRole.TEACHER ? '#0d9488' : '#1e1b4b';

  /* ---------------- PAGE RENDER ---------------- */
  const renderPage = () => {

    /* SETTINGS */
    if (currentPage === 'settings_notifications') {
      return (
        <NotificationsPage
          onBack={() => navigateTo('profile')}
          brandColor={brandColor}
        />
      );
    }

    if (currentPage === 'settings_security') {
      return (
        <SecurityPage
          onBack={() => navigateTo('profile')}
          brandColor={brandColor}
        />
      );
    }

    if (currentPage === 'settings_preferences') {
      return (
        <PreferencesPage
          onBack={() => navigateTo('profile')}
          brandColor={brandColor}
        />
      );
    }

    if (currentPage === 'profile') {
      return (
        <Profile
          user={user}
          onLogout={handleLogout}
          onNavigateToSettings={navigateTo}
        />
      );
    }

    /* ---------------- TEACHER ---------------- */
    if (user.role === UserRole.TEACHER) {
      switch (currentPage) {
        case "mark_attendance":
  return (
    <MarkAttendance />
  );

        case 'dashboard':
          return <Dashboard user={user} setCurrentPage={navigateTo} />;

       
        case 'timetable':
          return (
            <TeacherTimetable
              onBack={() => navigateTo('dashboard')}
            />
          );

        case 'edit_timetable':
          return (
            <EditTimetable
              onBack={() => navigateTo('dashboard')}
              timetableData={timetableData}
              setTimetableData={setTimetableData}
            />
          );

        case 'upload_ppt':
          return (
            <UploadPPT
              onBack={() => navigateTo('dashboard')}
            />
          );

        

        case 'students_list':
          return (
            <StudentsList
              onBack={() => navigateTo('dashboard')}
              onSelectStudent={(id) =>
                navigateTo('student_detail', { studentId: id })
              }
            />
          );

        case 'student_detail':
          return (
            <StudentDetail
              studentId={selectedStudentId}
              onBack={() => navigateTo('students_list')}
            />
          );

        case 'queries':
          return (
            <TeacherQueries
              onBack={() => navigateTo('dashboard')}
            />
          );

        default:
          return <Dashboard user={user} setCurrentPage={navigateTo} />;
      }
    }
    /* ---------------- PARENT ---------------- */
if (user.role === UserRole.PARENT) {
  switch (currentPage) {

    
    case 'dashboard':
      return <Dashboard user={user} setCurrentPage={navigateTo} />;

    case 'attendance':
      return <Attendance user={user} />;

    case 'results':
      return <Results />;

    case 'notices':
      return <Notices />;

    case 'leave_parent':
      return <LeaveParent user={user} />;

    case 'profile':
      return (
        <Profile
          user={user}
          onLogout={handleLogout}
          onNavigateToSettings={navigateTo}
        />
      );

    default:
      return <Dashboard user={user} setCurrentPage={navigateTo} />;
  }
}
/* ---------------- MANAGEMENT ---------------- */
if (user.role === UserRole.MANAGEMENT) {
  switch (currentPage) {
    case 'add_notice':
  return (
    <AddNotice
      onBack={() => navigateTo('dashboard')}
    />
  );
    case 'parents_list':
  return (
    <ParentsList
      onBack={() => navigateTo('dashboard')}
      onSelectParent={(id) =>
        navigateTo('parent_detail', { parentId: id })
      }
    />
  );

case 'parent_detail':
  return (
    <ParentDetail
      parentId={selectedParentId}
      onBack={() => navigateTo('parents_list')}
    />
  );

case 'add_parent':
  return (
    <AddParent
      onBack={() => navigateTo('dashboard')}
    />
  );
    case 'add_teacher':
  return (
    <AddTeacher
      onBack={() => navigateTo('dashboard')}
    />
  );

    case 'dashboard':
      return <Dashboard user={user} setCurrentPage={navigateTo} />;

    case 'students_list':
      return (
        <StudentsList
          onBack={() => navigateTo('dashboard')}
          onSelectStudent={(id) =>
            navigateTo('student_detail', { studentId: id })
          }
        />
      );
      case 'teachers_list':
  return (
    <TeachersList
      onBack={() => navigateTo('dashboard')}
      onSelectTeacher={(id) =>
        navigateTo('teacher_detail', { teacherId: id })
      }
    />
  );

case 'teacher_detail':
  return (
    <TeacherDetail
      teacherId={selectedTeacherId}
      onBack={() => navigateTo('teachers_list')}
    />
  );

    case 'student_detail':
      return (
        <StudentDetail
          studentId={selectedStudentId}
          onBack={() => navigateTo('students_list')}
        />
      );
      case 'add_student':
  return (
    <AddStudent
      onBack={() => navigateTo('dashboard')}
    />
  );

    case 'approved_leaves':
      return <ApprovedLeaves />;

    case 'profile':
      return (
        <Profile
          user={user}
          onLogout={handleLogout}
          onNavigateToSettings={navigateTo}
        />
      );

    default:
      return <Dashboard user={user} setCurrentPage={navigateTo} />;
  }
}

    /* ---------------- STUDENT ---------------- */
    switch (currentPage) {

      case 'dashboard':
        return <Dashboard user={user} setCurrentPage={navigateTo} />;

      case 'attendance':
        return <Attendance user={user} />;

     case 'timetable':
  return <StudentTimetable />;

      case 'lms':
        return <LMS user={user} />;

      case 'assignments':
        return <Assignments user={user} />;

      case 'results':
        return <Results />;

      case 'notices':
        return <Notices />;

      case 'grievance':
        return <Grievances user={user} />;

      case 'leave_student':
        return <LeaveStudent user={user} />;
        case 'leave_status':
  return <LeaveStatus />;

      default:
        return <Dashboard user={user} setCurrentPage={navigateTo} />;
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <LeaveProvider>
      <div className="min-h-screen bg-[#f7f9fc] flex flex-col">

     <header className="sticky top-0 z-50 bg-white border-b border-slate-100"
     >
  <div className="h-16 flex items-center justify-between px-4 sm:px-6">

    {/* LEFT MENU BUTTON */}
    <button
      onClick={toggleDrawer}
      className="p-2 rounded-lg active:scale-95 transition"
    >
      <Menu size={24} />
    </button>

    {/* TITLE */}
    <h1
      style={{ color: brandColor }}
      className="font-medium text-sm sm:text-base"
    >
      {user.role}
    </h1>

    {/* PROFILE */}
    <button
      onClick={() => navigateTo('profile')}
      className="p-1 rounded-full active:scale-95 transition"
    >
      <img
        src={UPSIFS_LOGO_URL}
        className="w-9 h-9 rounded-full object-cover"
      />
    </button>

  </div>
</header>
        {/* ================= SIDEBAR ================= */}
{isDrawerOpen && (
  <div
   className="fixed inset-0 bg-black/40 z-[60]"
    onClick={() => setIsDrawerOpen(false)}
  >
    <div
      className="w-72 bg-white h-full shadow-2xl p-6 overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-lg font-semibold mb-6">📚 Menu</h2>

      {/* -------- STUDENT -------- */}
      {user.role === UserRole.STUDENT && (
        <ul className="space-y-4 text-sm">
          <li><button onClick={() => navigateTo('dashboard')}>🏠 Dashboard</button></li>
          <li><button onClick={() => navigateTo('attendance')}>📝 Attendance</button></li>
          <li><button onClick={() => navigateTo('timetable')}>📅 Timetable</button></li>
          <li><button onClick={() => navigateTo('lms')}>📖 LMS</button></li>
          <li><button onClick={() => navigateTo('assignments')}>📂 Assignments</button></li>
          <li><button onClick={() => navigateTo('results')}>📊 Results</button></li>
          <li><button onClick={() => navigateTo('notices')}>📢 Notices</button></li>
          <li><button onClick={() => navigateTo('grievance')}>⚖️ Grievance</button></li>
          <li><button onClick={() => navigateTo('leave_student')}>📩 Leave</button></li>
          <li><button onClick={() => navigateTo('profile')}>👤 Profile</button></li>
          <li><button onClick={handleLogout}>🚪 Logout</button></li>
        </ul>
      )}

      {/* -------- TEACHER -------- */}
      {user.role === UserRole.TEACHER && (
        <ul className="space-y-4 text-sm">
          <li><button onClick={() => navigateTo('dashboard')}>🏠 Dashboard</button></li>
          <li><button onClick={() => navigateTo('mark_attendance')}>📝 Mark Attendance</button></li>
          <li><button onClick={() => navigateTo('timetable')}>📅 Timetable</button></li>
          <li><button onClick={() => navigateTo('edit_timetable')}>✏️ Edit Timetable</button></li>
          <li><button onClick={() => navigateTo('upload_ppt')}>📤 Upload PPT</button></li>
          <li><button onClick={() => navigateTo('upload_marks')}>📊 Upload Marks</button></li>
          <li><button onClick={() => navigateTo('students_list')}>👨‍🎓 Students List</button></li>
          <li><button onClick={() => navigateTo('queries')}>💬 Queries</button></li>
          <li><button onClick={() => navigateTo('profile')}>👤 Profile</button></li>
          <li><button onClick={handleLogout}>🚪 Logout</button></li>
        </ul>
      )}

      {/* -------- PARENT -------- */}
      {user.role === UserRole.PARENT && (
        <ul className="space-y-4 text-sm">
          <li><button onClick={() => navigateTo('dashboard')}>🏠 Dashboard</button></li>
          <li><button onClick={() => navigateTo('attendance')}>📝 Child Attendance</button></li>
          <li><button onClick={() => navigateTo('results')}>📊 Child Results</button></li>
          <li><button onClick={() => navigateTo('notices')}>📢 Notices</button></li>
          <li><button onClick={() => navigateTo('leave_parent')}>📩 Leave Request</button></li>
          <li><button onClick={() => navigateTo('profile')}>👤 Profile</button></li>
          <li><button onClick={handleLogout}>🚪 Logout</button></li>
        </ul>
      )}

      {/* -------- MANAGEMENT -------- */}
{user.role === UserRole.MANAGEMENT && (
  <ul className="space-y-4 text-sm">

    <li><button onClick={() => navigateTo('dashboard')}>🏠 Dashboard</button></li>

    <li><button onClick={() => navigateTo('students_list')}>👨‍🎓 Manage Students</button></li>

    <li><button onClick={() => navigateTo('teachers_list')}>👨‍🏫 Teachers List</button></li>

    <li><button onClick={() => navigateTo('add_student')}>➕ Add Student</button></li>

    <li><button onClick={() => navigateTo('timetable')}>📅 Manage Timetable</button></li>

    <li><button onClick={() => navigateTo('notices')}>📢 Manage Notices</button></li>

    <li><button onClick={() => navigateTo('profile')}>👤 Profile</button></li>

    <li><button onClick={handleLogout}>🚪 Logout</button></li>

  </ul>
)}
    </div>
  </div>
)}
        {/* Drawer Overlay */}

        <main className="flex-1">
          {renderPage()}
        </main>

      </div>
    </LeaveProvider>
  );
};

export default App;