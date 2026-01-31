import axios from "axios";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";

type User = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role: "consumer" | "provider";
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  registerProvider: (providerData: any) => Promise<{ success: boolean; error?: string }>;
  registerConsumer: (consumerData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType>(null as any);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Your Django URL
const API_URL = 'http://127.0.0.1:8000/api/';
  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      console.log("🔍 Loading user, token exists:", !!token);
      
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}auth/me/`, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        timeout: 5000,
      });
      
      console.log("✅ User loaded:", response.data);
      setUser(response.data);
    } catch (error: any) {
      console.error("❌ Failed to load user:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      
      // Clear invalid token
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function login(email: string, password: string) {
    console.log("=".repeat(50));
    console.log("🔐 LOGIN ATTEMPT");
    console.log("📧 Email:", email);
    console.log("🔗 Endpoint:", `${API_URL}auth/login/`);
    
    try {
      const response = await axios.post(
        `${API_URL}auth/login/`,
        {
          email: email.trim().toLowerCase(),
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 10000,
        }
      );

      console.log("✅ LOGIN SUCCESSFUL!");
      console.log("📦 Response:", response.data);

      const { refresh, access, user: userData } = response.data;
      
      if (!access) {
        throw new Error("No access token in response");
      }

      // Store tokens
      await SecureStore.setItemAsync("access_token", access);
      await SecureStore.setItemAsync("refresh_token", refresh);
      
      console.log("👤 User:", userData);
      setUser(userData);

      // Navigate based on role
      console.log("📍 Role:", userData.role);
      if (userData.role === 'provider') {
        router.replace("/(provider)/dashboard");
      } else {
        router.replace("/(consumer)/home");
      }

      return { success: true };

    } catch (error: any) {
      console.error("❌ LOGIN FAILED:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      
      let errorMessage = "Login failed";
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail;
      } else if (error.response?.data) {
        const errors = error.response.data;
        if (typeof errors === 'object') {
          errorMessage = Object.entries(errors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join(', ');
        } else {
          errorMessage = String(errors);
        }
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = "Cannot connect to server. Make sure Django is running.";
      } else if (error.message.includes('Network Error')) {
        errorMessage = "Network error. Check your internet connection.";
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // Register Provider
  async function registerProvider(providerData: any) {
    console.log("=".repeat(50));
    console.log("🏢 REGISTER PROVIDER");
    console.log("🔗 Endpoint:", `${API_URL}auth/register/provider/`);
    console.log("📦 Data:", JSON.stringify(providerData, null, 2));
    
    try {
      const response = await axios.post(
        `${API_URL}auth/register/provider/`,
        providerData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        }
      );

      console.log("✅ PROVIDER REGISTERED!");
      console.log("📦 Response:", response.data);

      // Auto-login after registration
      if (response.data.user) {
        setUser(response.data.user);
        
        if (response.data.access) {
          await SecureStore.setItemAsync("access_token", response.data.access);
        }
        if (response.data.refresh) {
          await SecureStore.setItemAsync("refresh_token", response.data.refresh);
        }
        
        router.replace("/(provider)/dashboard");
      }

      return { success: true };

    } catch (error: any) {
      console.error("❌ PROVIDER REGISTRATION FAILED:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      
      let errorMessage = "Registration failed";
      
      if (error.response?.data) {
        const errors = error.response.data;
        if (typeof errors === 'object') {
          errorMessage = Object.entries(errors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join(', ');
        } else {
          errorMessage = String(errors);
        }
      } else if (error.code === 'ECONNREFUSED') {
        errorMessage = "Cannot connect to server.";
      } else if (error.message.includes('Network Error')) {
        errorMessage = "Network error.";
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // Register Consumer
  async function registerConsumer(consumerData: any) {
    console.log("=".repeat(50));
    console.log("👤 REGISTER CONSUMER");
    console.log("🔗 Endpoint:", `${API_URL}auth/register/consumer/`);
    
    try {
      const response = await axios.post(
        `${API_URL}auth/register/consumer/`,
        consumerData,
        {
          headers: { "Content-Type": "application/json" },
          timeout: 15000,
        }
      );

      console.log("✅ CONSUMER REGISTERED!");
      console.log("📦 Response:", response.data);

      // Auto-login
      if (response.data.user) {
        setUser(response.data.user);
        
        if (response.data.access) {
          await SecureStore.setItemAsync("access_token", response.data.access);
        }
        if (response.data.refresh) {
          await SecureStore.setItemAsync("refresh_token", response.data.refresh);
        }
        
        router.replace("/(consumer)/home");
      }

      return { success: true };

    } catch (error: any) {
      console.error("❌ CONSUMER REGISTRATION FAILED:", error.response?.data || error.message);
      
      let errorMessage = "Registration failed";
      if (error.response?.data) {
        const errors = error.response.data;
        if (typeof errors === 'object') {
          errorMessage = Object.entries(errors)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join(', ');
        }
      }
      
      return { success: false, error: errorMessage };
    }
  }

  // Update User Profile
  async function updateUser(userData: Partial<User>) {
    try {
      const token = await SecureStore.getItemAsync("access_token");
      if (!token) throw new Error("No token found");

      const response = await axios.patch(
        `${API_URL}auth/me/`,
        userData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );

      console.log("✅ User updated:", response.data);
      setUser(prev => prev ? { ...prev, ...response.data } : response.data);
      
    } catch (error: any) {
      console.error("❌ Update failed:", error.response?.data || error.message);
      throw error;
    }
  }

  // Logout
  async function logout() {
    try {
      const refreshToken = await SecureStore.getItemAsync("refresh_token");
      if (refreshToken) {
        await axios.post(`${API_URL}auth/logout/`, {
          refresh: refreshToken
        });
      }
    } catch (error) {
      console.error("Logout API error:", error);
    } finally {
      // Clear tokens
      await SecureStore.deleteItemAsync("access_token");
      await SecureStore.deleteItemAsync("refresh_token");
      
      // Reset state
      setUser(null);
      
      // Navigate to home
      router.replace("/");
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      registerProvider, 
      registerConsumer,
      updateUser,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);