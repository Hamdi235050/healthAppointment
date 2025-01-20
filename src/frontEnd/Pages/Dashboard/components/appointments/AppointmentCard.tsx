import React from "react";
import { Appointment } from "../../types";

interface AppointmentCardProps {
  appointment: Appointment;
}

const statusStyles = {
  CONFIRMED: "text-green-700 bg-green-100",
  SCHEDULED: "text-yellow-700 bg-yellow-100",
  CANCELLED: "text-red-700 bg-red-100",
  COMPLETED: "text-blue-700 bg-blue-100",
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => (
  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
    <div>
      <p className="font-medium text-gray-800">{appointment.patientName}</p>
      <p className="text-sm text-gray-600">
        {appointment.time} - {appointment.type}
      </p>
    </div>
    <span
      className={`px-3 py-1 text-sm rounded-full ${
        statusStyles[appointment.status]
      }`}
    >
      {appointment?.status
        ? appointment.status.charAt(0).toUpperCase() +
          appointment.status.slice(1)
        : "Unknown"}
    </span>
  </div>
);

export default AppointmentCard;
