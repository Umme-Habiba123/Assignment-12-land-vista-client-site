import React, { useState } from "react";
import { NavLink } from "react-router";
import userPhoto from "../../../assets/user.png";
import VistaLand from "../ProjectLogo/VistaLand";
import useAuth from "../../../hooks/useAuth";
import DashboardDropdown from "../../../Components/DashboardDropdown/DashboardDropdown";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    logOutUser()
      .then(() => console.log("Signed out"))
      .catch((err) => console.log(err));
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/gallery", label: "Gallery" },
    { path: "/propertyListings", label: "Property" },
    { path: "/blog", label: "Blog" },
  ];

  const renderLinks = (
    <>
      {navLinks.map((link) => (
        <li key={link.path}>
          <NavLink
            to={link.path}
            className={({ isActive }) =>
              `flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                  : "text-gray-700 hover:bg-purple-50 hover:text-purple-600"
              }`
            }
          >
            {link.label}
          </NavLink>
        </li>
      ))}
      {user && (
        <li className="mt-1">
          <DashboardDropdown />
        </li>
      )}
    </>
  );

  return (
    <nav className="w-full bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <VistaLand />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1">{renderLinks}</ul>
          </div>

          {/* Right Side - User Info and Auth */}
          <div className="flex items-center gap-4">
            {/* User Profile with Dropdown */}
            {user ? (
              <div className="flex items-center gap-4">
                <div className="hidden md:flex flex-col items-end">
                  <p className="text-sm font-semibold text-gray-800 truncate max-w-[160px]">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[160px]">
                    {user.email}
                  </p>
                </div>

                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="cursor-pointer hover:ring-2 hover:ring-purple-300 rounded-full transition-all duration-300"
                  >
                    <div className="relative">
                      <img
                        src={user?.photoURL || userPhoto}
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow-lg bg-white rounded-box w-52 mt-2 border border-gray-200"
                  >
                    <li>
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-2 py-3 hover:bg-purple-50 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        Profile
                      </NavLink>
                    </li>
                    <li>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 py-3 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Log Out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink to="/login">
                  <button className="btn btn-outline btn-sm border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white hover:border-purple-600 font-semibold px-4 transition-all duration-300">
                    LOG IN
                  </button>
                </NavLink>
                <NavLink to="/registration">
                  <button className="btn bg-gradient-to-r from-purple-600 to-indigo-600 btn-sm text-white border-none hover:from-purple-700 hover:to-indigo-700 font-semibold px-4 shadow-md hover:shadow-lg transition-all duration-300">
                    REGISTER
                  </button>
                </NavLink>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-lg mt-2 border border-gray-200">
              <ul className="space-y-2">{renderLinks}</ul>
              {user && (
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <img
                      src={user?.photoURL || userPhoto}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                    />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full mt-3 btn btn-outline btn-sm text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;