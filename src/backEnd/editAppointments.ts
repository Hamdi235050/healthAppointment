import { toast } from "react-toastify";
import { AppointmentType } from "./submitAppointment";
 
export const updateAppointment = async (id: string, formData: AppointmentType) => {
    const token = localStorage.getItem("authToken");
    const API_URL_APPOINTMENTS = 'http://localhost:8081/api/v1/appointments'; // Adjust this endpoint accordingly

    if (!token) {
        toast.error("Authentication token is missing. Please log in to proceed.");
        return;
    }

    try {
        const response = await fetch(`${API_URL_APPOINTMENTS}/edit/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response body:", errorText);
            toast.error(`Failed to update appointment. Status: ${response.status}`);
            return;
        }

        const text = await response.text();

        if (!text) {
            console.warn("Empty response body");
            toast.success("Appointment updated successfully, but no data returned.");
            return;
        }

        try {
            const data = JSON.parse(text);
            console.log("Appointment updated:", data);
            toast.success("Appointment updated successfully!", { autoClose: 3000 });
        } catch (error) {
            console.error("Error parsing JSON:", error);
            toast.error("Invalid response format.");
        }
    } catch (error) {
        console.error("Error updating appointment:", error);
        toast.error("An error occurred while updating the appointment.");
    }
};
