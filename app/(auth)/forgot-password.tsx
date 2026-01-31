import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import api from "../../lib/api";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPassword() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleReset() {
    setSubmitted(true);
    
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email");
      return;
    }
    
    if (!emailRegex.test(email.trim())) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // Try common Django password reset endpoints
      let endpoint = "/auth/password-reset/";
      let success = false;
      
      try {
        await api.post(endpoint, {
          email: email.trim().toLowerCase(),
        });
        success = true;
      } catch (error: any) {
        console.log("First endpoint failed:", endpoint, error.message);
        
        // Try alternative endpoints
        const endpoints = [
          "/api/password-reset/",
          "/api/forgot-password/",
          "/password-reset/",
          "/users/password-reset/",
        ];
        
        for (const altEndpoint of endpoints) {
          try {
            await api.post(altEndpoint, {
              email: email.trim().toLowerCase(),
            });
            success = true;
            endpoint = altEndpoint;
            break;
          } catch (e) {
            continue;
          }
        }
      }

      if (success) {
        Alert.alert(
          "Email Sent",
          "Check your inbox for password reset instructions",
          [
            {
              text: "OK",
              onPress: () => router.back()
            }
          ]
        );
      } else {
        Alert.alert(
          "Feature Not Available",
          "Password reset via email is not configured. Please contact support.",
          [
            {
              text: "OK",
              onPress: () => router.back()
            }
          ]
        );
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      
      let errorMessage = "Something went wrong. Please try again.";
      if (error.response?.data) {
        if (typeof error.response.data === 'object') {
          errorMessage = Object.values(error.response.data).flat().join(', ');
        } else {
          errorMessage = error.response.data;
        }
      }
      
      Alert.alert("Failed", errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <View style={styles.box}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.sub}>
          Enter your registered email to reset password
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address *</Text>
          <TextInput
            placeholder="john@example.com"
            placeholderTextColor="#6B7280"
            style={[styles.input, submitted && !emailRegex.test(email) && styles.inputError]}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
          {submitted && !emailRegex.test(email) && (
            <Text style={styles.error}>Please enter a valid email</Text>
          )}
        </View>

        <Pressable
          style={[styles.btn, loading && styles.disabled]}
          onPress={handleReset}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.btnText}>Send Reset Link</Text>
          )}
        </Pressable>

        <Pressable 
          onPress={() => router.back()}
          style={styles.backButton}
          disabled={loading}
        >
          <Text style={styles.backText}>Back to Login</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  box: { 
    gap: 24,
    backgroundColor: "rgba(31, 41, 55, 0.7)",
    borderRadius: 20,
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },
  sub: {
    fontSize: 15,
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    color: "#9CA3AF",
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    height: 56,
    backgroundColor: "#1F2937",
    borderRadius: 14,
    paddingHorizontal: 18,
    color: "#FFFFFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  inputError: {
    borderColor: "#EF4444",
  },
  error: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 6,
  },
  btn: {
    backgroundColor: "#22C55E",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
  },
  btnText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    alignItems: "center",
    paddingVertical: 12,
  },
  backText: {
    color: "#22C55E",
    fontSize: 15,
    fontWeight: "500",
  },
  disabled: { 
    opacity: 0.6,
  },
});