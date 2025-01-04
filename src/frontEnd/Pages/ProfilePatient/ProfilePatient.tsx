import React from "react";
import { User, Calendar, CreditCard, FileText, Bell } from "lucide-react";
import Sidebar from "../Dashboard/components/Sidebar";

const PatientProfile: React.FC = () => {
  // Mock patient data
  const patient = {
    id: 1,
    firstName: "Jean",
    lastName: "Dupont",
    dateOfBirth: "1980-01-01",
    email: "jean.dupont@email.com",
    phone: "0123456789",
    address: "123 Rue de Paris",
    lastVisit: "2024-03-15",
    nextAppointment: "2024-03-30",
    notifications: [
      { id: 1, message: "Rappel: Rendez-vous le 30 mars", date: "2024-03-28" },
      { id: 2, message: "Résultats disponibles", date: "2024-03-20" },
    ],
    payments: [
      { id: 1, date: "2024-03-15", amount: 25, status: "completed" },
      { id: 2, date: "2024-02-28", amount: 30, status: "completed" },
    ],
    notes: [
      { id: 1, date: "2024-03-15", content: "Consultation de routine" },
      { id: 2, date: "2024-02-28", content: "Suivi traitement" },
    ],
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex items-center gap-3 mb-8">
          <User className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Profil Patient</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Informations personnelles */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Informations Personnelles
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Nom complet</p>
                  <p className="font-medium">{`${patient.firstName} ${patient.lastName}`}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date de naissance</p>
                  <p className="font-medium">
                    {new Date(patient.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium">{patient.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Téléphone</p>
                  <p className="font-medium">{patient.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-600">Adresse</p>
                  <p className="font-medium">{patient.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Bell className="text-blue-600" size={24} />
                <h2 className="text-xl font-semibold text-gray-800">
                  Notifications
                </h2>
              </div>
              <div className="space-y-4">
                {patient.notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 bg-gray-50 rounded-lg"
                  >
                    <p className="text-sm text-gray-600 mb-1">
                      {new Date(notification.date).toLocaleDateString()}
                    </p>
                    <p className="font-medium">{notification.message}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
