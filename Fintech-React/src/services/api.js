import axios from "axios";

// Base URL from environment
const BASE_URL = process.env.REACT_APP_API_URL;

// Create an axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// get all user accounts
export const getUserAccounts = () => api.get("/UserAccounts");

// create a new account
export const createUserAccount = (data) => api.post("/UserAccounts", data);

// update account
export const updateUserAccount = (id, data) =>
  api.put(`/UserAccounts/${id}`, data);

// delete account
export const deleteUserAccount = (id) => api.delete(`/UserAccounts/${id}`);

export default api;
