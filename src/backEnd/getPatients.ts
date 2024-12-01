import axios from 'axios';
 import { useMemo } from 'react';
import { Patient } from '../frontEnd/Pages/Dashboard/Patients';

const API_URL = 'http://localhost:8081/api/v1/patients'; 

const getAuthToken = () => {
  return localStorage.getItem('authToken'); 
};

// Get the patient data
export const getPatientData = async () => {
  try {
    const token = getAuthToken();
    if (!token) {
      throw new Error('No token found');
    }

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,  
      },
    });
    return response.data;  
  } catch (error) {
    console.error('There was an error fetching the patients!', error);
    throw error;  
  }
};

export const mapPatientData = (data: Patient[]) => {
  return useMemo(() => {
    return data.map((patient) => ({
       age: patient.age,
       id: patient.id,
       name: patient.name,
       condition: patient.condition,
       lastVisit: patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'Unknown',

    }));
  }, [data]);   
};
