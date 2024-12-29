import axios from 'axios';

const getTodayAppointment = async () => {
  try {
     const token = localStorage.getItem('authToken'); 

    if (!token) {
      throw new Error('No token found');
    }

     const response = await axios.get('http://localhost:8081/api/v1/appointments/todayAppointment', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

     console.log('Current user data:', response.data);
    return response.data;  
  } catch (error) {
    console.error('Error fetching current user:', error);
    return null; // Or handle the error appropriately
  }
};

export default getTodayAppointment;
