import React, { useState, useEffect } from "react";
import { FileText, Save } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Dashboard/components/Sidebar";
import { getPatientData } from "../../../backEnd/getPatients";
import { Patient } from "../Dashboard/Patients";
import { submitNote } from "../../../backEnd/postNoteMedical";

const AddNote: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dateAjout: "",
    contenu: "",
    observations: "",
    diagnosis: "",
    suivi: "",
    patient: {
      id: 0,
    },
  });

  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatientData();
      setPatients(data);
    };

    fetchPatients();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Note submitted:", formData);
    submitNote(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "patient_id") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        patient: {
          ...prevFormData.patient,
          id: value ? parseInt(value) : 0,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Ajouter une Note Médicale
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 w-full">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient
              </label>
              <select
                name="patient_id"
                value={formData.patient.id}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Sélectionner un patient</option>
                {patients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observations
              </label>
              <textarea
                name="contenu"
                value={formData.contenu}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Observations cliniques..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Diagnostic
              </label>
              <textarea
                name="diagnosis"
                value={formData.diagnosis}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                placeholder="Diagnostic..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Suivi Recommandé
              </label>
              <input
                type="text"
                name="suivi"
                value={formData.suivi}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ex: Prochain rendez-vous dans 2 semaines"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/patients")}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={20} />
                Enregistrer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddNote;
