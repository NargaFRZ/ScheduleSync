import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBarLogout";
import SideBar from "../components/SideBar";
import { fetchUserData } from "../actions/account.actions";

const YourSchedule = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchUserData();
        console.log("Fetched user data:", data);
        setUser({ name: data.data.username, email: data.data.email });
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError("Failed to load user data");
        setLoading(false); // Set loading to false even if there is an error
      }
    };
  
    fetchData();
  }, []);
  
  // This useEffect will be triggered when `user` state is updated
  useEffect(() => {
    console.log("User updated: ", user); // Logs user after state is updated
  }, [user]); // Dependency array, will run when `user` changes
  
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
