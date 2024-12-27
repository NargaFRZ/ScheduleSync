import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { useNavigate } from "react-router-dom";
import { joinGroup } from "../actions/group.actions"; // Import the joinGroup API function
import { fetchUserData } from "../actions/account.actions";

const JoinGroup = () => {
  const [groupCode, setGroupCode] = useState(""); // State to store the entered group code
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages
  const [successMessage, setSuccessMessage] = useState(""); // State for success messages
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [user, setUser] = useState({ name: "", email: "" }); // State to store user data
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUser({ name: data.data.username, email: data.data.email });
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setErrorMessage("Failed to load user data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleJoinGroup = async () => {
    console.log(groupCode);
    if (!groupCode) {
      setErrorMessage("Please enter a valid group code.");
      return;
    }

    try {
      // Call the joinGroup API function to join the group with the entered invite code
      const response = await joinGroup(groupCode);

      if (response.success) {
        setSuccessMessage("Successfully joined the group!");
        // Redirect to the groups page if the API call is successful
        setTimeout(() => navigate("/groups"), 2000); // Redirect after a short delay
      } else {
        // Set the error message if the API call fails
        setErrorMessage(response.message || "Failed to join the group.");
      }
    } catch (error) {
      console.error("Error joining group:", error);
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />
      <div className="flex flex-1 relative">
        <SideBar name={user.name} email={user.email} className="fixed top-0 left-0 z-10" />
        <div className="flex-1 flex flex-col px-6 py-8 pb-20">
          <h1 className="text-4xl font-semibold mb-8">Join a Group</h1>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-4 bg-red-100 text-red-800 rounded">
              {errorMessage}
            </div>
          )}

          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <label className="block text-sm mb-2">Group Code</label>
              <input
                type="text"
                value={groupCode}
                onChange={(e) => setGroupCode(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                placeholder="Enter the group code"
              />
            </div>

            <div className="text-right">
              <button
                onClick={handleJoinGroup}
                className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800"
              >
                Join Group
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center py-4 bg-blue-900 text-white fixed bottom-0 left-0 w-full">
        <p className="text-sm">© 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak</p>
      </footer>
    </div>
  );
};

export default JoinGroup;
