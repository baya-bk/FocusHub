// src/services/authService.js

const API_URL = "https://your-api-url.com/api"; // Replace with your actual API endpoint

// Register new user
const register = async (userData) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to register user");
  }
  return response.json();
};

// Login user
const login = async (userData) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error("Failed to login user");
  }
  return response.json(); // Ensure it returns the token/user object on success
};

const authService = {
  register,
  login,
};

export default authService;
