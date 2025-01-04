import React from "react";
import { Button } from "../../common/Button";
import { Appointment } from "../../types";

interface AppointmentRowProps {
  appointment: Appointment;
  onConfirm: (id: number) => void;
  onCancel: (id: number) => void;
}

export const AppointmentRow: React.FC<AppointmentRowProps> = ({
  appointment,
  onConfirm,
  onCancel,
}) => {
  const formattedDate = new Date(
    appointment.appointmentDate!
  ).toLocaleDateString();

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {appointment.patientName}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {formattedDate}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {appointment.appointmentDate!.split("T")[1].slice(0, 5)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {appointment.type}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={() => onConfirm(appointment.id)}
          >
            Confirmer
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onCancel(appointment.id)}
          >
            Annuler
          </Button>
        </div>
      </td>
    </tr>
  );
};
