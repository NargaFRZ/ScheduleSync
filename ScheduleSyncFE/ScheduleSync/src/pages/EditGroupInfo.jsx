import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import PopupDeleteGroup from "../components/PopupDeleteGroup";
import PopupSaveEditGroup from "../components/PopupSaveEditGroup";
import { fetchGroupsByUser, deleteGroup } from "../actions/group.actions";
import { useParams, useNavigate } from "react-router-dom";

const EditGroupInfo = () => {
  const groupId = useParams(); // Get group ID from route params
  const navigate = useNavigate();

  const [group, setGroup] = useState(null); // State to store group details
  const [loading, setLoading] = useState(true); // Loading state
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Delete popup visibility
  const [showSavePopup, setShowSavePopup] = useState(false); // Save popup visibility
  const [groupName, setGroupName] = useState(""); // Group name input

  // Fetch group details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchGroupsByUser();
        if (response.success) {
          setGroup(response.data);
          setGroupName(response.data.groupName); // Initialize input field
        } else {
          console.error("Failed to fetch group details", response.message);
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [groupId]);

  // Handle group deletion
  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroup(groupId);
      if (response.success) {
        navigate("/your-groups"); // Redirect to groups list after deletion
      } else {
        console.error("Failed to delete group", response.message);
      }
    } catch (error) {
      console.error("Error deleting group:", error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading group details...</div>;
  }

  if (!group) {
    return <div className="text-center mt-10">Group not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-6 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">{group.groupName}</h1>
            <div className="text-sm text-gray-500">Created on {new Date(group.createdAt).toLocaleDateString()}</div>
          </div>

          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <div className="mb-4">
              <label htmlFor="groupName" className="block font-medium text-gray-700">
                Group Name
              </label>
              <input
                type="text"
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <p className="font-medium">Number of Entries:</p>
              <p>{group.numberOfEntries || 0} Members</p>
            </div>

            <div className="flex space-x-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-500"
                onClick={() => setShowSavePopup(true)}
              >
                Save
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
                onClick={() => setShowDeletePopup(true)}
              >
                Permanently Delete Group
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-blue-900 w-full">
        <p className="text-sm text-white">© 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak</p>
      </footer>

      {/* Popups */}
      {showDeletePopup && (
        <PopupDeleteGroup
          group={group}
          onClose={() => setShowDeletePopup(false)}
          onDeleteGroup={handleDeleteGroup}
        />
      )}
      {showSavePopup && (
        <PopupSaveEditGroup
          groupId={groupId}
          groupName={groupName}
          onClose={() => setShowSavePopup(false)}
        />
      )}
    </div>
  );
};

export default EditGroupInfo;
