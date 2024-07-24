// src/utils/api.ts

import axios from 'axios';

// Function to fetch users from the API endpoint
export async function fetchUsers() {
  try {
    const response = await axios.get('/api/users'); // Calls the endpoint
    return response.data; // Returns the data from the endpoint
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

