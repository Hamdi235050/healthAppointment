import { Search, Users } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getPatientData } from "../../../backEnd/getPatients";
import { patientType } from "../../../backEnd/type";
import Sidebar from "./components/Sidebar";
import { getConsultationData } from "../../../backEnd/getLatestVisit";

export type Patient = {
  id: number;
  name: string;
  age: string;
  lastVisit: Date;
  condition: string;
};
type lastVisit = {
  id: number;
  consultationDate: Date;
  motif: string;
  result: string;
};

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  console.log({ patients });
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientData = await getPatientData();
        const list = await Promise.all(
          patientData.map(async (patient: patientType) => {
            const [lastVisit]: lastVisit[] = await getConsultationData({
              patientId: patient.id,
            });
            console.log({ lastVisit });
            console.log({ patient });
            return {
              id: patient.id,
              name: patient.firstName + " " + patient.lastName,
              age: patient.birthDate
                ? (patient.birthDate as string)
                : "Non Spécifier",
              lastVisit: lastVisit?.consultationDate
                ? new Date(lastVisit?.consultationDate).toLocaleDateString()
                : "Non Spécifier",
              condition: patient.condition,
            };
          })
        );
        setPatients(list); // Update the state with mapped data
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <Users className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Liste des Patients
          </h1>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Rechercher un patient..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={20}
              />
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">Nom</th>
                <th className="text-left py-3 px-4">Âge</th>
                <th className="text-left py-3 px-4">Dernière Visite</th>
                <th className="text-left py-3 px-4">Condition</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr
                  key={patient.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{patient.name}</td>
                  <td className="py-3 px-4">
                    {new Date().getFullYear() -
                      new Date(patient.age).getFullYear()}{" "}
                  </td>
                  <td className="py-3 px-4">
                    {patient.lastVisit.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">{patient.condition}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;
