import axios from 'axios';

const API_URL_CONSULTATIONS = 'http://localhost:8081/api/v1/consultation/last'; // Adjust this endpoint accordingly

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

export const getConsultationData = async ({patientId}:{patientId: string}) => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get( `${API_URL_CONSULTATIONS}/${patientId}` , {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the consultation data!', error);
    throw error;
  }
};
