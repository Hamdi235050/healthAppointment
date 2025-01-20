import axios from 'axios';

const getTodayNotes = async () => {
  try {
    const token = localStorage.getItem('authToken');

    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get('http://localhost:8081/api/v1/notemedical/todayNotes', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Get the data
    const notes = response.data;

    // Log the result
    console.log('Today\'s notes:', notes);

    // Return the count of notes
    return notes.length;
  } catch (error) {
    console.error('Error fetching today\'s notes:', error);
    return 0; // Return 0 if an error occurs
  }
};

export default getTodayNotes;
