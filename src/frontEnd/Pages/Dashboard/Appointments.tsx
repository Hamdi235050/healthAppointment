import React, { useEffect } from "react";
import { Calendar } from "lucide-react";
import { Appointment } from "./types";
import AppointmentCard from "./components/appointments/AppointmentCard";
import Sidebar from "./components/Sidebar";
import { getAppointmentsData } from "../../../backEnd/getDataAppointments";
import getCurrentUser from "../../../backEnd/getCurrentUser";
import { getRole } from "../../../backEnd/getData";
import { getAppointmentsDataById } from "../../../backEnd/getAppointmentByPatientId";

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  useEffect(() => {
    const fetchAppointments = async () => {
      const currentUser = await getCurrentUser();
      const role = await getRole();
      const data =
        role !== "PATIENT"
          ? await getAppointmentsData()
          : await getAppointmentsDataById({ patientId: currentUser });
      console.log({ data });
      const list = data.map((appointment: Appointment) => ({
        id: appointment?.id,
        patientName: appointment?.patientName || "Unknown Patient",
        time: appointment?.appointmentDate
          ? new Date(appointment?.appointmentDate).toLocaleTimeString()
          : "Invalid Date",
        type: appointment?.type,
        status: appointment?.status,
      }));
      setAppointments(list);
    };

    fetchAppointments();
  }, [getCurrentUser, getAppointmentsData, getAppointmentsDataById]);

  return (
    <div className="flex h-screen w-screen overflow-hidden">
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
