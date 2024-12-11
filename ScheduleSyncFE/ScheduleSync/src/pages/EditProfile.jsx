import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { fetchUserData, editUser } from "../actions/account.actions";

const EditProfile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [password, setPassword] = useState(""); // New password state
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
    try {
      const updateData = { username: editName, email: editEmail };
      if (password) {
        updateData.password = password; // Include password if provided
      }
      await editUser(updateData);
      setUser({ name: editName, email: editEmail });
      setSuccessMessage("Profile updated successfully!");
      setPassword(""); // Clear password field after saving
    } catch (err) {
      console.error("Failed to update user profile:", err);
      setError("Failed to update profile");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
        <div className="flex-1 flex flex-col px-6 py-8 pb-20">
          {/* Page Header */}
          <h1 className="text-4xl font-semibold mb-8">Edit Profile</h1>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
              {successMessage}
            </div>
          )}

          {/* Profile Form */}
          <div className="bg-blue-900 p-8 rounded-lg text-white w-full max-w-2xl mx-auto">
            {/* Input Nama Lengkap */}
            <div className="mb-6">
              <label className="block text-sm mb-2" htmlFor="nama">
                Username
              </label>
              <input
                id="nama"
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                placeholder="Enter username"
              />
            </div>

            {/* Input Email */}
            <div className="mb-6">
              <label className="block text-sm mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                placeholder="Enter email"
              />
            </div>

            {/* Input Password */}
            <div className="mb-6">
              <label className="block text-sm mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg text-blue-900 bg-white"
                placeholder="Enter new password"
              />
              <p className="text-xs mt-2 text-gray-200">
                Leave blank to keep the current password.
              </p>
            </div>

            {/* Save Button */}
            <div className="text-right">
              <button
                onClick={handleSave}
                className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
              >
                Save
              </button>
            </div>
          </div>

          {/* Delete Account Button */}
          <div className="flex justify-center mt-8">
            <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-500">
              Permanently Delete my account
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

export default EditProfile;
