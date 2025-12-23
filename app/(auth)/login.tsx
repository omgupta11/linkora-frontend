import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  Alert,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: "consumer" | "provider" }>();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const scaleLogin = useSharedValue(1);
  const loginStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLogin.value }],
  }));

  const isConsumer = role === "consumer";

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert("Error", "Enter email and password");
      return;
    }

    try {
      setLoading(true);
      const user = await login(email, password);

      if (user.role === "consumer") {
        router.replace("/(consumer)/home");
      } else {
        router.replace("/(provider)/dashboard");
      }
    } catch (e) {
      Alert.alert("Login failed", "Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Ionicons
            name={isConsumer ? "person-outline" : "briefcase-outline"}
            size={36}
            color="#22C55E"
          />

          <Text style={styles.title}>
            {isConsumer ? "Consumer Login" : "Provider Login"}
          </Text>

          <Text style={styles.subtitle}>
            {isConsumer
              ? "Access your account and discover businesses"
              : "Manage your business and reach customers"}
          </Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="you@example.com"
              placeholderTextColor="#6B7280"
              style={styles.input}
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#6B7280"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actions}>
          <Animated.View style={loginStyle}>
            <Pressable
              onPressIn={() => (scaleLogin.value = withSpring(1.05))}
              onPressOut={() => (scaleLogin.value = withSpring(1))}
              onPress={handleLogin}
              style={styles.loginButton}
              disabled={loading}
            >
              <Text style={styles.loginText}>
                {loading ? "Logging in..." : "Login"}
              </Text>
            </Pressable>
          </Animated.View>

          <Pressable
            onPress={() =>
              router.push(
                isConsumer
                  ? "/(auth)/register?role=consumer"
                  : "/(auth)/register?role=provider"
              )
            }
          >
            <Text style={styles.registerText}>
              Don’t have an account? Create one
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 80,
    marginBottom: 40,
    alignItems: "center",
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 16,
  },
  subtitle: {
    fontSize: 15,
    color: "#A1A1AA",
    marginTop: 10,
    textAlign: "center",
    maxWidth: "85%",
    lineHeight: 22,
  },
  form: {
    gap: 20,
  },
  inputWrapper: {
    gap: 6,
  },
  label: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  input: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 16,
    backgroundColor: "#1F2937",
    color: "#FFFFFF",
    fontSize: 15,
  },
  actions: {
    marginTop: 40,
    gap: 18,
  },
  loginButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  loginText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  registerText: {
    textAlign: "center",
    color: "#A1A1AA",
    fontSize: 14,
  },
});
