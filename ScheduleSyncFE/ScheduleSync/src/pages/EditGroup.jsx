import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import PopupAddGroup from "../components/PopupAddGroup";
import PopupDeleteGroup from "../components/PopupDeleteGroup";
import PopupSaveEditGroup from "../components/PopupSaveEditGroup";
import { fetchGroupsByOwner, deleteGroup, getCountMember } from "../actions/group.actions"; // Import getCountMember
import { fetchUserData } from "../actions/account.actions";
import { useNavigate } from "react-router-dom";

const EditGroup = () => {
  const [showPopup, setShowPopup] = useState(false); // Add Group popup visibility
  const [showDeletePopup, setShowDeletePopup] = useState(false); // Delete Group popup visibility
  const [showSavePopup, setShowSavePopup] = useState(false); // Save confirmation popup visibility
  const [groups, setGroups] = useState([]); // Store groups
  const [selectedGroup, setSelectedGroup] = useState(null); // Group being deleted
  const [user, setUser] = useState(null); // User data
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use navigate for routing

  // Fetch user and group data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userResponse = await fetchUserData();
        if (userResponse.success) {
          const userData = userResponse.data;
          setUser({ name: userData.username, email: userData.email });

          const groupResponse = await fetchGroupsByOwner(userData.userid);
          if (groupResponse.success) {
            // Fetch member count for each group
            const groupsWithMemberCount = await Promise.all(
              groupResponse.data.groups.map(async (group) => {
                const countResponse = await getCountMember(group.groupid);
                return {
                  ...group,
                  memberCount: countResponse.success ? countResponse.data.memberCount : 0,
                };
              })
            );
            setGroups(groupsWithMemberCount);
          } else {
            console.error("Error fetching groups:", groupResponse.data);
          }
        } else {
          console.error("Error fetching user data:", userResponse.data);
        }
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle group deletion
  const handleDelete = async (groupID) => {
    const response = await deleteGroup(groupID);
    if (response.success) {
      setGroups((prev) => prev.filter((group) => group.groupid !== groupID));
      setShowDeletePopup(false);
    } else {
      console.error("Error deleting group:", response.data);
    }
  };

  // Handle group addition
  const handleAddGroup = (newGroup) => {
    setGroups((prev) => [...prev, newGroup]);
  };

  // Handle save confirmation
  const handleSaveEditGroup = () => {
    console.log("Changes saved!");
    setShowSavePopup(false); // Close save popup
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />
      <div className="flex flex-1 relative">
        {user ? (
          <SideBar
            name={user.name}
            email={user.email}
            className="fixed top-0 left-0 z-10"
          />
        ) : (
          <div>Loading user...</div>
        )}
        <div className="flex-1 flex flex-col px-6 py-8">
          <div className="flex items-center mb-8">
            <h1 className="text-4xl font-semibold">Edit Group</h1>
            <button
              className="bg-blue-900 text-white ml-4 py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => setShowPopup(true)}
            >
              New +
            </button>
            <button
              className="bg-green-600 text-white ml-4 py-2 px-4 rounded hover:bg-green-500"
              onClick={() => setShowSavePopup(true)} // Show save confirmation popup
            >
              Save Changes
            </button>
          </div>
          {loading ? (
            <p>Loading...</p>
          ) : groups.length === 0 ? (
            <p className="text-center text-blue-900">You do not own any groups</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group, index) => (
                <div
                  key={index}
                  className="bg-blue-900 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">{group.groupname}</h2>
                    <p className="text-sm">Members: {group.memberCount}</p> {/* Display member count */}
                  </div>
                  <div className="bg-gray-100 text-blue-900 p-3 rounded">
                    <p className="text-sm">
                      {group.description || "No description available"}
                    </p>
                  </div>
                  <div className="mt-4 flex justify-between">
                    <button
                      className="bg-white text-blue-900 px-3 py-1 rounded hover:bg-gray-100"
                      onClick={() => navigate(`/edit-group-info/${group.groupid}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500"
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowDeletePopup(true);
                      }}
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
      <footer className="text-center py-4 bg-blue-900 w-full fixed bottom-0 left-0">
        <p className="text-sm text-white">
          © 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak
        </p>
      </footer>
      {showPopup && (
        <PopupAddGroup onClose={() => setShowPopup(false)} onAddGroup={handleAddGroup} />
      )}
      {showDeletePopup && selectedGroup && (
        <PopupDeleteGroup
          group={selectedGroup}
          onClose={() => setShowDeletePopup(false)}
          onDelete={() => handleDelete(selectedGroup.groupid)}
        />
      )}
      {showSavePopup && (
        <PopupSaveEditGroup
          onClose={() => setShowSavePopup(false)}
          onSave={handleSaveEditGroup}
        />
      )}
    </div>
  );
};

export default EditGroup;
