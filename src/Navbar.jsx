import React, { useState } from "react";

export const Navbar = () => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-blue-700 ">
        <div className="flex space-x-10 justify-between w-screen">
          <a className="ml-5 navbar-brand text-light" href="/">
            Dashboard
          </a>
          <div className="flex mx-4">
            <a className="navbar-brand text-light" href="/aboutus">
              About us
            </a>
            <a className="navbar-brand text-light" href="/home">
              Home
            </a>
            {/* Dropdown for Account */}
            <div className="dropdown flex" onClick={toggleAccountDropdown}>
              <a
                className="navbar-brand text-light dropdown-toggle "
                href="/account"
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
                <a className="dropdown-item" href="/account/logout">
                  Logout
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
