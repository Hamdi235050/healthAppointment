import {
  BarChart2,
  Calendar,
  FileText,
  Home,
  SettingsIcon,
  User,
  UserCog,
  UserMinus,
  UserPlus,
  Users,
  History,
  CreditCard,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import getCurrentUser from "../../../../../backEnd/getCurrentUser";

const getMenuItems = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  });

  const menuItems = useMemo(
    () => [
      {
        path: "/Dashboard/home",
        icon: <Home size={20} />,
        label: "Page d'accueil",
        roles: ["ADMIN"],
      },
      {
        path: "/Dashboard/AppointmentsList",
        icon: <Calendar size={20} />,
        label: "Confirmer les rendez-vous",
        roles: ["ADMIN"],
      },
      {
        path: "/Dashboard/transactions/manage",
        icon: <CreditCard size={20} />,
        label: "Gestion de transactions",
        roles: ["ADMIN"],
      },
      {
        path: "/Dashboard/appointments",
        icon: <Calendar size={20} />,
        label: "Liste des rendez-vous",
        roles: ["ADMIN", "PATIENT"],
      },
      {
        path: `/Dashboard/NewAppointment/${user}`,
        icon: <Home size={20} />,
        label: "Nouveau Rendez-vous",
        roles: ["PATIENT"],
      },
      {
        path: "/Dashboard/editAppointment",
        icon: <Calendar size={20} />,
        label: "Editer les rendez-vous",
        roles: ["PATIENT"],
        subItems: [],
      },
      {
        path: "/Dashboard/profile",
        icon: <User size={20} />,
        label: "Profile",
        roles: ["PATIENT"],
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
    ],
    [user]
  );

  return menuItems;
};

export default getMenuItems;
