// components/Sidebar/AdminSidebar.jsx
import { NavLink } from "react-router"; // fixed import
import { FaUserShield, FaHome, FaUsersCog, FaStar, FaBullhorn, FaPhoneAlt } from "react-icons/fa";
import VistaLand from "../../../Shared/ProjectLogo/VistaLand";

const AdminSidebar = () => {
  const menuItems = [
    { path: "/dashboard/admin", icon: <FaUserShield />, label: "Admin Profile" },
    { path: "/dashboard/admin/manage-properties", icon: <FaHome />, label: "Manage Properties" },
    { path: "/dashboard/admin/manage-users", icon: <FaUsersCog />, label: "Manage Users" },
    { path: "/dashboard/admin/manage-reviews", icon: <FaStar />, label: "Manage Reviews" },
    { path: "/dashboard/admin/advertise-property", icon: <FaBullhorn />, label: "Advertise Property" },
    { path: "/dashboard/admin/contact", icon:<FaPhoneAlt />, label: "Contacts" },
  ];

  return (
    <div className="flex flex-col h-full bg-base-200 text-black">
      {/* Logo & Title */}
      <div className="flex flex-col items-center lg:items-start p-4">

        <h2 className="text-xl lg:text-2xl font-bold text-purple-700 mt-4 mb-6 text-center lg:text-left">
          Admin Dashboard
        </h2>
      </div>

      {/* Menu Items */}
      <ul className="flex-1 flex flex-col gap-2 px-2 lg:px-4">
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <NavLink
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-2 p-3 rounded-lg transition-colors duration-200
                 ${isActive ? "bg-purple-200 font-semibold" : "hover:bg-purple-100"}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-black">{item.label}</span>
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

export default AdminSidebar;
