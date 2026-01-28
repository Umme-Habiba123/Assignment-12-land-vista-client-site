import React, {  useState } from "react";
import { NavLink } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";
import userPhoto from "../../../assets/user.png";
import VistaLand from "../ProjectLogo/VistaLand";
import { ThemeContext } from "../../../context/ThemeContext/ThemeContext";
import useAuth from "../../../hooks/useAuth";
import DashboardDropdown from "../../../Components/DashboardDropdown/DashboardDropdown";

const Navbar = () => {
  // const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logOutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    logOutUser()
      .then(() => console.log("Signed out"))
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="flex items-center gap-1">
          Home
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/profile" className="flex items-center gap-1">
          Profile
        </NavLink>
      </li> */}
      <li>
        <NavLink to="/gallery" className="flex items-center gap-1">
          Gallery
        </NavLink>
      </li>
      {/* <li>
        <NavLink to="/all-properties" className="flex items-center gap-1">
          All Properties
        </NavLink>
      </li> */}
      <li>
        <NavLink to="/propertyListings" className="flex items-center gap-1">
          Property
        </NavLink>
      </li>
      {user && <DashboardDropdown/>}
      <li>
        <NavLink to="/contact" className="flex items-center gap-1">
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/blog" className="flex items-center gap-1">
          Blog
        </NavLink>
      </li>
    </>
  );

  return (
    <nav className=" w-full bg-gray-300 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="navbar w-[95%] md:w-10/12 mx-auto px-3 md:px-2 py-4 flex justify-between items-center sansita-font">
        {/* Left: Logo & Mobile Menu */}
        <div className="flex items-center gap-3">
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-ghost p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {mobileMenuOpen && (
              <ul className="absolute top-14 left-0 bg-gray-100 w-52 shadow-md rounded-md p-2 space-y-2">
                {links}
              </ul>
            )}
          </div>
          <VistaLand />
        </div>

        {/* Center: Links for large screens */}
        <div className="navbar-center hidden lg:flex font-semibold">
          <ul className="menu menu-horizontal gap-4">{links}</ul>
        </div>

        {/* Right: User + Theme Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* User avatar */}
          <div className="relative group w-9 h-9 sm:w-10 sm:h-10">
            <img
              src={user?.photoURL || userPhoto}
              alt="User"
              className="w-full h-full rounded-full object-cover border border-purple-300"
            />
            {user?.displayName && (
              <p className="absolute top-full mt-1 left-1/2 transform -translate-x-1/2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-semibold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                {user.displayName}
              </p>
            )}
          </div>

          {/* Email */}
          {user && (
            <p className="hidden md:block text-xs  truncate max-w-[140px]">
              {user.email}
            </p>
          )}

          {/* Auth Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {user ? (
              <button
                onClick={handleSignOut}
                className="btn btn-outline btn-sm border-1 border-gray-300 text-black  font-bold hover:text-red-500 px-3 sm:px-4"
              >
                LOG OUT
              </button>
            ) : (
              <>
                <NavLink to="/login">
                  <button className="btn btn-outline border-2 border-white btn-sm bg-[#564F6F] font-bold text-white hover:bg-[#D1D7E0] hover:text-red-500 px-3 sm:px-4">
                    LOG IN
                  </button>
                </NavLink>
                <NavLink to="/registration">
                  <button className="btn btn-outline border-2 border-white btn-sm bg-[#564F6F] text-white hover:bg-[#D1D7E0] hover:text-red-500 font-bold px-3 sm:px-4">
                    REGISTRATION
                  </button>
                </NavLink>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          {/* <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:ring-2 transition-colors duration-300"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
