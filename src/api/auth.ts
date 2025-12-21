import api from "./axios";

export const loginUser = async (payload: {
  email: string;
  password: string;
  role: "consumer" | "provider";
}) => {
  const res = await api.post("/auth/login/", payload);
  return res.data;
};

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  role: "consumer" | "provider";
}) => {
  const res = await api.post("/auth/register/", payload);
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout/");
  return res.data;
};
