import {
  BarChart2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  FileText,
  History,
  Home,
  LogOut,
  Settings as SettingsIcon,
  UserCog,
  UserMinus,
  UserPlus,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getRole, logout } from "../../../../backEnd/getData";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userRole = getRole() || "";
  const navigate = useNavigate();
  const menuItems = [
    {
      path: "/Dashboard/home",
      icon: <Home size={20} />,
      label: "Page d'accueil",
      roles: ["ADMIN", "DOCTOR"],
    },
    {
      path: "/Dashboard/appointments",
      icon: <Calendar size={20} />,
      label: "Liste des rendez-vous",
      roles: ["ADMIN", "DOCTOR"],
    },
    {
      path: "/Dashboard/patients",
      icon: <Users size={20} />,
      label: "Liste des Patients",
      roles: ["ADMIN", "DOCTOR"],
      subItems: [
        {
          path: "/Dashboard/patients/notes/add",
          icon: <FileText size={20} />,
          label: "Ajouter une Note",
          roles: ["ADMIN", "DOCTOR"],
        },
        {
          path: "/Dashboard/patients/notes/edit",
          icon: <FileText size={20} />,
          label: "Modifier une Note",
          roles: ["ADMIN", "DOCTOR"],
        },
        {
          path: "/Dashboard/patients/notes/delete",
          icon: <FileText size={20} />,
          label: "Supprimer une Note",
          roles: ["ADMIN", "DOCTOR"],
        },
        {
          path: "/Dashboard/patients/add",
          icon: <UserPlus size={20} />,
          label: "Ajouter un patient",
          roles: ["ADMIN", "DOCTOR"],
        },
        {
          path: "/Dashboard/patients/delete",
          icon: <UserMinus size={20} />,
          label: "Supprimer un patient",
          roles: ["ADMIN", "DOCTOR"],
        },
        {
          path: "/Dashboard/patients/edit",
          icon: <UserCog size={20} />,
          label: "Modifier un patient",
          roles: ["ADMIN", "DOCTOR"],
        },
      ],
    },
    {
      path: "/Dashboard/settings",
      icon: <SettingsIcon size={20} />,
      label: "Paramètres",
      roles: ["ADMIN"],
    },
    {
      path: "/Dashboard/statistics",
      icon: <BarChart2 size={20} />,
      label: "Statistiques",
      roles: ["ADMIN", "user"],
    },
    {
      path: "/Dashboard/transactions",
      icon: <History size={20} />,
      label: "Historique des transactions",
      roles: ["ADMIN", "user"],
    },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    return userRole && item.roles.includes(userRole);
  });
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
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
          {isCollapsed ? "CM" : "Cabinet Médical"}
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
