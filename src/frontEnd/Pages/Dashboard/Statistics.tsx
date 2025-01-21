import React from "react";
import { BarChart2, TrendingUp, Users, Calendar } from "lucide-react";
import Sidebar from "./components/Sidebar";

const Statistics: React.FC = () => {
  return (
    <div className="flex h-screen w-screen overflow-y-hidden">
      <Sidebar />
      <div className="p-8 flex-1">
        <div className="flex items-center gap-3 mb-8">
          <BarChart2 className="text-blue-600" size={32} />
          <h1 className="text-3xl font-bold text-gray-800">Statistiques</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">Consultations par Mois</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Graphique des consultations
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Users className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">Nouveaux Patients</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Graphique des nouveaux patients
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">Rendez-vous par Jour</h2>
            </div>
            <div className="h-64 flex items-center justify-center text-gray-500">
              Graphique des rendez-vous
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
