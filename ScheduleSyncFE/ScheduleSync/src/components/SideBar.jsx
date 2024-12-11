import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import calendarIcon from "../assets/icons/uil_calender.svg";
import groupsIcon from "../assets/icons/groups.svg";
import lockIcon from "../assets/icons/Lock_alt.svg";
import editIcon from "../assets/icons/edit_square.svg";
import edit from "../assets/icons/edit.svg";

const SideBar = ({ name, email }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "Your Schedule", path: "/yourschedule", icon: calendarIcon },
    { name: "Your Groups", path: "/groups", icon: groupsIcon },
    { name: "Edit Password", path: "/edit-password", icon: lockIcon },
    { name: "Edit Group", path: "/edit-group", icon: editIcon },
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
          <img src={edit} alt="Edit icon" className="h-4 w-4" />
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 space-y-4">
        <div className="text-white">Dashboard</div>
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-4 py-2 rounded-lg ${
                isActive ? "bg-white text-blue-900" : "hover:bg-blue-700"
              }`
            }
          >
            <img src={item.icon} alt={`${item.name} icon`} className="h-6 w-6" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
