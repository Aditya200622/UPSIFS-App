import React from "react";

import { User } from "../types";

interface ProfileProps {
  user: User;
  onLogout: () => void;
  onNavigateToSettings: (
    page: string,
    params?: any
  ) => void;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  onLogout,
  onNavigateToSettings
}) => {

  return (

    <div className="p-5 max-w-lg mx-auto">

      {/* PROFILE CARD */}

      <div className="bg-white rounded-3xl p-6 shadow-sm">

        <div className="flex flex-col items-center">

          <img
            src="/upsifs-logo.png"
            alt="profile"
            className="w-24 h-24 rounded-full mb-4"
          />

          <h2 className="text-2xl font-bold text-slate-800">
            {user.name}
          </h2>

          <p className="text-slate-500 mt-1">
            {user.email}
          </p>

          <span className="mt-3 px-4 py-1 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium">
            {user.role}
          </span>

        </div>

      </div>

      {/* SETTINGS */}

      <div className="mt-6 space-y-3">

        <button
          onClick={() =>
            onNavigateToSettings("settings_notifications")
          }
          className="w-full bg-white rounded-2xl p-4 text-left shadow-sm"
        >
          🔔 Notifications
        </button>

        <button
          onClick={() =>
            onNavigateToSettings("settings_security")
          }
          className="w-full bg-white rounded-2xl p-4 text-left shadow-sm"
        >
          🔒 Security
        </button>

        <button
          onClick={() =>
            onNavigateToSettings("settings_preferences")
          }
          className="w-full bg-white rounded-2xl p-4 text-left shadow-sm"
        >
          ⚙️ Preferences
        </button>

      </div>

      {/* LOGOUT */}

      <button
        onClick={onLogout}
        className="w-full mt-8 bg-red-500 text-white py-4 rounded-2xl font-semibold"
      >
        Logout
      </button>

    </div>

  );

};

export default Profile;