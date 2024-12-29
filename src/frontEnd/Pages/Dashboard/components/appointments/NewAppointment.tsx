import { useState } from "react";
import { useParams } from "react-router-dom";
import { submitAppointment } from "../../../../../backEnd/submitAppointment";
import FormInput from "../Forms/FormInput";
import FormSelect from "../Forms/FormSelect";
import FormTextarea from "../Forms/FormTextArea";
import Sidebar from "../Sidebar";

const consultationTypes = ["CONSULTATION", "ROUTINE_CHECK", "EMERGENCY"];

export default function NewAppointment() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    appointmentDate: "",
    type: "CONSULTATION",
    notes: "",
    status: "SCHEDULED",
    patient: { id: parseInt(id!) },
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ formData });
    submitAppointment(formData);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      appointmentDate: value + "T" + formData.appointmentDate.split("T")[1], // Update date part
    });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      appointmentDate: formData.appointmentDate.split("T")[0] + "T" + value, // Update hour part
    });
  };
  console.log({ formData });
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Créer un Rendez-vous
        </h1>

        <form
          className="space-y-6 h-full flex flex-col"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Date"
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate.split("T")[0]} // Display only the date part
              onChange={handleDateChange}
            />
            <FormInput
              label="Heure"
              type="time"
              name="appointmentDate"
              value={formData.appointmentDate.split("T")[1]} // Display only the hour part
              onChange={handleHourChange}
            />
          </div>

          <FormSelect
            label="Type de consultation"
            name="type"
            options={consultationTypes}
            value={formData.type}
            onChange={handleChange}
          />

          <FormTextarea
            label="Notes"
            name="notes"
            placeholder="Informations supplémentaires..."
            value={formData.notes}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Créer le rendez-vous
          </button>
        </form>
      </div>
    </div>
  );
}
