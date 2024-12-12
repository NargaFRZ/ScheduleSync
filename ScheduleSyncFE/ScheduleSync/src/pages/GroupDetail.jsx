import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { getGroupMembers } from "../actions/group.actions";
import { fetchUserData } from "../actions/account.actions";

const GroupDetail = () => {
  const groupID = useParams();
  const [user, setUser] = useState({ name: "", email: "" }); // State to hold the user data
  const [activeTab, setActiveTab] = useState("entries");
  const [entries, setEntries] = useState([]); // State to hold fetched group members
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch user data and group members when component mounts
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch user data
        const userResponse = await fetchUserData();
        if (userResponse.success) {
          const userData = userResponse.data;
          setUser({ name: userData.username, email: userData.email });

          // Fetch group members
          const groupResponse = await getGroupMembers(groupID.groupid);
          if (groupResponse.success) {
            const formattedEntries = groupResponse.data.members.map((member, index) => ({
              id: index + 1,
              name: member.username,
              file: member.file || "N/A",
              status: member.status || "Unknown",
            }));
            setEntries(formattedEntries);
          } else {
            throw new Error("Failed to fetch group members.");
          }
        } else {
          throw new Error("Failed to fetch user data.");
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [groupID]);

  // Render entries table
  const renderEntriesTable = () => (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-4 text-left">#</th>
          <th className="border p-4 text-left">Name</th>
          <th className="border p-4 text-left">File</th>
          <th className="border p-4 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index} className="odd:bg-white even:bg-gray-50">
            <td className="border p-4">{entry.id}</td>
            <td className="border p-4">{entry.name}</td>
            <td className="border p-4 text-blue-500 hover:underline cursor-pointer">
              {entry.file}
            </td>
            <td className={`border p-4 ${entry.status === "Done" ? "text-green-600" : "text-yellow-600"}`}>
              {entry.status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderSyncedSchedule = () => (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-600">Synced Schedule belum tersedia.</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />
      <div className="flex flex-1">
        <SideBar name={user.name} email={user.email} />
        <div className="flex-1 flex flex-col px-6">
          <div className="py-8">
            <h1 className="text-4xl font-semibold mb-6">Multimedia Team</h1>
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setActiveTab("entries")}
                className={`px-8 py-4 rounded-lg text-lg font-semibold transition ${
                  activeTab === "entries" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Schedule Entries
              </button>
              <button
                onClick={() => setActiveTab("schedule")}
                className={`ml-4 px-8 py-4 rounded-lg text-lg font-semibold transition ${
                  activeTab === "schedule" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
                }`}
              >
                Synced Schedule
              </button>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6">
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : activeTab === "entries" ? (
                renderEntriesTable()
              ) : (
                renderSyncedSchedule()
              )}
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

export default GroupDetail;
