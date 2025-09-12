import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach JWT token if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- 🔹 Auth ---
export const registerUser = async (data) => {
  const res = await api.post("/Auth/register", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  if (res.data.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("profile", JSON.stringify(res.data.user)); // store profile data immediately
  }
  return res;
};

export const loginUser = async (data) => {
  const res = await api.post("/Auth/login", data);
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  if (res.data.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("profile", JSON.stringify(res.data.user)); // store profile data immediately
  }
  return res;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("profile");
};

// --- 🔹 Profile ---
export const getProfile = () => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    return Promise.resolve({ data: JSON.parse(profile) }); // return cached profile
  }
  return api.get("/Profile"); // fallback to API if not in localStorage
};

export const updateProfile = async (data) => {
  const res = await api.put("/Profile", data);
  localStorage.setItem("profile", JSON.stringify(res.data)); // update local cache
  return res;
};

export const updateProfilePicture = (file) => {
  const formData = new FormData();
  formData.append("profilePicture", file);
  return api.put("/Profile/picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const changePassword = (data) => api.put("/Profile/password", data);

// --- 🔹 UserAccounts CRUD ---
export const getUserAccounts = () => api.get("/UserAccounts");
export const createUserAccount = (data) => api.post("/UserAccounts", data);
export const updateUserAccount = (id, data) =>
  api.put(`/UserAccounts/${id}`, data);
export const deleteUserAccount = (id) => api.delete(`/UserAccounts/${id}`);

export default api;
