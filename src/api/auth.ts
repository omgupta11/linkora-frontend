import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./axios";

export const login = async (username: string, password: string) => {
  const res = await api.post("/token/", { username, password });
  await AsyncStorage.setItem("access_token", res.data.access);
  await AsyncStorage.setItem("refresh_token", res.data.refresh);
  return res.data;
};

export const register = async (payload: any) => {
  const res = await api.post("/accounts/register/", payload);
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/accounts/me/");
  await AsyncStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

export const logout = async () => {
  await AsyncStorage.multiRemove([
    "access_token",
    "refresh_token",
    "user",
  ]);
};
