import React from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";

const YourSchedule = () => {
  const user = {
    name: "Wendy",
    email: "lebit1x@gmail.com",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <SideBar name={user.name} email={user.email} className=" fixed top-0 left-0 z-10" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col mb-24"> {/* Add margin-left to offset the sidebar */}
          {/* Content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">Oh, No!</h1>
              <p className="text-xl mb-6">It’s Seems Like You Haven’t Added Your Schedule Yet!</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow">
                Add Your Schedule
              </button>
              <p className="text-sm text-blue-500 mt-4">Add <span className="font-bold">image</span> files</p>
              <p className="text-sm text-blue-500">
                Supported formats: <span className="bg-yellow-400 text-black px-2 rounded">PNG</span>{" "}
                <span className="bg-yellow-400 text-black px-2 rounded">JPG</span>
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center py-4 bg-blue-900 w-full fixed bottom-0 left-0">
            <p className="text-sm text-white">
              © 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default YourSchedule;
