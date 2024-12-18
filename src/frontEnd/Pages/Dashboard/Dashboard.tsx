import React from "react";
import Sidebar from "./components/Sidebar";
import AppointmentCard from "./components/appointments/AppointmentCard";
import StatsGrid from "./components/dashboard/StatsGrid";
import NoteCard from "./components/notes/NoteCard";
import { Appointment, MedicalNote } from "./types";

const Dashboard: React.FC = () => {
  const appointments: Appointment[] = [
    {
      id: 1,
      patientName: "Jean Dupont",
      time: "14:30",
      type: "Consultation générale",
      status: "CANCELLED",
    },
    {
      id: 2,
      patientName: "Marie Martin",
      time: "15:00",
      type: "Suivi",
      status: "SCHEDULED",
    },
    {
      id: 3,
      patientName: "Pierre Bernard",
      time: "16:15",
      type: "Consultation urgente",
      status: "CONFIRMED",
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
    <div className="flex   h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Tableau de Bord
        </h1>

        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Rendez-vous à venir
            </h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Notes Récentes
            </h2>
            <div className="space-y-4">
              {notes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
