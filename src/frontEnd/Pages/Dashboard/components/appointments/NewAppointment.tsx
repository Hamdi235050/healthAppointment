import FormInput from "../Forms/FormInput";
import FormSelect from "../Forms/FormSelect";
import FormTextarea from "../Forms/FormTextArea";
import Sidebar from "../Sidebar";

const consultationTypes = [
  "Consultation générale",
  "Suivi",
  "Contrôle",
  "Urgence",
];

export default function NewAppointment() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-white rounded-xl shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Créer un Rendez-vous
        </h1>

        <form className="space-y-6 h-full flex flex-col justify-between">
          <FormInput label="Patient" placeholder="Nom du patient" />

          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Date" type="date" />
            <FormInput label="Heure" type="time" />
          </div>

          <FormSelect
            label="Type de consultation"
            options={consultationTypes}
          />

          <FormTextarea
            label="Notes"
            placeholder="Informations supplémentaires..."
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
