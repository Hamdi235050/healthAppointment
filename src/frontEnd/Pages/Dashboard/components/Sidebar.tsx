import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getRole, logout } from "../../../../backEnd/getData";
import { getName } from "../../../../backEnd/getNameSettings";
import getUserRole from "../../../../backEnd/getUserRole";
import getMenuItems from "./ui/getMenuItems";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState<string>(""); // State for storing the user role
  const [name, setName] = useState<string>(""); // State for storing the name
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userName = await getName();
        const role = await getUserRole(); // Fetch the name
        setUserRole(role ?? "");
        console.log({ role });
        setName(userName); // Set the name in state
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [getRole]);

  const menuItems = getMenuItems();
  const filteredMenuItems = useMemo(() => {
    return menuItems.filter((item) => {
      return item.roles.includes(userRole);
    });
  }, [menuItems, userRole]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [navigate]); // Memoize the logout function

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-64"
      } bg-white border-r border-gray-200 relative transition-all duration-300 h-full`}
    >
      <div className={`p-6 ${isCollapsed ? "px-4" : ""}`}>
        <h1
          className={`text-2xl font-bold text-gray-800 truncate ${
            isCollapsed ? "text-center" : ""
          }`}
        >
          {isCollapsed
            ? `${name.substring(0, 2)}`
            : `${name.replace(/"/g, "")}`}
        </h1>
      </div>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-8 bg-white border border-gray-200 rounded-full p-1 shadow-sm hover:bg-gray-50"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <nav className="mt-6 h-full flex flex-col justify-between">
        <div>
          {filteredMenuItems.map((item) => (
            <div key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center ${
                    isCollapsed ? "justify-center" : ""
                  } px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                    isActive
                      ? "bg-blue-50 text-blue-600" // Active item styling
                      : "hover:bg-transparent hover:text-gray-700" // Non-active items still have hover effect
                  }`
                }
                title={isCollapsed ? item.label : undefined}
              >
                {item.icon}
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </NavLink>

              {!isCollapsed && item.subItems && (
                <div className="ml-8">
                  {item.subItems
                    .filter((subItem) => subItem.roles.includes(userRole))
                    .map((subItem) => (
                      <NavLink
                        key={subItem.path}
                        to={subItem.path}
                        className={({ isActive }) =>
                          `flex items-center px-6 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors ${
                            isActive ? "bg-blue-50 text-blue-600" : ""
                          }`
                        }
                      >
                        {subItem.icon}
                        <span className="ml-3">{subItem.label}</span>
                      </NavLink>
                    ))}
                </div>
              )}
            </div>
          ))}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : ""
              } px-6 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors`}
              title={isCollapsed ? "Déconnexion" : undefined}
            >
              <LogOut size={20} />
              {!isCollapsed && <span className="ml-3">Déconnexion</span>}
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
