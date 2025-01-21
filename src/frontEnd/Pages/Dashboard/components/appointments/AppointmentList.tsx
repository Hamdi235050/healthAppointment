import { Appointment } from "../../types";
import AppointmentCard from "./AppointmentCard";

const nextAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Marie Durant",
    time: "09:00",
    type: "Consultation",
    status: "SCHEDULED",
  },
  {
    id: 2,
    patientName: "Jean Martin",
    time: "10:30",
    type: "Suivi",
    status: "CONFIRMED",
  },
  {
    id: 3,
    patientName: "Sophie Bernard",
    time: "11:45",
    type: "Contrôle",
    status: "CANCELLED",
  },
];
export default function AppointmentList() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 overflow-hidden">
      <h2 className="text-lg font-semibold mb-4">Prochains Rendez-vous</h2>
      <div className="divide-y">
        {nextAppointments.map((apt, index) => (
          <AppointmentCard appointment={apt} key={index} />
        ))}
      </div>
    </div>
  );
}
