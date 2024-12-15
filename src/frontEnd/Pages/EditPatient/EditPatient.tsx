import { Save, UserCog } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPatientData } from "../../../backEnd/getPatients";
import Sidebar from "../Dashboard/components/Sidebar";
import { PatientEditType } from "./EditPatientType";
import { updatePatient } from "../../../backEnd/editPatients";
import { patientType } from "../../../backEnd/type";

const EditPatient: React.FC = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<PatientEditType[]>([]);
  const [selected, setSelected] = useState<string>("");
  useEffect(() => {
    const fetchPatientData = async () => {
      const patientData = await getPatientData();
      setPatients(patientData);
    };
    fetchPatientData();
  }, []);
  const [filteredPatients] = patients.filter(
    (patient) => patient.id === parseInt(selected)
  );
  console.log({ filteredPatients });
  const [formData, setFormData] = useState<patientType>({
    firstName: "",
    lastName: "",
    id: "",
    birthDate: null,
    email: "",
    phone: "",
    address: "",
    appointments: [],
    consultations: [],
    transactions: [],
  });

  useEffect(() => {
    setFormData({
      firstName: filteredPatients?.firstName,
      lastName: filteredPatients?.lastName,
      id: filteredPatients?.id.toString(),
      birthDate: filteredPatients?.birthDate
        ? filteredPatients.birthDate
        : new Date(),
      email: filteredPatients?.email,
      phone: filteredPatients?.phone,
      address: filteredPatients?.address,
      appointments: [],
      consultations: [],
      transactions: [],
    });
  }, [filteredPatients]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePatient(formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <UserCog className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">
            Modifier le Patient
          </h1>
        </div>

        <select
          className="mb-4 px-4 py-2 border border-gray-200 text-black rounded-lg cursor-pointer"
          onChange={(e) => {
            setSelected(e.target.value);
          }}
          defaultValue={patients[0]?.id}
        >
          {patients.map((patient) => (
            <option
              key={patient.id}
              value={patient.id}
              className="cursor-pointer"
            >
              {patient.name}
            </option>
          ))}
        </select>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 max-w-3xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Adresse
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Antécédents médicaux
              </label>
              {/* <textarea
                name="medicalHistory"
                value={formData.}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              /> */}
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

export default EditPatient;
