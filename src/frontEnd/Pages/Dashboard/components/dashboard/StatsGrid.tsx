import { Activity, Calendar, FileText, Users } from "lucide-react";
import React from "react";
import getTotalNoteMedical from "../../../../../backEnd/getNoteMedical";
import getTotalConsultations from "../../../../../backEnd/getTotalConsultations";
import getTotalPatient from "../../../../../backEnd/getTotalPatient";
import getTotalAppointments from "../../../../../backEnd/getTotlaAppointments";
import { StatCard as StatCardType } from "../../types";
import StatCard from "../ui/StatCard";

const StatsGrid: React.FC = () => {
  const [totalPatients, setTotalPatients] = React.useState<number>(0);
  const [totalAppointments, setTotalAppointments] = React.useState<number>(0);
  const [totalConsultations, setTotalConsultaitons] = React.useState<number>(0);
  const [totalNoteMedical, setTotalNoteMedical] = React.useState<number>(0);
  React.useEffect(() => {
    const fetchTotalPatients = async () => {
      const total = await getTotalPatient();

      const totalAppointments = await getTotalAppointments();
      const totalConsultations = await getTotalConsultations();
      const totalNoteMedicale = await getTotalNoteMedical();
      setTotalPatients(total);
      setTotalAppointments(totalAppointments);
      setTotalConsultaitons(totalConsultations);
      setTotalNoteMedical(totalNoteMedicale);
    };

    fetchTotalPatients();
  }, []);
  const stats: StatCardType[] = [
    {
      title: "Patients Total",
      value: totalPatients,
      icon: <Users className="text-blue-600" size={24} />,
    },
    {
      title: "Rendez-vous Aujourd'hui",
      value: totalAppointments,
      icon: <Calendar className="text-green-600" size={24} />,
    },
    {
      title: "Notes Médicales",
      value: totalNoteMedical,
      icon: <FileText className="text-purple-600" size={24} />,
    },
    {
      title: "Consultations ce Mois",
      value: totalConsultations,
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
