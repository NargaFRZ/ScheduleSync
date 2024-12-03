import React, { useState } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";

const EditPassword = () => {
  const user = {
    name: "Wendy",
    email: "lebit1x@gmail.com",
  };

  // State untuk mengatur visibilitas password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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
        <div className="flex-1 flex flex-col px-6 py-8 ">
          {/* Page Title */}
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-4xl font-semibold">Edit Password</h1>
            <span className="text-sm bg-green-200 text-green-800 px-4 py-2 rounded-md">
              Masa kata sandi berakhir dalam <strong>120 hari</strong>
            </span>
          </div>

          {/* Form */}
          <div className="bg-blue-900 p-8 rounded-lg text-white w-full max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-sm mb-2">Kata Sandi Lama</label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                  placeholder="Masukkan kata sandi lama"
                />
                <button
                  type="button"
                  className="absolute right-4 top-2"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Kata Sandi Baru</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                  placeholder="Masukkan kata sandi baru"
                />
                <button
                  type="button"
                  className="absolute right-4 top-2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">
                Ulang Kata Sandi Baru
              </label>
              <div className="relative">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                  placeholder="Ulangi kata sandi baru"
                />
                <button
                  type="button"
                  className="absolute right-4 top-2"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
                Simpan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-blue-900 w-full fixed bottom-0 left-0">
        <p className="text-sm text-white">
          © 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak
        </p>
      </footer>
    </div>
  );
};

export default EditPassword;
