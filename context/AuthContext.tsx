import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import api from "../lib/api";

type User = {
  id: number;
  email: string;
  role: "consumer" | "provider";
  phone?: string;
  consumer_profile?: any;
  provider_profile?: any;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ----------------------------
  // LOAD USER ON APP START
  // ----------------------------
  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const res = await api.get("/auth/me/");
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------
  // LOGIN
  // ----------------------------
  async function login(email: string, password: string) {
    const res = await api.post("/auth/token/", {
      username: email,
      password,
    });

    await SecureStore.setItemAsync("access_token", res.data.access);
    await SecureStore.setItemAsync("refresh_token", res.data.refresh);

    await loadUser();
  }

  // ----------------------------
  // LOGOUT
  // ----------------------------
  async function logout() {
    await SecureStore.deleteItemAsync("access_token");
    await SecureStore.deleteItemAsync("refresh_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
