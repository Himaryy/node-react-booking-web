import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/user/login", { email, password });

    const token = response.data.accessToken;
    const user = response.data.user;

    if (!token) throw new Error("Token not found");

    localStorage.setItem("token", token);

    return { token, user };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const loginAdmin = async (email: string, password: string) => {
  try {
    const response = await api.post("/admin/login", { email, password });

    const token = response.data.accessToken;
    const user = response.data.user;

    if (!token) throw new Error("Token not found");

    localStorage.setItem("token", token);

    return { token, user };
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const logoutUser = async () => {
  try {
    await api.post("/user/logout");
    localStorage.removeItem("token"); // optional
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const logoutAdmin = async () => {
  try {
    await api.post("/admin/logout");
    localStorage.removeItem("token"); // optional
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Logout failed");
  }
};

export const getUser = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Token is missing");

    const response = await api.get("/user/getUser", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("getUser response.data:", response.data);
    return response.data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};

export const getAdmin = async () => {
  try {
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Token is missing");

    const response = await api.get("/admin/getAdmin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("get Admin:", response.data);
    return response.data.user;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Failed to fetch user");
  }
};
