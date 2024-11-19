import React from "react";
import { Users, Calendar, FileText, Activity } from "lucide-react";
import StatCard from "../ui/StatCard";
import { StatCard as StatCardType } from "../../types";

const StatsGrid: React.FC = () => {
  const stats: StatCardType[] = [
    {
      title: "Patients Total",
      value: "1,234",
      icon: <Users className="text-blue-600" size={24} />,
    },
    {
      title: "Rendez-vous Aujourd'hui",
      value: "28",
      icon: <Calendar className="text-green-600" size={24} />,
    },
    {
      title: "Notes Médicales",
      value: "856",
      icon: <FileText className="text-purple-600" size={24} />,
    },
    {
      title: "Consultations ce Mois",
      value: "342",
      icon: <Activity className="text-orange-600" size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsGrid;
