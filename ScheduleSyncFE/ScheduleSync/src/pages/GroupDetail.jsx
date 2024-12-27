import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { getGroupbyId, getGroupMembers } from "../actions/group.actions";
import { fetchUserData } from "../actions/account.actions";

const GroupDetail = () => {
  const groupID = useParams();
  const [user, setUser] = useState({ name: "", email: "" }); // State to hold the user data
  const [activeTab, setActiveTab] = useState("entries");
  const [entries, setEntries] = useState([]); // State to hold fetched group members
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [scheduleSynced, setScheduleSynced] = useState(false); // State to track if schedule is synced
  const [groupDetail, setGroupDetail] = useState(null); // State to hold group details

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
            const formattedEntries = groupResponse.data.members.map(
              (member, index) => ({
                id: index + 1,
                name: member.username,
                file: member.file || "N/A",
                status: "Unsynced",
              })
            );
            setEntries(formattedEntries);
          } else {
            throw new Error("Failed to fetch group members.");
          }

          // Fetch group details by ID
          const groupDetailResponse = await getGroupbyId(groupID.groupid);
          if (groupDetailResponse.success) {
            // Store the group details in state
            setGroupDetail(groupDetailResponse.data.groups[0]);
            console.log(groupDetailResponse); // Example: Log the group name
          } else {
            throw new Error("Failed to fetch group details.");
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
  }, [groupID]); // Dependency array includes groupID, so it runs when groupID changes

  // Handle "Sync Schedule" button click
  const handleSyncSchedule = () => {
    const updatedEntries = entries.map((entry) => ({
      ...entry,
      status: "Synced",
    }));
    setEntries(updatedEntries);
    setScheduleSynced(true); // Set to true after sync
    alert("All schedules have been synced!");
  };

  // Group entries by status or any other criteria (e.g., name)
  const groupEntriesBy = (entries, groupBy) => {
    return entries.reduce((groups, entry) => {
      const groupKey = entry[groupBy];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(entry);
      return groups;
    }, {});
  };
  // Render entries table with grouped entries
  const renderEntriesTable = () => {
    // Group entries by status (or any other field like 'name')
    const groupedEntries = groupEntriesBy(entries, "status");

    return (
      <div>
        {Object.keys(groupedEntries).map((groupKey) => (
          <div key={groupKey} className="mb-4">
            <h2 className="text-2xl font-semibold">{groupKey} Entries</h2>
            <table className="min-w-full border border-gray-300 mt-2">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border p-4 text-left">#</th>
                  <th className="border p-4 text-left">Name</th>
                  <th className="border p-4 text-left">File</th>
                  <th className="border p-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {groupedEntries[groupKey].map((entry, index) => (
                  <tr key={index} className="odd:bg-white even:bg-gray-50">
                    <td className="border p-4">{entry.id}</td>
                    <td className="border p-4">{entry.name}</td>
                    <td className="border p-4">
                      {entry.file === "N/A" ? (
                        <a
                          href="https://firebasestorage.googleapis.com/v0/b/sip16-25755.appspot.com/o/files%2F9a28015d-ad7b-4c93-a6b3-3131c4e58b2b?alt=media&token=ce895c39-9cf3-44ff-9ffa-4dfad5ca5b03"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {entry.name}-Schedule
                        </a>
                      ) : (
                        <span className="text-blue-500 hover:underline cursor-pointer">
                          {entry.file}
                        </span>
                      )}
                    </td>
                    <td
                      className={`border p-4 ${
                        entry.status === "Synced"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {entry.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  };

  const scheduleData = {
    owner: "123e4567-e89b-12d3-a456-426614174000",
    scheduleData: {
      Monday: [
        {
          startTime: "07:00",
          endTime: "09:30",
          description: "Sistem Waktu Nyata dan IoT dan Praktikum",
        },
        {
          startTime: "16:00",
          endTime: "18:30",
          description: "Teknologi Big Data",
        },
      ],
      Tuesday: [
        {
          startTime: "10:00",
          endTime: "11:40",
          description: "Keamanan Jaringan Komputer dan Praktikum",
        },
      ],
      Wednesday: [
        {
          startTime: "07:00",
          endTime: "09:30",
          description: "Jaringan Telekomunikasi dan Praktikum",
        },
        {
          startTime: "13:00",
          endTime: "14:40",
          description: "Arsitektur Komputer Moderen",
        },
      ],
      Thursday: [
        {
          startTime: "08:00",
          endTime: "09:50",
          description: "Keamanan Jaringan Komputer dan Praktikum",
        },
        {
          startTime: "16:00",
          endTime: "17:40",
          description: "Kapita Selekta Teknik Komputer",
        },
      ],
      Friday: [
        {
          startTime: "08:00",
          endTime: "09:40",
          description: "Teori Sinyal dan Analisis Sistem",
        },
        {
          startTime: "13:00",
          endTime: "15:30",
          description: "Probabilitas dan Proses Stokastik",
        },
        {
          startTime: "16:00",
          endTime: "18:30",
          description: "Rekayasa Perangkat Lunak",
        },
      ],
    },
  };

  // Second set of schedule data (additional data)
  const additionalScheduleData = {
    Monday: [
      {
        startTime: "07:00",
        endTime: "09:30",
        description: "Sistem Waktu Nyata dan IoT dan Praktikum",
      },
      {
        startTime: "16:00",
        endTime: "18:30",
        description: "Teknologi Big Data",
      },
    ],
    Tuesday: [
      {
        startTime: "07:00",
        endTime: "09:30",
        description: "Probabilitas dan Proses Stokastik",
      },
      {
        startTime: "16:00",
        endTime: "17:30",
        description: "Keamanan Jaringan Komputer dan Praktikum",
      },
    ],
    Wednesday: [
      {
        startTime: "07:00",
        endTime: "09:30",
        description: "Arsitektur Komputer Moderen",
      },
    ],
    Thursday: [
      {
        startTime: "08:00",
        endTime: "09:50",
        description: "Teori Sinyal dan Analisis Sistem",
      },
    ],
    Friday: [
      {
        startTime: "07:00",
        endTime: "09:30",
        description: "Jaringan Telekomunikasi dan Praktikum",
      },
      {
        startTime: "16:00",
        endTime: "18:30",
        description: "Rekayasa Perangkat Lunak",
      },
    ],
  };

  const renderSyncedSchedule = () => {
    if (!scheduleSynced) {
      return (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-600">No available schedule.</p>
        </div>
      );
    }

    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const hours = Array.from({ length: 18 }, (_, i) => i + 6); // Array of hours from 6 to 23

    // Create a table of 6 days (columns) and 18 hours (rows)
    const scheduleTable = hours.map((hour) => {
      return (
        <tr key={hour}>
          <td className="border p-4 text-center hover:bg-gray-100">{`${hour}:00`}</td>
          {days.map((day) => {
            // Combine the data from both sets (main and additional)
            const allEvents = [
              ...(scheduleData.scheduleData[day] || []),
              ...(additionalScheduleData[day] || []),
            ];

            // Find events for this hour and day
            const eventsAtThisTime = allEvents.filter(
              (entry) =>
                parseInt(entry.startTime.split(":")[0]) <= hour && // match if event starts before or at the hour
                parseInt(entry.endTime.split(":")[0]) >= hour // match if event ends after or at the hour
            );

            // Determine the number of events
            const eventCount = eventsAtThisTime.length;

            return (
              <td
                key={day}
                className={`border p-4 text-center hover:bg-blue-100 ${
                  eventCount === 0
                    ? "bg-green-100"
                    : eventCount === 1
                    ? "bg-yellow-100"
                    : "bg-red-100"
                }`}
              >
                {eventCount === 0 ? (
                  <span className="text-gray-500">Classes: Free</span>
                ) : (
                  <span className="text-blue-500">Classes: {eventCount}</span>
                )}
              </td>
            );
          })}
        </tr>
      );
    });

    return scheduleTable.length > 0 ? (
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-4 text-left">Time</th>
            {days.map((day) => (
              <th key={day} className="border p-4 text-center">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{scheduleTable}</tbody>
      </table>
    ) : (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-600">No synced schedules available.</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />
      <div className="flex flex-1">
        <SideBar name={user.name} email={user.email} />
        <div className="flex-1 flex flex-col px-6">
          <div className="py-8">
            <h1 className="text-4xl font-semibold mb-6">
              {groupDetail ? groupDetail.groupname : "Loading..."}
            </h1>
            <p className="text-lg text-gray-700">
    Invite Code:{" "}
    {groupDetail && groupDetail.invitecode
      ? groupDetail.invitecode
      : "Fetching..."}
  </p>
            <div className="flex justify-between mb-6">
              <div>
                <button
                  onClick={() => setActiveTab("entries")}
                  className={`px-8 py-4 rounded-lg text-lg font-semibold transition ${
                    activeTab === "entries"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Schedule Entries
                </button>
                <button
                  onClick={() => setActiveTab("schedule")}
                  className={`ml-4 px-8 py-4 rounded-lg text-lg font-semibold transition ${
                    activeTab === "schedule"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  Synced Schedule
                </button>
              </div>
              <button
                onClick={handleSyncSchedule}
                className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-500 transition"
              >
                Sync Schedule
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
        <p className="text-sm">
          © 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak
        </p>
      </footer>
    </div>
  );
};

export default GroupDetail;
