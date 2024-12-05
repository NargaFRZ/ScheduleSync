import React from "react";
import NavBar from "../components/NavBarLogout";
import arrow from "../assets/icons/ArrowVector.svg";

const AddSchedule = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className="absolute top-8 left-8 h-auto w-64 bg-blue-900 text-white flex flex-col px-6 py-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Add Your Image Files</h1>
          <button className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between hover:bg-blue-300">
            Upload Ulang
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />{" "}
            {/* Replace material-icons with arrow icon */}
          </button>
          <button className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between mt-4 hover:bg-blue-300">
            Add to Schedule
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />{" "}
            {/* Replace material-icons with arrow icon */}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-6 ml-80">
          <h1 className="text-4xl font-semibold mb-6">Add Schedules</h1>
          {/* Placeholder for Image */}
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-lg w-3/4 h-80">
            <p className="text-gray-500">[Schedule Image Placeholder]</p>
            <p className="text-sm text-gray-400">
              (Gambar akan diambil dari Firebase)
            </p>
          </div>

          {/* Add Button */}
          <button className="mt-6 bg-blue-900 text-white py-2 px-6 rounded-lg font-medium flex items-center hover:bg-blue-700">
            Add
            <span className="ml-2 text-xl font-bold">+</span>
          </button>
        </main>
      </div>
    </div>
  );
};

export default AddSchedule;
