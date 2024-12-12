import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { fetchUserData } from "../actions/account.actions";
import { getSchedulesByOwner } from "../actions/schedule.actions"; // Assuming this is the action to fetch schedules

const YourSchedule = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scheduleImageUrl, setScheduleImageUrl] = useState(""); // State to store the image URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        console.log("Fetched user data:", data);
        setUser({ name: data.data.username, email: data.data.email });
        setLoading(false); // Set loading to false after user data is fetched

        // Fetch schedules after user data is loaded
        const schedulesResponse = await getSchedulesByOwner();
        const schedules = schedulesResponse.data.schedules;

        if (schedules.length > 0) {
          // Sort the schedules by the 'uploaded_at' timestamp in descending order
          const newestSchedule = schedules.sort(
            (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)
          )[0];

          // Extract the image URL from the newest schedule's metadata
          const imageUrl = newestSchedule.scheduledata.metadata?.url || "";
          setScheduleImageUrl(imageUrl); // Set the schedule image URL
        }
      } catch (err) {
        setError("Failed to load user data or schedules");
        setLoading(false); // Set loading to false even if there is an error
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Display while data is being fetched
  }

  if (error) {
    return <div>Error: {error}</div>; // In case of an error
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />
      <div className="flex flex-1 relative">
        {/* Render the SideBar only when user.name and user.email are available */}
        <SideBar
          name={user.name}
          email={user.email}
          className="fixed top-0 left-0 z-10"
        />
        <div className="flex-1 flex flex-col mb-24">
          {/* Display the newest schedule image if available */}
          <div className="flex flex-col items-center justify-center my-8">
            {scheduleImageUrl ? (
              <img
                src={scheduleImageUrl}
                alt="Schedule"
                className="object-contain w-3/4 h-80"
              />
            ) : (
              <p className="text-xl text-gray-500">
                No schedule image available. Add a schedule to view it.
              </p>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-6xl font-bold mb-4">Oh, No!</h1>
            <p className="text-xl mb-6">
              It seems like you haven’t added your schedule yet!
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
              onClick={() => navigate("/add-schedule")}
            >
              Add Your Schedule
            </button>
          </div>

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

export default YourSchedule;
