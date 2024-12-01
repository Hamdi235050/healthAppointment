import axios from 'axios';

const API_URL_NOTES = 'http://localhost:8081/api/v1/notemedical'; // Adjust this endpoint accordingly

const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Get the note data
export const getNoteData = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(API_URL_NOTES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the notes!', error);
    throw error;
  }
};


 