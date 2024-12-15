import { toast } from "react-toastify";
import { noteType } from "./type";

export const updateNote = async (formData: noteType) => {
    const token = localStorage.getItem("authToken");
    const API_URL_NOTES = 'http://localhost:8081/api/v1/notemedical'; // Adjust this endpoint accordingly

 
    if (!token) {
        toast.error("Authentication token is missing. Please log in to proceed.");
        return;
    }

    try {
        const response = await fetch(`${API_URL_NOTES}/update`, {
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
            toast.error(`Failed to update note. Status: ${response.status}`);
            return;
        }

        const text = await response.text();

        if (!text) {
            console.warn("Empty response body");
            toast.success("Note updated successfully, but no data returned.");
            return;
        }

        try {
            const data = JSON.parse(text);
            console.log("Note updated:", data);
            toast.success("Note updated successfully!", { autoClose: 3000 });
        } catch (error) {
            console.error("Error parsing JSON:", error);
            toast.error("Invalid response format.");
        }
    } catch (error) {
        console.error("Error updating note:", error);
        toast.error("An error occurred while updating the note.");
    }
};
