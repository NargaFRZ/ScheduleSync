import React, { useState } from "react";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";

const GroupDetail = () => {
  const user = {
    name: "Wendy",
    email: "lebit1x@gmail.com",
  };

  const [activeTab, setActiveTab] = useState("entries");

  // Mock data for entries
  const entries = [
    { id: 1, name: "Nebula Afifah", email: "nebula@gmail.com", file: "SS_Nebula.jpg", status: "Done" },
    { id: 2, name: "Nebula Afifah", email: "nebula@gmail.com", file: "SS_Nebula.jpg", status: "NotYet" },
    // Tambahkan data sesuai kebutuhan
  ];

  const renderEntriesTable = () => (
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border p-4 text-left">#</th>
          <th className="border p-4 text-left">Name</th>
          <th className="border p-4 text-left">Email</th>
          <th className="border p-4 text-left">File</th>
          <th className="border p-4 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id} className="odd:bg-white even:bg-gray-50">
            <td className="border p-4">{entry.id}</td>
            <td className="border p-4">{entry.name}</td>
            <td className="border p-4">{entry.email}</td>
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
      {/* Navigation Bar */}
      <NavBar />

      {/* Layout Wrapper */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SideBar name={user.name} email={user.email} />

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-6">
          <div className="py-8">
            {/* Page Title */}
            <h1 className="text-4xl font-semibold mb-6">Multimedia Team</h1>

            {/* Tab Navigation */}
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

            {/* Tab Content */}
            <div className="bg-white shadow-md rounded-lg p-6">
              {activeTab === "entries" ? renderEntriesTable() : renderSyncedSchedule()}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-4 bg-blue-900 text-white fixed bottom-0 left-0 w-full">
        <p className="text-sm">
          © 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak
        </p>
      </footer>
    </div>
  );
};

export default GroupDetail;
