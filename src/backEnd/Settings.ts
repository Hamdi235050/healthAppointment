import { toast } from "react-toastify";

const API_URL_SETTINGS = 'http://localhost:8081/api/v1/settings'; // Base URL for settings API

export const updateName = async (name: string) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        toast.error("Authentication token is missing. Please log in to proceed.");
        return;
    }

    try {
        console.log("Updating name:", name);
        const response = await fetch(`${API_URL_SETTINGS}/update-name`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(name),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response body:", errorText);
            toast.error(`Failed to update name. Status: ${response.status}`);
            return;
        }

        const text = await response.text();
        console.log("Name updated successfully:", text);
     } catch (error) {
        console.error("Error updating name:", error);
        toast.error("An error occurred while updating the name.");
    }
};

export const updateEmailSetting = async (email: string) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        toast.error("Authentication token is missing. Please log in to proceed.");
        return;
    }

    try {
        console.log("Updating email:", email);
        const response = await fetch(`${API_URL_SETTINGS}/update-email`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(email),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Error response body:", errorText);
            toast.error(`Failed to update email. Status: ${response.status}`);
            return;
        }

        const text = await response.text();
        console.log("Email updated successfully:", text);
     } catch (error) {
        console.error("Error updating email:", error);
        toast.error("An error occurred while updating the email.");
    }
};
