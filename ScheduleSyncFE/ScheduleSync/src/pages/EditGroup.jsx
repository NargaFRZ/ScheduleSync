import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import PopupAddGroup from "../components/PopupAddGroup"; // Import the PopupAddGroup component
import { fetchGroups, deleteGroup } from "../actions/group.actions";

const EditGroup = () => {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
  const [groups, setGroups] = useState([]); // State to store groups
  const [loading, setLoading] = useState(false);

  const user = {
    name: "Wendy",
    email: "lebit1x@gmail.com",
  };

  // Fetch groups when the component mounts
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

  // Handle group deletion
  const handleDelete = async (groupID) => {
    const response = await deleteGroup(groupID);
    if (response.success) {
      setGroups((prev) => prev.filter((group) => group._id !== groupID));
    } else {
      console.error("Error deleting group:", response.data);
    }
  };

  // Handle group addition (callback from PopupAddGroup)
  const handleAddGroup = (newGroup) => {
    setGroups((prev) => [...prev, newGroup]);
  };

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
        <div className="flex-1 flex flex-col px-6 py-8">
          {/* Page Header */}
          <div className="flex items-center mb-8">
            <h1 className="text-4xl font-semibold">Edit Group</h1>
            <button
              className="bg-blue-900 text-white ml-4 py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => setShowPopup(true)} // Show popup on button click
            >
              New +
            </button>
          </div>

          {/* Group Cards */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="bg-blue-900 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  {/* Card Header */}
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{group.name}</h2>
                    <p className="text-sm">Entries: {group.entries || 0}</p>
                  </div>

                  {/* Card Description */}
                  <div className="bg-gray-100 text-blue-900 p-3 rounded">
                    <p className="text-sm">{group.description || "No description available"}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 flex justify-between">
                    <button className="bg-white text-blue-900 px-3 py-1 rounded hover:bg-gray-100">
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                      onClick={() => handleDelete(group._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-blue-900 w-full fixed bottom-0 left-0">
        <p className="text-sm text-white">
          © 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak
        </p>
      </footer>

      {/* Popup for Adding Group */}
      {showPopup && (
        <PopupAddGroup
          onClose={() => setShowPopup(false)}
          onAddGroup={handleAddGroup}
        />
      )}
    </div>
  );
};

export default EditGroup;