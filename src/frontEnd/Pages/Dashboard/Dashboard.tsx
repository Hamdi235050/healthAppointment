import React from "react";
import Sidebar from "./components/Sidebar";
import AppointmentCard from "./components/appointments/AppointmentCard";
import StatsGrid from "./components/dashboard/StatsGrid";
import NoteCard from "./components/notes/NoteCard";
import { Appointment, MedicalNote } from "./types";
import getTodayAppointment from "../../../backEnd/getTodayAppointment";
import getTodayNotes from "../../../backEnd/getTodayNotes";

const Dashboard: React.FC = () => {
  const [todayAppointments, setTodayAppointments] = React.useState<
    Appointment[]
  >([]);
  const [todayNotes, setTodayNotes] = React.useState<MedicalNote[]>([]);
  React.useEffect(() => {
    const fetchTodayAppointment = async () => {
      const todayAppointments = await getTodayAppointment();
      const todayNotes = await getTodayNotes();
      setTodayNotes(todayNotes);
      setTodayAppointments(todayAppointments);
    };

    fetchTodayAppointment();
  }, [getTodayAppointment, getTodayNotes]);
  console.log({ todayNotes });
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Tableau de Bord
        </h1>

        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Rendez-vous à venir
            </h2>
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Notes Récentes
            </h2>
            <div className="space-y-4">
              {todayNotes?.length > 0 ? (
                todayNotes.map((note) => <NoteCard key={note.id} note={note} />)
              ) : (
                <p className="text-gray-500">Aucune note récente</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
