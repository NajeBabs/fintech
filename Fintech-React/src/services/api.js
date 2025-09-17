import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- 🔹 Attach JWT token if it exists ---
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// --- 🔹 Normalize API errors ---
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const apiError = err.response?.data;
    if (apiError && typeof apiError === "object") {
      const message = apiError.errors
        ? Object.values(apiError.errors).flat()[0] // first validation error
        : apiError.title || "An error occurred";
      return Promise.reject(new Error(message));
    }
    return Promise.reject(err);
  }
);

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

  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/Auth/login", data);

  // Save token and user in localStorage
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  if (res.data.user) {
    localStorage.setItem("user", JSON.stringify(res.data.user));
    localStorage.setItem("profile", JSON.stringify(res.data.user));
  }

  return res.data; // 👈 return plain object, not Axios response
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("profile");
};

// --- 🔹 Profile ---
export const getProfile = async () => {
  const profile = localStorage.getItem("profile");
  if (profile) {
    // return cached first
    api.get("/Profile").then((res) => {
      localStorage.setItem("profile", JSON.stringify(res.data));
    });
    return Promise.resolve({ data: JSON.parse(profile) });
  }
  return api.get("/Profile");
};

export const updateProfile = async (data) => {
  const res = await api.put("/Profile", data);
  localStorage.setItem("profile", JSON.stringify(res.data));
  return res.data;
};

export const updateProfilePicture = async (file) => {
  const formData = new FormData();
  formData.append("profilePicture", file);

  const res = await api.put("/Profile/picture", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  localStorage.setItem("profile", JSON.stringify(res.data));
  return res.data;
};

export const changePassword = async (data) => {
  const res = await api.put("/Profile/password", data);
  return res.data;
};

// --- 🔹 UserAccounts CRUD ---
export const getUserAccounts = () => api.get("/UserAccounts");
export const createUserAccount = (data) => api.post("/UserAccounts", data);
export const updateUserAccount = (id, data) =>
  api.put(`/UserAccounts/${id}`, data);
export const deleteUserAccount = (id) => api.delete(`/UserAccounts/${id}`);

export default api;
