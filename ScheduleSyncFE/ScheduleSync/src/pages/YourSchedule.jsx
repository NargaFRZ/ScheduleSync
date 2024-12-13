import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { fetchUserData } from "../actions/account.actions";
import { getSchedulesByOwner } from "../actions/schedule.actions";

const YourSchedule = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Changed to boolean for simplicity
  const [scheduleImageUrl, setScheduleImageUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        setUser({ name: data.data.username, email: data.data.email });

        // Fetch schedules
        const schedulesResponse = await getSchedulesByOwner();
        const schedules = schedulesResponse.data.schedules;

        if (schedules.length > 0) {
          // Get the newest schedule
          const newestSchedule = schedules.sort(
            (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)
          )[0];
          const imageUrl = newestSchedule.scheduledata.metadata?.url || "";
          setScheduleImageUrl(imageUrl);
        }
      } catch (err) {
        setError(true); // Set error flag on failure
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-blue-900">
      <NavBar />
      <div className="flex flex-1 relative">
        <SideBar
          name={user.name}
          email={user.email}
          className="fixed top-0 left-0 z-10"
        />
        <div className="flex-1 flex flex-col mb-24">
          {/* Show "Oh, No!" message if error or no schedule image */}
          {error || !scheduleImageUrl ? (
            <div className="flex flex-1 flex-col items-center justify-center">
              <h1 className="text-6xl font-bold mb-4">Oh, No!</h1>
              <p className="text-xl mb-6">
                {error
                  ? "Something went wrong! Please try again later."
                  : "It seems like you haven’t added your schedule yet!"}
              </p>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
                onClick={() => navigate("/add-schedule")}
              >
                Add Your Schedule
              </button>
            </div>
          ) : (
            // Show the schedule image
            <div className="flex flex-col items-center justify-center my-8">
              <img
                src={scheduleImageUrl}
                alt="Schedule"
                className="w-full h-full object-cover"
                style={{ objectFit: "cover" }}
              />
            </div>
          )}

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
