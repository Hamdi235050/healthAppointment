import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import FormInput from "../Forms/FormInput";
import FormSelect from "../Forms/FormSelect";
import FormTextarea from "../Forms/FormTextArea";
import { CONSULTATION_TYPES } from "./constant";
import { getAppointmentById } from "./data";

export default function EditAppointment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const appointment = getAppointmentById(id);

  if (!appointment) {
    return <div>Rendez-vous non trouvé</div>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique de mise à jour à implémenter
    navigate(`/rdv/${id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Modifier le Rendez-vous
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput label="Patient" defaultValue={appointment.patientName} />

          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Date"
              type="date"
              defaultValue={appointment.time}
            />
            <FormInput
              label="Heure"
              type="time"
              defaultValue={appointment.time}
            />
          </div>

          <FormSelect
            label="Type de consultation"
            options={CONSULTATION_TYPES}
            defaultValue={appointment.type}
          />

          <FormTextarea label="Notes" defaultValue={appointment.type} />

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`/rdv/${id}`)}
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
  );
}
