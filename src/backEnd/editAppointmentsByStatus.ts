import { toast } from "react-toastify";

export const updateAppointmentByStatus = async (id: number, newStatus: string) => {
    const token = localStorage.getItem("authToken");
    console.log({ id, newStatus });
    const API_URL_APPOINTMENTS = 'http://localhost:8081/api/v1/appointments'; // Adjust this endpoint accordingly

     if (!token) {
        toast.error("Authentication token is missing. Please log in to proceed.");
        return;
    }

    try {
        const response = await fetch(`${API_URL_APPOINTMENTS}/${id}/status?newStatus=${newStatus}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response body:", errorText);
            toast.error(`Failed to update appointment status. Status: ${response.status}`);
            return;
        }

        const contentType = response.headers.get("Content-Type");

        let responseText = await response.text();

        if (contentType && contentType.includes("application/json")) {
            try {
                const data = JSON.parse(responseText);
                console.log("Appointment status updated:", data);
                toast.success("Appointment status updated successfully!", { autoClose: 3000 });
            } catch (error) {
                console.error("Error parsing JSON:", error);
                toast.error("Invalid response format.");
            }
        } else {
            console.warn("Response is not JSON:", responseText);
            toast.success("Appointment status updated, but no JSON response returned.");
        }

    } catch (error) {
        console.error("Error updating appointment status:", error);
        toast.error("An error occurred while updating the appointment status.");
    }
};
