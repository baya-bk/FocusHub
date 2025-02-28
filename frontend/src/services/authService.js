import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/users";

// Login user
const login = async (userData) => {
  console.log("Login Request Data:", userData); // Debugging

  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Signup user
const signup = async (userData) => {
  console.log("Signup Request Data:", userData); // Debugging

  const response = await axios.post(`${API_URL}/signup`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  login,
  signup,
  logout,
};

export default authService;
