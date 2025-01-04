import React, { useEffect, useMemo, useState } from "react";

import { getAppointmentsDataById } from "../../../../../backEnd/getAppointmentByPatientId";
import getCurrentUser from "../../../../../backEnd/getCurrentUser";
import { getRole } from "../../../../../backEnd/getData";
import { getAppointmentsData } from "../../../../../backEnd/getDataAppointments";
import { Appointment } from "../../types";
import FormInput from "../Forms/FormInput";
import FormSelect from "../Forms/FormSelect";
import FormTextarea from "../Forms/FormTextArea";
import Sidebar from "../Sidebar";
import { CONSULTATION_TYPES } from "./constant";
import { updateAppointment } from "../../../../../backEnd/editAppointments";

export default function EditAppointment() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selected, setSelected] = useState<string>("");

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
        id: appointment.id,
        patient: {
          id: appointment.id,
          name: appointment.patientName,
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
  console.log({ selected });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    updateAppointment(formData.id!.toString(), formData);
  };
  const selectedUser = useMemo(() => {
    return appointments.find((ap) => ap.id === parseInt(selected));
  }, [selected]);
  console.log({ selectedUser });
  const [formData, setFormData] = useState({
    id: appointments.find((ap) => ap.id === parseInt(selected))?.id,
    patient: {
      id: selectedUser?.patient?.id!,
      name: selectedUser?.patient?.name,
    },
    appointmentDate: selectedUser?.appointmentDate
      ? selectedUser.appointmentDate.split("T")[0] +
        selectedUser.appointmentDate.split("T")[1]
      : "",
    appointmentTime: selectedUser?.appointmentDate?.split("T")[1] || "",
    type: selectedUser?.type,
    notes: selectedUser?.notes,
    status: selectedUser?.status,
  });
  console.log({ selectedUser });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      if (name === "appointmentDate" || name === "appointmentTime") {
        // Update the date or time portion while keeping the other part intact
        const [currentDate, currentTime] = prevData.appointmentDate
          ? prevData.appointmentDate.split("T")
          : ["", ""];

        const newDateTime =
          name === "appointmentDate"
            ? `${value}T${currentTime || "00:00"}`
            : `${currentDate || "1970-01-01"}T${value}`;
        return { ...prevData, appointmentDate: newDateTime };
      }

      return { ...prevData, [name]: value };
    });
  };

  useEffect(() => {
    if (selected) {
      const appointment = appointments.find(
        (ap) => ap.id === parseInt(selected)
      );
      if (appointment) {
        setFormData({
          id: appointment.id,
          patient: {
            id: selected,
          },
          appointmentDate: appointment.appointmentDate!,
          type: appointment.type,
          notes: appointment.notes,
          status: appointment.status,
        });
      }
    }
  }, [selected, appointments]);

  return (
    <div className="flex  h-screen">
      <Sidebar />
      <div className="flex-1 max-w-full p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Modifier le Rendez-vous
        </h1>
        <select
          className="mb-4 px-4 py-2 border border-gray-200 text-black rounded-lg cursor-pointer"
          onChange={(e) => {
            console.log(e.target.value);
            setSelected(e.target.value);
          }}
          defaultValue=""
        >
          <option value="">Sélectionner un patient</option>
          {appointments.map((ap) => (
            <option key={ap.id} value={ap.id} className="cursor-pointer">
              {ap.patient?.name}
            </option>
          ))}
        </select>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="appointmentDate"
                label="Date"
                type="date"
                value={formData.appointmentDate.split("T")[0]}
                onChange={handleChange}
              />
              <FormInput
                name="appointmentTime"
                label="Heure"
                type="time"
                value={formData.appointmentDate.split("T")[1]?.slice(0, 5)}
                onChange={handleChange}
              />
            </div>

            <FormSelect
              name="type"
              label="Type de consultation"
              options={CONSULTATION_TYPES}
              value={formData.type}
              onChange={handleChange}
            />

            <FormTextarea
              name="notes"
              label="Notes"
              value={formData.notes}
              onChange={handleChange}
            />

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {}}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
