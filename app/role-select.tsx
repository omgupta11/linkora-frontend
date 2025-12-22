import { View, Text, StyleSheet, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export default function RoleSelect() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: "consumer" | "provider" }>();

  const scaleLogin = useSharedValue(1);
  const scaleRegister = useSharedValue(1);

  const loginStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleLogin.value }],
  }));

  const registerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleRegister.value }],
  }));

  const isConsumer = role === "consumer";

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons
          name={isConsumer ? "person-outline" : "briefcase-outline"}
          size={48}
          color="#22C55E"
        />

        <Text style={styles.title}>
          {isConsumer ? "Consumer Access" : "Provider Access"}
        </Text>

        <Text style={styles.subtitle}>
          {isConsumer
            ? "Discover and book trusted local businesses"
            : "Grow your business and reach more customers"}
        </Text>
      </View>

      {/* ACTIONS */}
      <View style={styles.actions}>
        <Animated.View style={loginStyle}>
          <Pressable
            onPress={() =>
              router.push(
                isConsumer
                  ? "/(auth)/login?role=consumer"
                  : "/(auth)/login?role=provider"
              )
            }
            onPressIn={() => (scaleLogin.value = withSpring(1.05))}
            onPressOut={() => (scaleLogin.value = withSpring(1))}
            style={[styles.button, styles.primary]}
          >
            <Text style={styles.primaryText}>Login</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={registerStyle}>
          <Pressable
            onPress={() =>
              router.push(
                isConsumer
                  ? "/(auth)/register?role=consumer"
                  : "/(auth)/register?role=provider"
              )
            }
            onPressIn={() => (scaleRegister.value = withSpring(1.05))}
            onPressOut={() => (scaleRegister.value = withSpring(1))}
            style={[styles.button, styles.secondary]}
          >
            <Text style={styles.secondaryText}>Create Account</Text>
          </Pressable>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
    paddingBottom: 40,
  },
  header: {
    marginTop: 120,
    alignItems: "center",
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
  actions: {
    gap: 16,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primary: {
    backgroundColor: "#22C55E",
  },
  secondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#374151",
  },
  primaryText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
