import { AlertTriangle, Search, UserMinus } from "lucide-react";
import React, { useEffect, useState } from "react";
import { deletePatient } from "../../../backEnd/deletePatient";
import { getPatientData } from "../../../backEnd/getPatients";
import Sidebar from "../Dashboard/components/Sidebar";

interface Patient {
  id: number;
  name: string;
  birthDate: Date;
  email: string;
}

const DeletePatient: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    const fetchPatientData = async () => {
      const patientData = await getPatientData();
      setPatients(patientData);
    };
    fetchPatientData();
  }, [selectedPatient]);
  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (selectedPatient) {
      await deletePatient(selectedPatient.id);

      setPatients((prevPatients) =>
        prevPatients.filter((patient) => patient.id !== selectedPatient.id)
      );

      setSelectedPatient(null);
    }
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <UserMinus className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Supprimer un Patient
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-3xl">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher un patient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Résultats de la recherche
            </h2>
            <div className="space-y-2">
              {filteredPatients.map((patient) => (
                <div
                  key={patient.id}
                  className={`p-4 rounded-lg cursor-pointer transition-colors ${
                    selectedPatient?.id === patient.id
                      ? "bg-red-50 border-2 border-red-200"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedPatient(patient)}
                >
                  <p className="font-medium text-gray-800">{patient.name}</p>
                  <p className="text-sm text-gray-600">
                    Né(e) le: {new Date(patient.birthDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">{patient.email}</p>
                </div>
              ))}
            </div>
          </div>

          {selectedPatient && (
            <div className="border-t pt-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 text-red-600 mb-2">
                  <AlertTriangle size={20} />
                  <h3 className="font-semibold">Confirmation de suppression</h3>
                </div>
                <p className="text-red-600">
                  Êtes-vous sûr de vouloir supprimer définitivement le dossier
                  de <strong>{selectedPatient.name}</strong> ? Cette action est
                  irréversible.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setSelectedPatient(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Confirmer la suppression
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeletePatient;
