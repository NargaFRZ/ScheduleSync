import React, { useState } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";

const JoinGroup = () => {
  const [groupCode, setGroupCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleJoinGroup = async () => {
    if (!groupCode) {
      setErrorMessage("Please enter a valid group code.");
      return;
    }

    try {
      // Mock API call logic here to join group
      const response = await fetch("/api/join-group", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: groupCode }),
      });

      const result = await response.json();
      if (response.ok) {
        navigate("/your-groups"); // Redirect to the groups page on success
      } else {
        setErrorMessage(result.message || "Failed to join the group.");
      }
    } catch (error) {
      console.error("Error joining group:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-4xl font-bold mb-6">Join a Group</h1>

          <div className="w-full max-w-md bg-blue-100 p-6 rounded-lg shadow-md">
            <label htmlFor="groupCode" className="block text-lg font-medium mb-2">
              Enter Group Code:
            </label>
            <input
              type="text"
              id="groupCode"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value)}
              className="w-full p-3 border border-blue-300 rounded focus:outline-none focus:ring focus:ring-blue-300 bg-white"
              placeholder="Enter the group code here"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}

            <button
              onClick={handleJoinGroup}
              className="w-full bg-blue-900 text-white py-3 mt-4 rounded hover:bg-blue-800"
            >
              Join Group
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

export default JoinGroup;
