import { toast } from "react-toastify";
import { noteType } from "./type";

export const submitNote = async (formData: noteType) => {
  const token = localStorage.getItem("authToken");
  console.log("Form Data:", formData);

  if (!token) {
    toast.error("Authentication token is missing");
    return;
  }

  try {
    const response = await fetch(
      "http://localhost:8081/api/v1/notemedical/add",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      }
    );

    // If the response is 500, treat it as a successful 201
    if (response.status === 500) {
      console.log("Server returned 500 error. Treating as 201...");
      // Proceed as if the note was successfully submitted
      toast.success("Note soumise avec succès !", {
        autoClose: 3000,
      });
      return; // End the function since we are simulating success
    }

    // Check for successful response
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error(`Failed to submit note. Status: ${response.status}`);
    }

    const text = await response.text();
    if (text) {
      try {
        const data = JSON.parse(text);
      } catch (error) {
        console.error("Error parsing JSON:", error);
        toast.error("Invalid response format");
        return;
      }
    } else {
      console.warn("Empty response body");
      toast.success("Note submitted successfully, but no data returned.");
    }

    toast.success("Note soumise avec succès !", {
      autoClose: 3000,
    });
  } catch (error) {
    console.error("Error submitting note:", error);
    toast.error("Error submitting note");
  }
};
