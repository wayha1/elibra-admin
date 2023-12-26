import React, { useState } from "react";
export const Navbar = () => {
  
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const logOut = () => {
    localStorage.clear()
    window.location.reload()
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-gray-700">
        <div className="flex space-x-10 justify-between w-screen">
          <a className="ml-5 navbar-brand text-light" href="/dashboard/management">
            E-Libra Dashboard
          </a>
          <div className="flex mx-4">
            <a className="navbar-brand text-light" href="/">
              Home
            </a>
            {/* <a className="navbar-brand text-light" href="/aboutus">
              About us
            </a> */}
            {/* Dropdown for Account */}
            <div className="dropdown flex" onClick={toggleAccountDropdown}>
              <a
                className="navbar-brand text-light dropdown-toggle "
                // href="/account"
                role="button"
                id="accountDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded={isAccountDropdownOpen}
              >
                Account
              </a>
              <div
                className={`dropdown-menu mt-5 ${isAccountDropdownOpen ? "show" : ""}`}
                aria-labelledby="accountDropdown"
              >
                {/* Dropdown items */}
                <a className="dropdown-item" href="/account">
                  Profile
                </a>
                <a className="dropdown-item" href="/account/settings">
                  Settings
                </a>
                <div className="dropdown-divider"></div>
                {/* <a className="dropdown-item" href="/account/logout">
                  Logout
                </a> */}
                <button 
                className="bg-blue-500 text-white py-2 rounded-xl hover:bg-red-600 
                transition w-full max-w-[350px] duration-300 mt-4"
                onClick={logOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};