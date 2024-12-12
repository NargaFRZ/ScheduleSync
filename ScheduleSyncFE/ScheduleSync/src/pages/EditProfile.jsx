import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { fetchUserData, editUser } from "../actions/account.actions";

const EditProfile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUser({ name: data.data.username, email: data.data.email });
        setEditName(data.data.username);
        setEditEmail(data.data.email);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Failed to load user data");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    if (newPassword && newPassword !== repeatPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const updateData = { username: editName, email: editEmail };
      if (oldPassword && newPassword) {
        updateData.oldPassword = oldPassword;
        updateData.newPassword = newPassword;
      }
      await editUser(updateData);
      setUser({ name: editName, email: editEmail });
      setSuccessMessage("Profile updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
      setError(null); // Clear any previous error
    } catch (err) {
      console.error("Failed to update user profile:", err);
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error && !successMessage) {
    return <p>{error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />
      <div className="flex flex-1 relative">
        <SideBar name={user.name} email={user.email} className="fixed top-0 left-0 z-10" />
        <div className="flex-1 flex flex-col px-6 py-8 pb-20">
          <h1 className="text-4xl font-semibold mb-8">Edit Profile</h1>

          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}

          <div className="bg-blue-900 p-8 rounded-lg text-white w-full max-w-2xl mx-auto">
            <div className="mb-6">
              <label className="block text-sm mb-2">Username</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                placeholder="Enter username"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                placeholder="Enter email"
              />
            </div>

            {/* Space and instruction */}
            <div className="mb-6 mt-8 p-4 bg-gray-100 text-blue-900 rounded">
              <p className="text-sm">
                If you want to change your profile information only, leave the password fields below blank.
              </p>
            </div>

            {/* Password Fields */}
            <div className="mb-6">
              <label className="block text-sm mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-2"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-2"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showRepeatPassword ? "text" : "password"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  className="absolute right-4 top-2"
                  onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                >
                  👁️
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                onClick={handleSave}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="text-center py-4 bg-blue-900 w-full">
        <p className="text-sm text-white">© 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak</p>
      </footer>
    </div>
  );
};

export default EditProfile;
