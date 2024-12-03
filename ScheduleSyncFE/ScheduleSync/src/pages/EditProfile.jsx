import React, { useState } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";

const EditProfile = () => {
  const user = {
    name: "Wendy Dharmawan",
    email: "lebit1x@gmail.com",
  };

  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <SideBar
          name={user.name}
          email={user.email}
          className="fixed top-0 left-0 z-10"
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-6 py-8 pb-20">
          {/* Page Header */}
          <h1 className="text-4xl font-semibold mb-8">Edit Profile</h1>

          {/* Profile Form */}
          <div className="bg-blue-900 p-8 rounded-lg text-white w-full max-w-2xl mx-auto">
            {/* Input Nama Lengkap */}
            <div className="mb-6">
              <label className="block text-sm mb-2" htmlFor="nama">
                Nama Lengkap
              </label>
              <div className="relative">
                <input
                  id="nama"
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                  placeholder="Masukkan nama lengkap"
                />
              </div>
            </div>

            {/* Input Email */}
            <div className="mb-6">
              <label className="block text-sm mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                  placeholder="Masukkan email"
                />
              </div>
            </div>

            {/* Schedule Status */}
            <div className="mb-6">
              <label className="block text-sm mb-2">Schedule Status</label>
              <div className="flex items-center gap-4">
                <button className="bg-green-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-600">
                  Already Added
                </button>
                <button className="bg-yellow-500 text-blue-900 py-2 px-4 rounded-lg font-semibold hover:bg-yellow-400">
                  Edit
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="text-right">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Save
              </button>
            </div>
          </div>

          {/* Delete Account Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-500">
              Permanently Delete my account
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-blue-900 w-full">
        <p className="text-sm text-white">
          © 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak
        </p>
      </footer>
    </div>
  );
};

export default EditProfile;
