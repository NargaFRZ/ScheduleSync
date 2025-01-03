import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBarLogout";
import SSLogo from "../assets/SyncLogo.svg";
import backgroundImage from "../assets/backgroundImage.svg";

const LandingPage = () => {
  return (
    <div className="bg-gray-100">
      {/* Navbar */}
      {/* <NavBar className="w-full" /> */}

      {/* Hero Section with Background Image */}
      <section className="relative text-center bg-cover bg-center text-white h-[500px] flex items-center justify-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}>
        {/* Overlay for Better Readability */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 p-8">
          <h1 className="text-5xl font-bold">
            Effortlessly <span className="text-blue-400">Sync</span> your schedules
          </h1>
          <p className="mt-4 text-lg">
            Sync your university class schedules with friends, find common free time, and make planning easier than ever with ScheduleSync!
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/login">
              <button className="bg-blue-700 px-12 py-4 rounded font-medium">Start</button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white text-blue-900 p-16 text-center flex items-center justify-center">
        <img src={SSLogo} alt="Document Icon" className="w-1/5 mr-8" />
        <div>
          <div className="text-3xl font-bold mb-4">What is ScheduleSync?</div>
          <p className="text-lg max-w-2xl mx-auto">
            ScheduleSync is a specialized app designed to help university students synchronize their class schedules with ease.
            It can be used to manage class times, coordinate study groups, and align other academic commitments,
            allowing students to find common free time slots effortlessly.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="p-16 flex flex-wrap justify-center gap-8 bg-blue-900">
        
        <div className="bg-blue-700 text-white p-8 rounded-lg shadow-lg w-80">
          <h3 className="text-2xl font-bold mb-4">Upload your Schedule Now!</h3>
          <p>Scan your personal schedule to ScheduleSync</p>
          <button className="mt-6 bg-white text-blue-700 px-4 py-2 rounded font-medium">Upload</button>
        </div>
        <div className="bg-blue-700 text-white p-8 rounded-lg shadow-lg w-80">
          <h3 className="text-2xl font-bold mb-4">Sync your Schedule with friends!</h3>
          <p>Find common time between your group or friends with ScheduleSync!</p>
          <button className="mt-6 bg-white text-blue-700 px-4 py-2 rounded font-medium">Join Group</button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white p-4 text-center">
        <p>© 2024 ScheduleSync - Group 17 Rekayasa Perangkat Lunak</p>
      </footer>
    </div>
  );
};

export default LandingPage;
