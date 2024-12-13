import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import arrow from "../assets/icons/ArrowVector.svg";
import { OCRSchedule } from "../actions/schedule.actions";

const ValidateSchedule = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming `id` is the parameter from the URL

  useEffect(() => {
    // Call the OCRSchedule function with the current parameters
    const fetchSchedule = async () => {
      try {
        const response = await OCRSchedule({ id }); // Pass params as needed
        console.log("OCRSchedule response:", response);
      } catch (error) {
        console.error("Error calling OCRSchedule:", error);
      }
    };

    fetchSchedule();
  }, [id]); // Dependency array to run this when `id` changes

  const handleAddClick = () => {
    navigate("/validate-schedule");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <aside className="absolute top-8 left-8 h-auto w-64 bg-blue-900 text-white flex flex-col px-6 py-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-semibold mb-6">Name of Schedule</h1>
          <button className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between hover:bg-blue-300">
            Upload Ulang
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
          <button className="w-full bg-white text-blue-900 py-2 px-4 rounded-lg font-medium flex items-center justify-between mt-4 hover:bg-blue-300">
            Save to Schedule
            <img src={arrow} alt="Arrow icon" className="h-4 w-4" />
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-8 py-6 ml-80">
          <h1 className="text-4xl font-semibold mb-6">Validate Schedule</h1>
          {/* Placeholder for additional content */}
        </main>
      </div>
    </div>
  );
};

export default ValidateSchedule;
