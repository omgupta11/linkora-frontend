import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";
import api from "../../lib/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setSubmitted(true);
    if (!emailRegex.test(email.trim())) return;

    try {
      setLoading(true);

      await api.post("/auth/password-reset/", {
        email: email.trim().toLowerCase(),
      });

      Alert.alert(
        "Email sent",
        "Check your inbox for reset instructions"
      );
      router.back();
    } catch (e: any) {
      Alert.alert(
        "Failed",
        e?.response?.data?.detail || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <Animated.View entering={FadeInUp} style={styles.box}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.sub}>
          Enter your registered email to reset password
        </Text>

        <TextInput
          placeholder="Email address"
          placeholderTextColor="#6B7280"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {submitted && !emailRegex.test(email) && (
          <Text style={styles.error}>Enter a valid email</Text>
        )}

        <Pressable
          style={[styles.btn, loading && styles.disabled]}
          onPress={handleReset}
          disabled={loading}
        >
          <Text style={styles.btnText}>
            {loading ? "Sending..." : "Send Reset Link"}
          </Text>
        </Pressable>

        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>Back to Login</Text>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  box: { gap: 16 },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  sub: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  input: {
    height: 52,
    backgroundColor: "#1F2937",
    borderRadius: 14,
    paddingHorizontal: 16,
    color: "#FFFFFF",
  },
  error: {
    color: "#EF4444",
    fontSize: 12,
    marginTop: -8,
  },
  btn: {
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  back: {
    color: "#22C55E",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
  },
  disabled: { opacity: 0.5 },
});
