import { Appointment } from "../../types";

// Données de test
const appointments: Appointment[] = [
    {
        id: 1,
        patientName: "John Doe",
        appointmentDate: "2024-03-20",
        time: "09:00",
        type: "Consultation",
        status: "SCHEDULED"
    },
    {
        id: 2,
        patientName: "Jean Martin",
        appointmentDate: "2024-03-20",
        time: "10:30",
        type: "Suivi",
        status: "CONFIRMED"
    },
    {
        id: 3,
        patientName: "Sophie Bernard",
        appointmentDate: "2024-03-20",
        time: "11:45",
        type: "Contrôle",
        status: "CANCELLED"
    }
];

export const getAppointmentById = (id: number): Appointment | undefined => {
    return appointments.find(apt => apt.id === id);
};

export const getAllAppointments = (): Appointment[] => {
    return appointments;
};

export default appointments;