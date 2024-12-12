import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import PopupDeleteGroup from "../components/PopupDeleteGroup";
import PopupSaveEditGroup from "../components/PopupSaveEditGroup";
import { getGroupbyId, deleteGroup, getCountMember } from "../actions/group.actions";
import { useParams, useNavigate } from "react-router-dom";

const EditGroupInfo = () => {
  const { groupid } = useParams(); // Get group ID from route params
  const navigate = useNavigate();

  const [group, setGroup] = useState(null); // State to store group details
  const [loading, setLoading] = useState(true); // Loading state
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Delete popup visibility
  const [showSavePopup, setShowSavePopup] = useState(false); // Save popup visibility
  const [groupName, setGroupName] = useState(""); // Group name input
  const [memberCount, setMemberCount] = useState(0); // State to store number of members

  // Fetch group details when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
      try {
        // Fetch group details by ID
        const response = await getGroupbyId(groupid);
        console.log("API Response:", response); // Log the API response
        if (
          response.success &&
          response.data.groups &&
          response.data.groups[0]
        ) {
          const groupData = response.data.groups[0];
          console.log("Group Data:", groupData); // Log the fetched group data
          setGroup(groupData); // Update group state
          setGroupName(groupData.groupname); // Update group name input

          // Fetch number of members in the group
          const countResponse = await getCountMember(groupid);
          console.log("Member Count Response:", countResponse);
          if (countResponse.success) {
            setMemberCount(countResponse.data.memberCount); // Update the member count
          } else {
            console.error("Failed to fetch member count:", countResponse.message);
          }
        } else {
          console.error("Failed to fetch group details:", response.message);
        }
      } catch (error) {
        console.error("Error fetching group details:", error);
      } finally {
        setLoading(false); // Set loading to false at the end
      }
    };

    fetchData();
  }, [groupid]);

  // Handle group deletion
  const handleDeleteGroup = async () => {
    try {
      const response = await deleteGroup(groupid);
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
            <div className="text-sm text-gray-500">
              Created on {new Date(group.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="bg-blue-900 p-8 rounded-lg text-white w-full max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-sm mb-2">Group Name</label>
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)} // Fix: Change handler to set group name
                className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                placeholder={group.groupName}
              />
            </div>

            <div className="mb-4">
              <p className="font-medium">Number of Members:</p>
              <p>{memberCount} Members</p> {/* Display member count */}
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
        <p className="text-sm text-white">
          © 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak
        </p>
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
          groupId={groupid}
          groupName={groupName}
          onClose={() => setShowSavePopup(false)}
        />
      )}
    </div>
  );
};

export default EditGroupInfo;
