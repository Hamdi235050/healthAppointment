import axios from "axios";
import { Appointment } from "../frontEnd/Pages/Dashboard/types";
import { useMemo } from "react";

const API_URL = "http://localhost:8081/api/v1/appointments/patient";

const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

// Get the appointments data
export const getAppointmentsDataById = async ({
  patientId,
}: {
  patientId: number;
}) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(`${API_URL}/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the appointments!", error);
    throw error;
  }
};

export const mapAppointmentsData = (data: Appointment[]) => {
  return useMemo(() => {
    console.log("Data:", data);
    return data.map((appointment) => ({
      id: appointment.id,
      patientName: appointment.patientName || "Unknown Patient",
      patient: {
        id: appointment.patient.id!,
        name: appointment.patient.name,
      },
      time: appointment.appointmentDate
        ? new Date(appointment.appointmentDate).toLocaleTimeString()
        : "Invalid Date",
      type: appointment.type,
      status: appointment.status,
    }));
  }, [data]);
};
