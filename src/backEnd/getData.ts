import axios from 'axios';

// Define response types for better typing
interface LoginResponse {
  data: {
    token: string; // Assuming the response includes a token
    [key: string]: any; // Other possible data
  };
  status: number;
}

interface RoleResponse {
  data: string; // Assuming the role is a string
}

// Function to login, get token and role, and store them in localStorage
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    // Step 1: Authenticate user and get token
    const { data, status } = await axios.post("http://localhost:8081/api/v1/auth/login", { email, password });
    console.log("Login successful", email);

    // Step 2: Store the token in localStorage
    if (data.token) {
      localStorage.setItem('authToken', data.token);
    }

    // Step 3: Fetch the user role using the token
    const roleResponse = await fetchUserRole();
    if (roleResponse) {
      localStorage.setItem('userRole', roleResponse.data); // Store the role directly
    }

    return { data, status };
  } catch (error: any) {
    console.error("Error logging in:", error?.response?.data || error.message || error);
    throw new Error("Login failed, please try again.");
  }
};

// Function to fetch user role based on the token
const fetchUserRole = async (): Promise<RoleResponse | null> => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error("No token found. User must be logged in.");
    }

    // Fetch the role using the token
    const roleResponse = await axios.get<RoleResponse>(`http://localhost:8081/api/v1/auth/role`, {
      headers: {
        Authorization: `Bearer ${token}`, // Attach token to Authorization header
      },
    });

 
    return roleResponse.data ? roleResponse : null;
  } catch (error: any) {
    console.error("Error fetching role:", error?.response?.data || error.message || error);
    return null; // Return null if fetching the role fails
  }
};

// Get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Get role from localStorage
export const getRole = (): string | null => {
  return localStorage.getItem('userRole');
};

// Function to logout and clear stored data
export const logout = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
};

export default login;
