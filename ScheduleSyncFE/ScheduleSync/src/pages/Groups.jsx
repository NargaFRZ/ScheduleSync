import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { fetchGroups } from "../actions/group.actions"; // Import the fetchGroups function

const Groups = () => {
  const user = {
    name: "Wendy",
    email: "lebit1x@gmail.com",
  };

  const [groups, setGroups] = useState([]); // State to hold the fetched groups
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const fetchGroupData = async () => {
      setLoading(true);
      const response = await fetchGroups();
      if (response.success) {
        setGroups(response.data);
      } else {
        console.error("Error fetching groups:", response.data);
      }
      setLoading(false);
    };

    fetchGroupData();
  }, []);

  // useEffect(() => {
  //   const getGroups = async () => {
  //     try {
  //       const fetchedGroups = await fetchGroups(); // Fetch groups from the action
  //       if (Array.isArray(fetchedGroups)) {
  //         setGroups(fetchedGroups); // Update state with fetched groups if it's an array
  //       } else {
  //         throw new Error("Fetched data is not an array");
  //       }
  //     } catch (err) {
  //       setError(err.message); // Set error message
  //     } finally {
  //       setLoading(false); // Set loading to false
  //     }
  //   };

  //   getGroups();
  // }, []); // Empty dependency array to run only once on component mount
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        <SideBar name={user.name} email={user.email} className=" fixed top-0 left-0 z-10" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col  px-6"> {/* Add margin-left for sidebar */}
          <div className="py-8">
            {/* Page Title */}
            <h1 className="text-4xl font-semibold mb-4">Your Groups</h1>

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Loading Indicator */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group, index) => (
                  <div
                    key={index}
                    className="bg-blue-900 text-white p-4 rounded shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-lg font-semibold">{group.name}</h2>
                    <p className="mt-2">Entries: {group.entries}</p>
                    <button onClick={() => navigate("/groups/group-detail")}
                            className="mt-4 bg-white text-blue-900 px-4 py-2 rounded hover:bg-gray-100">
                      Detail
                    </button>
                  </div>
                ))}
              </div>
            )}
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

export default Groups;
