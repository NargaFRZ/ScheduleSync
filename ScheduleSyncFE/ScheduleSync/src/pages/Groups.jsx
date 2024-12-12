import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { fetchGroupsByUser } from "../actions/group.actions";
import { fetchUserData } from "../actions/account.actions";

const Groups = () => {
  const [user, setUser] = useState(null); // State to hold the user data
  const [groups, setGroups] = useState([]); // State to hold the fetched groups
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const userResponse = await fetchUserData();
        const userData = userResponse.data;

        if (userResponse.success) {
          setUser({ name: userData.username, email: userData.email });

          // Fetch groups by user ID
          const userGroupsResponse = await fetchGroupsByUser(userData.userid);
          if (userGroupsResponse.success) {
            setGroups(userGroupsResponse.data.groups); // Set the merged groups
          } else {
            // Handle empty or failed responses
            setGroups([]);
          }
        } else {
          throw new Error("Failed to fetch user data.");
        }
      } catch (err) {
        console.error("Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1 relative">
        {/* Sidebar */}
        {user ? (
          <SideBar
            name={user.name}
            email={user.email}
            className="fixed top-0 left-0 z-10"
          />
        ) : (
          <div className="text-center py-4">Loading user data...</div>
        )}

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-6">
          <div className="py-8">
            {/* Page Title */}
            <h1 className="text-4xl font-semibold mb-4">Your Groups</h1>

            {/* Other Errors */}
            {error && error !== "Failed to fetch groups." && (
              <div className="text-red-500 py-4">
                <p>Error: {error}</p>
              </div>
            )}

            {/* Loading Indicator */}
            {loading ? (
              <div className="text-center py-4">
                <p>Loading...</p>
              </div>
            ) : groups.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map((group, index) => (
                  <div
                    key={index}
                    className="bg-blue-900 text-white p-4 rounded shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-lg font-semibold">{group.groupname}</h2>
                    <p className="mt-2">Entries: {group.entries}</p>
                    <button
                       onClick={() => navigate(`/groups/group-detail/${group.groupid}`)}
                      className="mt-4 bg-white text-blue-900 px-4 py-2 rounded hover:bg-gray-100"
                    >
                      Detail
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-gray-600 italic">
                You are not a part of any groups.
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
