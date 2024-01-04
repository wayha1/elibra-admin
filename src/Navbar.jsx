import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [unsubscribe, setUnsubscribe] = useState(null);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const authStateChangedListener = (admin) => {
      if (!admin) {
        navigate("/login");
      }
    };
    const authUnsubscribe = onAuthStateChanged(auth, authStateChangedListener);
    setUnsubscribe(() => authUnsubscribe);
    return () => {
      authUnsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const logOut = async () => {
    try {
      if (unsubscribe) {
        unsubscribe();
      }
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a className="text-white text-xl" href="/dashboard/management">
          E-Libra Dashboard
        </a>
        <div className="flex items-center relative" ref={dropdownRef}>
          <div className="dropdown relative">
            <button
              className="text-white text-xl dropdown-toggle"
              onClick={toggleAccountDropdown}
            >
              Account
            </button>
            <div
              className={`absolute -right-20 mt-5 w-60 bg-gray-300 
              border rounded-lg shadow-md overflow-hidden dropdown-menu ${
                isAccountDropdownOpen ? "block" : "hidden"
              } bg-gray-400 p-3`}
            >
              <a className="dropdown-item text-xl hover:text-blue-300" href="/account">
                Profile
              </a>
              <div className={`dropdown-divider${isAccountDropdownOpen ? "block" : "hidden"}`}></div>
              <button className="dropdown-item text-xl hover:text-blue-300 mt-3" onClick={logOut}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
