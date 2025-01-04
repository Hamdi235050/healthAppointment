import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import getCurrentUser from "./backEnd/getCurrentUser";
import { getRole } from "./backEnd/getData";
import { Accueil } from "./frontEnd/Pages/Accueil/Accueil";
import AddNote from "./frontEnd/Pages/AddNote/AddNote";
import AddPatient from "./frontEnd/Pages/AddPatient/AddPatient";
import Appointments from "./frontEnd/Pages/Dashboard/Appointments";
import { AppointmentListAdmin } from "./frontEnd/Pages/Dashboard/components/appointments/AppointmentsListAdmin";
import EditAppointment from "./frontEnd/Pages/Dashboard/components/appointments/EditAppointment";
import NewAppointment from "./frontEnd/Pages/Dashboard/components/appointments/NewAppointment";
import Dashboard from "./frontEnd/Pages/Dashboard/Dashboard";
import Patients from "./frontEnd/Pages/Dashboard/Patients";
import Settings from "./frontEnd/Pages/Dashboard/Settings";
import Statistics from "./frontEnd/Pages/Dashboard/Statistics";
import Transactions from "./frontEnd/Pages/Dashboard/Transactions";
import DeleteNote from "./frontEnd/Pages/DeleteNote/DeleteNote";
import DeletePatient from "./frontEnd/Pages/DeletePatent/DeletePatient";
import EditNote from "./frontEnd/Pages/EditNote/EditNote";
import EditPatient from "./frontEnd/Pages/EditPatient/EditPatient";
import Login from "./frontEnd/Pages/Login";
import PatientProfile from "./frontEnd/Pages/ProfilePatient/ProfilePatient";

export default () => {
  const userRoles = {
    ADMIN: "ADMIN",
    DOCTOR: "DOCTOR",
    PATIENT: "PATIENT",
  };

  const [role, setRole] = useState<string | null>(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const role = await getRole();
        setRole(role);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [getRole, getCurrentUser]);
  console.log({ role });
  const hasAccess = (roles: string[]) => {
    return roles.length === 0 || roles.includes(role!); // Check for no roles (i.e., accessible to all)
  };
  const routesConfig = [
    {
      path: "/login",
      element: <Login />,
      roles: [],
    },
    {
      path: "/Dashboard/home",
      element: <Dashboard />,
      roles: [userRoles.ADMIN, userRoles.PATIENT],
    },
    {
      path: "/Dashboard/patients",
      element: <Patients />,
      roles: [userRoles.DOCTOR, userRoles.ADMIN],
    },
    {
      path: "/Dashboard/patients/notes/add",
      element: <AddNote />,
      roles: [userRoles.DOCTOR, userRoles.ADMIN],
    },
    {
      path: "/Dashboard/patients/notes/delete",
      element: <DeleteNote />,
      roles: [userRoles.DOCTOR, userRoles.ADMIN],
    },
    {
      path: "/Dashboard/patients/notes/edit",
      element: <EditNote />,
      roles: [userRoles.DOCTOR, userRoles.ADMIN],
    },
    {
      path: "/Dashboard/Settings",
      element: <Settings />,
      roles: [userRoles.ADMIN],
    },
    {
      path: "/Dashboard/AppointmentsList",
      element: <AppointmentListAdmin />,
      roles: [userRoles.ADMIN],
    },
    {
      path: "/Dashboard/NewAppointment/:id",
      element: <NewAppointment />,
      roles: [userRoles.ADMIN, userRoles.PATIENT],
    },
    {
      path: "/Dashboard/appointments",
      element: <Appointments />,
      roles: [userRoles.ADMIN, userRoles.PATIENT],
    },
    {
      path: "/Dashboard/EditAppointment",
      element: <EditAppointment />,
      roles: [userRoles.ADMIN, userRoles.PATIENT],
    },
    {
      path: "/Dashboard/Statistics",
      element: <Statistics />,
      roles: [userRoles.ADMIN],
    },
    {
      path: "/Dashboard/Transactions",
      element: <Transactions />,
      roles: [userRoles.ADMIN],
    },
    {
      path: "/Dashboard/patients/add",
      element: <AddPatient />,
      roles: [userRoles.PATIENT, userRoles.DOCTOR, userRoles.ADMIN],
    },
    {
      path: "/Dashboard/patients/delete",
      element: <DeletePatient />,
      roles: [userRoles.PATIENT, userRoles.DOCTOR, userRoles.ADMIN],
    },
    {
      path: "/Dashboard/patients/edit",
      element: <EditPatient />,
      roles: [userRoles.PATIENT, userRoles.DOCTOR, userRoles.ADMIN],
    },
    {
      path: "/",
      element: <Accueil />,
      roles: [],
    },
    {
      path: "/Dashboard/profile",
      element: <PatientProfile />,
      roles: [userRoles.PATIENT],
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {routesConfig.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};
