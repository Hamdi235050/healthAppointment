import axios from 'axios';

const API_URL = 'http://localhost:8081/api/v1/patients'; 

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Get patient data by ID
export const getPatientById = async (patientId: string) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(`${API_URL}/${patientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`There was an error fetching the patient with ID ${patientId}!`, error);
    throw error;
  }
};
