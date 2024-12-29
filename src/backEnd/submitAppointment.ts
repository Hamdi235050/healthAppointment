import { toast } from "react-toastify";
export type AppointmentType = {
    appointmentDate: string;
    type: "CONSULTATION" | "CONTROL" | "EMERGENCY";
    notes: string;
    patient: {
        id: number;
    };
};
export const submitAppointment = async (formData:AppointmentType) => {
    const token = localStorage.getItem("authToken");
    const API_URL_APPOINTMENTS = 'http://localhost:8081/api/v1/appointments'; // Adjust this endpoint accordingly

    if (!token) {
        toast.error("Authentication token is missing. Please log in to proceed.");
        return;
    }

    try {
        console.log("Submitting appointment:", formData);
        const response = await fetch(`${API_URL_APPOINTMENTS}/add`, {
            method: "POST", // Assuming you're submitting an appointment
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response body:", errorText);
            toast.error(`Failed to submit appointment. Status: ${response.status}`);
            return;
        }

        const text = await response.text();

        if (!text) {
            console.warn("Empty response body");
            toast.success("Appointment submitted successfully, but no data returned.");
            return;
        }

        try {
            const data = JSON.parse(text);
            console.log("Appointment submitted:", data);
            toast.success("Appointment submitted successfully!", { autoClose: 3000 });
        } catch (error) {
            console.error("Error parsing JSON:", error);
            toast.error("Invalid response format.");
        }
    } catch (error) {
        console.error("Error submitting appointment:", error);
        toast.error("An error occurred while submitting the appointment.");
    }
};
