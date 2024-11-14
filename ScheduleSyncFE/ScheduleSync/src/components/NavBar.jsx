import React, { useEffect, useState } from "react";
import SSBlue from "../assets/SyncLogoBlue.svg";

function NavBar() {
    return (
        <nav className="glass w-full">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-left space-x-2 rtl:space-x-reverse">
            <img src={SSBlue} className="h-12" alt="Logo" />
          </div>
          <div className="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-200 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
              <li>
                <a
                  href="/home"
                  className="block py-2 px-3 text-blue-900 rounded md:bg-transparent md:p-0 hover:text-blue-700"
                >
                  Check your Schedule
                </a>
              </li>
              <li>
                <a
                  href="/publikasi"
                  className="block py-2 px-3 text-blue-900 rounded hover:bg-blue-300 md:hover:bg-transparent md:border-0 md:p-0 hover:text-blue-700"
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default NavBar;