import { toast } from "react-toastify";
import { patientType } from "./type";

export const updatePatient = async (formData: patientType) => {
    const token = localStorage.getItem("authToken");
    const API_URL_PATIENTS = 'http://localhost:8081/api/v1/patients'; // Adjust this endpoint accordingly

    if (!token) {
        toast.error("Authentication token is missing. Please log in to proceed.");
        return;
    }

    try {
        const response = await fetch(`${API_URL_PATIENTS}/update`, {
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
            toast.error(`Failed to update patient. Status: ${response.status}`);
            return;
        }

        const text = await response.text();

        if (!text) {
            console.warn("Empty response body");
            toast.success("Patient updated successfully, but no data returned.");
            return;
        }

        try {
            const data = JSON.parse(text);
            console.log("Patient updated:", data);
            toast.success("Patient updated successfully!", { autoClose: 3000 });
        } catch (error) {
            console.error("Error parsing JSON:", error);
            toast.error("Invalid response format.");
        }
    } catch (error) {
        console.error("Error updating patient:", error);
        toast.error("An error occurred while updating the patient.");
    }
};
