import React from "react";
import { Button } from "../../common/Button";
import { Appointment } from "../../types";

interface AppointmentRowProps {
  appointment: Appointment;
  onConfirm: (id: number) => void;
  onCancel: (id: number) => void;
  onComplete: (id: number) => void;
}

export const AppointmentRow: React.FC<AppointmentRowProps> = ({
  appointment,
  onConfirm,
  onCancel,
  onComplete,
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
          <Button
            variant="success"
            size="sm"
            onClick={() => onComplete(appointment.id)}
          >
            Terminer
          </Button>
        </div>
      </td>
    </tr>
  );
};
