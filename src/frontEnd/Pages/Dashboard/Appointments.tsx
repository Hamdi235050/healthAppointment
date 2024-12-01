import React from "react";
import { Calendar } from "lucide-react";
import { Appointment } from "./types";
import AppointmentCard from "./components/appointments/AppointmentCard";
import Sidebar from "./components/Sidebar";
import { getAppointmentsData } from "../../../backEnd/getDataAppointments";

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      const data = await getAppointmentsData();
      const list = data.map((appointment: Appointment) => ({
        id: appointment.id,
        patientName: appointment.patientName || "Unknown Patient",
        time: appointment.appointmentDate
          ? new Date(appointment.appointmentDate).toLocaleTimeString()
          : "Invalid Date",
        type: appointment.type,
        status: appointment.status,
      }));
      setAppointments(list);
    };

    fetchAppointments();
  }, []);

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
