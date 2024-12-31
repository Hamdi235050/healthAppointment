import { FileText, Save } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getNoteData } from "../../../backEnd/getNoteData";
import { getPatientData } from "../../../backEnd/getPatients";
import { updateNote } from "../../../backEnd/submitNote";
import Sidebar from "../Dashboard/components/Sidebar";
import { PatientEditType } from "../EditPatient/EditPatientType";

const EditNote: React.FC = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<any[]>([]);
  const [selected, setSelected] = useState<string>("");
  const [patientsData, setPatients] = useState<PatientEditType[]>([]);

  const [formData, setFormData] = useState({
    patient: {
      patientId: "",
    },
    contenu: "",
    diagnosis: "",
    observations: "",
    noteId: 0,
    suivi: "",
    dateAjout: "",
  });

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await getNoteData();
      setNotes(data);
      if (data.length > 0) {
        setSelected(data[0]?.patient.id.toString());
      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    const fetchPatientData = async () => {
      const patientData = await getPatientData();
      setPatients(patientData);
    };
    fetchPatientData();
  }, [getPatientData]);
  console.log(notes);
  const filteredNote = notes.find(
    (note) => note.patient?.id === parseInt(selected)
  );

  useEffect(() => {
    setFormData({
      patient: {
        patientId: filteredNote?.patient.id.toString(),
      },
      contenu: filteredNote?.contenu || "",
      diagnosis: filteredNote?.diagnosis || "",
      observations: filteredNote?.observations || "",
      noteId: filteredNote?.noteId || 0,
      suivi: filteredNote?.suivi || "",
      dateAjout: filteredNote?.dateAjout || "",
    });
  }, [filteredNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateNote(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // For the nested patient.patientId field
    if (name === "patient.patientId") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        patient: {
          ...prevFormData.patient,
          patientId: value,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const patients = patientsData.map((patient) => ({
    id: patient.id,
    name: `${patient.firstName} ${patient.lastName}`,
  }));

  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <FileText className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Modifier la Note Médicale
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient
              </label>
              <select
                name="patient.patientId"
                value={formData.patient.patientId}
                onChange={(e) => {
                  setSelected(e.target.value);
                  handleChange(e);
                }}
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
                Enregistrer les modifications
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditNote;
