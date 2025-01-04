import * as React from "react";
import { AppointmentRow } from "./AppointmentRow";
import { Appointment } from "../../types";
import Sidebar from "../Sidebar";
import getCurrentUser from "../../../../../backEnd/getCurrentUser";
import { getRole } from "../../../../../backEnd/getData";
import { getAppointmentsData } from "../../../../../backEnd/getDataAppointments";
import { getAppointmentsDataById } from "../../../../../backEnd/getAppointmentByPatientId";
import { Calendar } from "lucide-react";
import { updateAppointment } from "../../../../../backEnd/editAppointments";
import {
  updateAppointmentByStatus,
  updateAppointmentStatus,
} from "../../../../../backEnd/editAppointmentsByStatus";

export const AppointmentListAdmin = () => {
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);

  React.useEffect(() => {
    const fetchAppointments = async () => {
      const currentUser = await getCurrentUser();
      const role = await getRole();
      const data =
        role !== "PATIENT"
          ? await getAppointmentsData()
          : await getAppointmentsDataById({ patientId: currentUser });
      console.log({ data });
      const list = data.map((appointment: Appointment) => ({
        patientName: appointment.patientName,
        id: appointment.id,
        patient: {
          id: appointment.id,
        },
        appointmentDate: appointment?.appointmentDate
          ? new Date(appointment?.appointmentDate).toISOString()
          : "Invalid Date",
        type: appointment?.type,
        status: appointment?.status,
        notes: appointment?.notes,
      }));
      setAppointments(list);
    };
    console.log({ appointments });
    fetchAppointments();
  }, [getAppointmentsData, getAppointmentsDataById]);

  const onConfirm = (id: number) => {
    updateAppointmentByStatus(id, "CONFIRMED");
  };
  const onCancel = (id: number) => {
    updateAppointmentByStatus(id, "CANCELLED");
  };

  return (
    <div className="h-full w-full flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex items-center gap-3 mb-8">
          <Calendar className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Confirmez les rendez vous
          </h1>
        </div>
        <div className="mt-6 overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg flex-1 max-w-full">
          {" "}
          {/* Added pl-12 for left padding */}
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Heure
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Motif
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <AppointmentRow
                  key={appointment.id}
                  appointment={appointment}
                  onConfirm={onConfirm}
                  onCancel={onCancel}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
