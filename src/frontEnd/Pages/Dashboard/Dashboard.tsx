import React from "react";
import { Outlet } from "react-router-dom"; // for nested routes
import Sidebar from "./components/Sidebar";
import StatsGrid from "./components/dashboard/StatsGrid";
import AppointmentCard from "./components/appointments/AppointmentCard";
import NoteCard from "./components/notes/NoteCard";
import { Appointment, MedicalNote } from "./types";

const Dashboard: React.FC = () => {
  const appointments: Appointment[] = [
    {
      id: 1,
      patientName: "Jean Dupont",
      time: "14:30",
      type: "Consultation générale",
      status: "confirmed",
    },
    {
      id: 2,
      patientName: "Marie Martin",
      time: "15:00",
      type: "Suivi",
      status: "pending",
    },
    {
      id: 3,
      patientName: "Pierre Bernard",
      time: "16:15",
      type: "Consultation urgente",
      status: "confirmed",
    },
  ];

  const notes: MedicalNote[] = [
    {
      id: 1,
      patientName: "Jean Dupont",
      timestamp: "Il y a 1h",
      content: "Suivi traitement hypertension - Tension stable",
    },
    {
      id: 2,
      patientName: "Marie Martin",
      timestamp: "Il y a 2h",
      content: "Renouvellement ordonnance - Traitement chronique",
    },
    {
      id: 3,
      patientName: "Pierre Bernard",
      timestamp: "Il y a 3h",
      content: "Consultation de contrôle - Evolution favorable",
    },
  ];

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="flex-1 p-8">
        <StatsGrid />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
