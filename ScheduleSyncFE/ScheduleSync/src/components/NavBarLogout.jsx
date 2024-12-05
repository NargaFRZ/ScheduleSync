import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SSBlue from "../assets/SyncLogoBlue.svg";

function NavBar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  // Tempatkan handleLogout di sini
  const handleLogout = () => {
    // Tambahkan logika untuk logout di sini
    console.log("Logout clicked!");
  };

  return (
    <nav className="glass w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <div className="flex items-left space-x-2 rtl:space-x-reverse">
          <img src={SSBlue} className="h-12" alt="Logo" />
        </div>

        {/* Menu */}
        <div className="flex items-center space-x-8">
          {/* Edit Schedule */}
          <button
            onClick={() => navigate("/edit-schedule")}
            className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-300 md:hover:bg-transparent md:border-0 md:p-0 hover:text-blue-700"
          >
            Edit Schedule
          </button>

          {/* Icon Menu (3 strips) */}
          <div className="relative">
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="block p-2 text-blue-900 hover:bg-blue-300 rounded md:border-0"
            >
              &#9776; {/* Unicode untuk ikon tiga garis */}
            </button>

            {/* Dropdown Menu */}
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <ul className="py-2">
                  <li>
                    <button
                      onClick={() => navigate("/yourschedule")}
                      className="block px-4 py-2 text-blue-900 hover:bg-blue-300 w-full text-left"
                    >
                      Dashboard
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-blue-900 hover:bg-blue-300 w-full text-left"
                    >
                      Quit
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
