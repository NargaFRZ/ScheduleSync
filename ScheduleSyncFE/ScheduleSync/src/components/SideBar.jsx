import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const SideBar = ({ name, email }) => {
  const navigate = useNavigate();
  const menuItems = [
    { name: "Your Schedule", path: "/yourschedule", icon: "+" },
    { name: "Your Groups", path: "/groups", icon: "+" },
    { name: "Edit Password", path: "/edit-password", icon: "+" },
    { name: "Edit Group", path: "/edit-group", icon: "+" },
  ];

  return (
    <div className="h-min-screen w-64 bg-blue-900 text-white flex flex-col px-6 py-8">
      {/* User Info */}
      <div className="flex flex-col items-start mb-8 relative">
        <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-sm text-gray-300">{email}</p>
        <button
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-white"
          onClick={() => navigate('/edit-profile')}
        >
          ✎ {/* Edit icon */}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-4">
        <div className="text-white">Dashboard</div> {/* Added Dashboard */}
        {menuItems.slice(0, 2).map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-2 rounded-lg ${
                isActive ? "bg-white text-blue-900" : "hover:bg-blue-700"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
        <div className="text-white">Settings</div> {/* Added Settings */}
        {menuItems.slice(2).map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-2 rounded-lg ${
                isActive ? "bg-white text-blue-900" : "hover:bg-blue-700"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
