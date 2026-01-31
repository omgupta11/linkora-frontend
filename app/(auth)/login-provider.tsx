// app/(auth)/login-provider.tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function LoginProvider() {
  const router = useRouter();
  const { login, loading: authLoading } = useAuth();

  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleLogin() {
    setSubmitted(true);
    
    if (!usernameOrEmail.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter email/username and password");
      return;
    }

    try {
      setIsLoading(true);
      const result = await login(usernameOrEmail.trim().toLowerCase(), password);
      
      if (!result.success) {
        Alert.alert("Login Failed", result.error || "Invalid credentials");
      }
      // Navigation happens in AuthContext on success
    } catch (e: any) {
      Alert.alert(
        "Login Failed",
        e?.response?.data?.detail || "Network error. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Ionicons
            name="briefcase-outline"
            size={42}
            color="#22C55E"
          />
          <Text style={styles.title}>Provider Login</Text>
          <Text style={styles.subtitle}>
            Manage your business & bookings
          </Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email or Username *</Text>
            <TextInput
              style={styles.input}
              value={usernameOrEmail}
              onChangeText={setUsernameOrEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="business@example.com or username"
              placeholderTextColor="#6B7280"
              editable={!isLoading && !authLoading}
            />
            {submitted && !usernameOrEmail && (
              <Text style={styles.error}>Email/Username required</Text>
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={password}
                secureTextEntry={!showPassword}
                onChangeText={setPassword}
                placeholder="••••••"
                placeholderTextColor="#6B7280"
                editable={!isLoading && !authLoading}
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={20}
                  color="#9CA3AF"
                />
              </Pressable>
            </View>
            {submitted && !password && (
              <Text style={styles.error}>Password required</Text>
            )}
          </View>
        </View>

        <Pressable
          style={[styles.primaryButton, (isLoading || authLoading) && styles.disabledButton]}
          onPress={handleLogin}
          disabled={isLoading || authLoading}
        >
          <Text style={styles.primaryButtonText}>
            {isLoading || authLoading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>

        <Pressable 
          onPress={() => router.push("/(auth)/forgot-password")}
          style={styles.linkContainer}
          disabled={isLoading || authLoading}
        >
          <Text style={styles.linkText}>Forgot password?</Text>
        </Pressable>

        <Pressable 
          onPress={() => router.push("/(auth)/register-provider")}
          style={styles.linkContainer}
          disabled={isLoading || authLoading}
        >
          <Text style={styles.linkAltText}>
            Don't have an account? <Text style={styles.linkHighlight}>Register</Text>
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  header: {
    marginTop: 40,
    marginBottom: 50,
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: "#A1A1AA",
    marginTop: 10,
    textAlign: "center",
  },
  form: { 
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: { 
    color: "#9CA3AF", 
    fontSize: 14, 
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#1F2937",
    borderRadius: 14,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderRadius: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  passwordInput: {
    flex: 1,
    height: 52,
    color: "#FFFFFF",
    fontSize: 16,
  },
  error: { 
    color: "#EF4444", 
    fontSize: 12, 
    marginTop: 6,
  },
  primaryButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  linkContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  linkText: {
    color: "#22C55E",
    fontSize: 14,
    fontWeight: "500",
  },
  linkAltText: {
    color: "#A1A1AA",
    fontSize: 14,
  },
  linkHighlight: {
    color: "#22C55E",
    fontWeight: "600",
  },
});