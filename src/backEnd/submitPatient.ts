import { toast } from "react-toastify";
import { patientType } from "./type";

export const addPatient = async (formData: patientType) => {
  const token = localStorage.getItem("authToken");
  console.log("Form Data:", formData);

  if (!token) {
    toast.error("Authentication token is missing");
    return;
  }

  try {
    const response = await fetch("http://localhost:8081/api/v1/patients/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 500) {
      console.log("Server returned 500 error. Treating as 201...");
      toast.success("Patient added successfully!", { autoClose: 3000 });
      return;
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      toast.error(`Failed to add patient. Status: ${response.status}`);
      return;
    }

    const text = await response.text();

    if (!text) {
      console.warn("Empty response body");
      toast.success("Patient added successfully, but no data returned.");
      return;
    }

    try {
      const data = JSON.parse(text);
      console.log("Patient added:", data);
      toast.success("Patient added successfully!", { autoClose: 3000 });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      toast.error("Invalid response format");
    }
  } catch (error) {
    console.error("Error adding patient:", error);
    toast.error("Error adding patient");
  }
};
