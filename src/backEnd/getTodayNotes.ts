import axios from "axios";

const getTodayNotes = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No token found");
    }

    const response = await axios.get(
      "http://localhost:8081/api/v1/notemedical/todayNotes",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const notes = response.data;

    return notes;
  } catch (error) {
    console.error("Error fetching today's notes:", error);
    return 0;
  }
};

export default getTodayNotes;
