import axios from 'axios';

const getAllTransactions = async () => {
  try {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
      throw new Error('No token found');
    }

     const response = await axios.get('http://localhost:8081/api/v1/transactions', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('All transactions:', response.data);
    return response.data;  
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return null;   
  }
};

export default getAllTransactions;
