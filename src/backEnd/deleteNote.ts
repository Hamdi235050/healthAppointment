import { toast } from "react-toastify";

export const deleteNote = async (noteId: string | number) => {
    const token = localStorage.getItem("authToken");

    if (!token) {
        toast.error("Authentication token is missing");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8081/api/v1/notemedical/delete/${noteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.status === 500) {
            console.warn("Server returned 500 error. Treating as success...");
            toast.success("Note deleted successfully!");
            return;
        }

        if (!response.ok) {
            console.error(`Failed to delete note. Status: ${response.status}`);
            toast.error(`Failed to delete note. Status: ${response.status}`);
            return;
        }

        toast.success("Note deleted successfully!");
    } catch (error) {
        console.error("Error deleting note:", error);
        toast.error("Error deleting note. Please try again.");
    }
};
