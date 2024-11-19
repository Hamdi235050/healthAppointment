import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Accueil } from "./frontEnd/Pages/Accueil/Accueil";
import Appointments from "./frontEnd/Pages/Dashboard/Appointments";
import Dashboard from "./frontEnd/Pages/Dashboard/Dashboard";
import Patients from "./frontEnd/Pages/Dashboard/Patients";
import Settings from "./frontEnd/Pages/Dashboard/Settings";
import Statistics from "./frontEnd/Pages/Dashboard/Statistics";
import Transactions from "./frontEnd/Pages/Dashboard/Transactions";
import Login from "./frontEnd/Pages/Login";
import AddPatient from "./frontEnd/Pages/AddPatient/AddPatient";
import DeletePatient from "./frontEnd/Pages/DeletePatent/DeletePatient";
import EditPatient from "./frontEnd/Pages/EditPatient/EditPatient";
import AddNote from "./frontEnd/Pages/AddNote/AddNote";
import DeleteNote from "./frontEnd/Pages/DeleteNote/DeleteNote";
import EditNote from "./frontEnd/Pages/EditNote/EditNote";
export default () => {
  const userRoles = {
    ADMIN: "admin",
    DOCTOR: "doctor",
    PATIENT: "patient",
  };
  function useUserRole() {
    const [role, setRole] = useState<string>("");

    useEffect(() => {
      setRole(userRoles.ADMIN);
    }, []);

    return role;
  }

  const routesConfig = [
    {
      path: "/login",
      element: <Login />,
      roles: [userRoles.PATIENT, userRoles.ADMIN],
    },
    { path: "/Dashboard", element: <Dashboard />, roles: [userRoles.ADMIN] },
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
      path: "/Dashboard/appointments",
      element: <Appointments />,
      roles: [userRoles.ADMIN],
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
      roles: [userRoles.PATIENT, userRoles.DOCTOR, userRoles.ADMIN],
    },
  ];
  const role = useUserRole();
  return (
    <BrowserRouter>
      <Routes>
        {routesConfig.map((route, index) => {
          if (route.roles.includes(role)) {
            return (
              <Route key={index} path={route.path} element={route.element} />
            );
          }
          return null;
        })}
      </Routes>
    </BrowserRouter>
  );
};
