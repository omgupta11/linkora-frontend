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
import { useAuth } from "@/context/AuthContext";


export default function LoginProvider() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleLogin() {
    setSubmitted(true);
    if (!email || !password) return;

    try {
      setLoading(true);

      const user = await login(
        email.trim().toLowerCase(),
        password
      );

      if (user.role !== "provider") {
        Alert.alert("Access denied", "Not a provider account");
        return;
      }

      router.replace("/(provider)/dashboard");
    } catch (e: any) {
      Alert.alert(
        "Login failed",
        e?.response?.data?.detail || "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient colors={["#0B0B0F", "#12121A"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.header}>
          <Ionicons name="briefcase-outline" size={42} color="#22C55E" />
          <Text style={styles.title}>Provider Login</Text>
          <Text style={styles.subtitle}>
            Manage your business & bookings
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Email *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={submitted && !email && "Email required"}
          />

          <Input
            label="Password *"
            value={password}
            secureTextEntry={!showPwd}
            onChangeText={setPassword}
            rightIcon={
              <Ionicons
                name={showPwd ? "eye-off" : "eye"}
                size={18}
                color="#9CA3AF"
                onPress={() => setShowPwd(!showPwd)}
              />
            }
            error={submitted && !password && "Password required"}
          />
        </View>

        <Pressable
          style={[styles.primary, loading && styles.disabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.primaryText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/(auth)/forgot-password")}
        >
          <Text style={styles.link}>Forgot password?</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/(auth)/register-provider")}
        >
          <Text style={styles.linkAlt}>
            Don’t have an account? Register
          </Text>
        </Pressable>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

/* ---------- COMPONENT ---------- */

function Input({ label, error, rightIcon, ...props }: any) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          {...props}
          style={styles.input}
          placeholderTextColor="#6B7280"
        />
        {rightIcon}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  header: {
    marginTop: 90,
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
  form: { marginBottom: 30 },
  label: { color: "#9CA3AF", fontSize: 13, marginBottom: 6 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  input: {
    height: 52,
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
  },
  error: { color: "#EF4444", fontSize: 12, marginTop: 6 },
  primary: {
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  primaryText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    textAlign: "center",
    color: "#22C55E",
    fontSize: 14,
    marginBottom: 10,
  },
  linkAlt: {
    textAlign: "center",
    color: "#A1A1AA",
    fontSize: 14,
  },
  disabled: { opacity: 0.5 },
});
