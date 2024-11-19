import React from "react";
import { Calendar } from "lucide-react";
import { Appointment } from "./types";
import AppointmentCard from "./components/appointments/AppointmentCard";
import Sidebar from "./components/Sidebar";

const Appointments: React.FC = () => {
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
    {
      id: 4,
      patientName: "Sophie Laurent",
      time: "17:00",
      type: "Première consultation",
      status: "pending",
    },
  ];

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Liste des Rendez-vous
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
