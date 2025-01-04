export const getName = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }
  
    const API_URL_SETTINGS = "http://localhost:8081/api/v1/settings"; // Replace with your actual API URL
  
    try {
      const response = await fetch(`${API_URL_SETTINGS}/get-name`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch name. Status: ${response.status}`);
      }
  
      const name = await response.text(); // Assuming the name is returned as plain text
      return name;
    } catch (error) {
      console.error("Error fetching name:", error);
      throw error;
    }
  };
  
  export const getEmail = async () => {
    const token = localStorage.getItem("authToken");
  
    if (!token) {
      throw new Error("Authentication token is missing. Please log in.");
    }
  
    const API_URL_SETTINGS = "http://localhost:8081/api/v1/settings"; // Replace with your actual API URL
  
    try {
      const response = await fetch(`${API_URL_SETTINGS}/get-email`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to fetch email. Status: ${response.status}`);
      }
  
      const email = await response.text(); // Assuming the email is returned as plain text
      return email;
    } catch (error) {
      console.error("Error fetching email:", error);
      throw error;
    }
  };
  