// app/(auth)/forgot-password.tsx

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ForgotPassword() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <Animated.View entering={FadeInUp} style={styles.box}>
        <Text style={styles.title}>Forgot Password</Text>
        <Text style={styles.sub}>
          Enter your email to reset password
        </Text>

        <TextInput
          placeholder="Email address"
          placeholderTextColor="#6B7280"
          style={styles.input}
        />

        <Pressable style={styles.btn}>
          <Text style={styles.btnText}>Send Reset Link</Text>
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
  box: {
    gap: 16,
  },
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
});
