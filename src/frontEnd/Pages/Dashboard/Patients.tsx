import React, { useEffect, useState } from "react";
import { Users, Search } from "lucide-react";
import Sidebar from "./components/Sidebar";
import { getPatientData, mapPatientData } from "../../../backEnd/getPatients";

export type Patient = {
  id: number;
  name: string;
  age: number;
  lastVisit: Date;
  condition: string;
};

const Patients: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]); // You can replace `any` with a more specific type if needed

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const patientData = await getPatientData();
        const list = patientData.map((patient: Patient) => ({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          lastVisit: patient.lastVisit
            ? new Date(patient.lastVisit).toLocaleDateString()
            : "Unknown",
          condition: patient.condition,
        }));
        setPatients(list); // Update the state with mapped data
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchPatients();
  }, []);
  // const patients: Patient[] = [
  //   {
  //     id: 1,
  //     name: "Jean Dupont",
  //     age: 45,
  //     lastVisit: "15/03/2024",
  //     condition: "Hypertension",
  //   },
  //   {
  //     id: 2,
  //     name: "Marie Martin",
  //     age: 32,
  //     lastVisit: "14/03/2024",
  //     condition: "Diabète Type 2",
  //   },
  //   {
  //     id: 3,
  //     name: "Pierre Bernard",
  //     age: 58,
  //     lastVisit: "13/03/2024",
  //     condition: "Arthrose",
  //   },
  // ];

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
            <button className="btn btn-primary">Nouveau Patient</button>
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
                  <td className="py-3 px-4">{patient.age} ans</td>
                  <td className="py-3 px-4">{patient.lastVisit}</td>
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
