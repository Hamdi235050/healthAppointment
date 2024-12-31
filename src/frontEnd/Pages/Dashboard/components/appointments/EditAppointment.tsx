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
  }, [getAppointmentsData, getAppointmentsDataById]);
  console.log({ selected });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    // Assuming you have a save function to update the appointment
    // saveAppointment(formData);
  };
  const selectedUser = useMemo(() => {
    return appointments.find((ap) => ap.id === parseInt(selected));
  }, [selected]);
  const [formData, setFormData] = useState({
    patientName: selectedUser?.patientName,
    appointmentDate: selectedUser?.appointmentDate?.split("T")[0],
    appointmentTime: selectedUser?.appointmentDate?.split("T")[1],
    type: selectedUser?.type,
    notes: selectedUser?.notes,
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (selected) {
      const appointment = appointments.find(
        (ap) => ap.id === parseInt(selected)
      );
      if (appointment) {
        setFormData({
          patientName: appointment.patientName,
          appointmentDate: appointment.time,
          appointmentTime: appointment.time,
          type: appointment.type,
          notes: "", // Adjust accordingly if notes are available
        });
      }
    }
  }, [selected, appointments]);

  return (
    <div className="flex  h-screen">
      <Sidebar /> {/* Sidebar width, adjust as necessary */}
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
              {ap.patientName}
            </option>
          ))}
        </select>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormInput
              name="patientName"
              label="Patient"
              value={formData.patientName}
              onChange={handleChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormInput
                name="appointmentDate"
                label="Date"
                type="date"
                value={formData.appointmentDate}
                onChange={handleChange}
              />
              <FormInput
                name="appointmentTime"
                label="Heure"
                type="time"
                value={formData.appointmentTime}
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
