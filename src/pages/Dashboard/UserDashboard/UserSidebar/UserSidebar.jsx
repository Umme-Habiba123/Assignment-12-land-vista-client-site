// components/Sidebar/UserSidebar.jsx
import { NavLink } from "react-router"; // fixed import
import { FaUser, FaHeart, FaStar, FaHouseUser } from "react-icons/fa";

const UserSidebar = () => {
  const menuItems = [
    { path: "/dashboard/user/my-profile", icon: <FaUser />, label: "My Profile" },
    { path: "/dashboard/user/wishlist", icon: <FaHeart />, label: "Wishlist" },
    { path: "/dashboard/user/property-bought", icon: <FaHouseUser />, label: "Property Bought" },
    { path: "/dashboard/user/my-reviews", icon: <FaStar />, label: "My Reviews" },
  ];

  return (
    <div className="flex flex-col h-full bg-white text-black border-r border-red-500">
      {/* Logo and Title */}
      <div className="flex flex-col items-center lg:items-start p-4">
        <h2 className="text-xl lg:text-2xl font-bold text-red-600 mt-4 mb-6 text-center lg:text-left">
          User Dashboard
        </h2>
      </div>

      {/* Menu */}
      <ul className="flex-1 flex flex-col gap-2 px-2 lg:px-4">
        {menuItems.map((item, index) => (
          <li key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition-colors duration-200
                 ${isActive ? "bg-red-100 font-semibold text-red-700" : "hover:bg-red-50 text-black"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="p-4 hidden lg:block">
        <p className="text-xs text-gray-500 text-center lg:text-left">
          &copy; 2025 VistaLand
        </p>
      </div>
    </div>
  );
};

export default UserSidebar;
