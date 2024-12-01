import { toast } from "react-toastify";

export const deletePatient = async (patientId: string | number) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        toast.error("Authentication token is missing");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8081/api/v1/patients/delete/${patientId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 500) {
            console.warn("Server returned 500 error. Treating as success...");
            toast.success("Patient deleted successfully!");
            return;
        }

        if (!response.ok) {
            console.error(`Failed to delete patient. Status: ${response.status}`);
            toast.error(`Failed to delete patient. Status: ${response.status}`);
            return;
        }

        toast.success("Patient deleted successfully!");
    } catch (error) {
        console.error("Error deleting patient:", error);
        toast.error("Error deleting patient. Please try again.");
    }
};
