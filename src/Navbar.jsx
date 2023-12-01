import React from "react";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-success " >
        <div className="flex space-x-10 justify-between">
          <a className="ml-5 navbar-brand text-light" href="/">
            Dashboard
          </a>
          <div className="flex">
          <a className="navbar-brand text-light" href="/aboutus">
            About us
          </a>
          <a className="navbar-brand text-light" href="/home">
            Home
          </a>
          <a className="navbar-brand text-light" href="/account">
            Account
          </a>
          </div>
        </div>
      </nav>
    </>
  );
};
