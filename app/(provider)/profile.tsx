// app/(provider)/profile.tsx

import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function ProviderProfile() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Ionicons name="business-outline" size={90} color="#22C55E" />
        <Text style={styles.name}>Glow Salon</Text>
        <Text style={styles.sub}>Business Account</Text>
      </View>

      <View style={styles.list}>
        <Option
          icon="briefcase-outline"
          label="Manage Services"
          onPress={() => router.push("/(provider)/services")}
        />
        <Option
          icon="image-outline"
          label="Business Images"
          onPress={() => {}}
        />
        <Option
          icon="location-outline"
          label="Business Location"
          onPress={() => {}}
        />
        <Option
          icon="cash-outline"
          label="Payments & Payouts"
          onPress={() => {}}
        />
        <Option
          icon="settings-outline"
          label="Settings"
          onPress={() => {}}
        />
        <Option
          icon="log-out-outline"
          label="Logout"
          danger
          onPress={() => router.replace("/")}
        />
      </View>
    </LinearGradient>
  );
}

function Option({
  icon,
  label,
  onPress,
  danger,
}: {
  icon: any;
  label: string;
  onPress: () => void;
  danger?: boolean;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(1.03))}
        onPressOut={() => (scale.value = withSpring(1))}
        onPress={onPress}
        style={styles.option}
      >
        <Ionicons
          name={icon}
          size={22}
          color={danger ? "#EF4444" : "#22C55E"}
        />
        <Text
          style={[
            styles.optionText,
            danger && { color: "#EF4444" },
          ]}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 10,
  },
  sub: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  list: {
    gap: 14,
  },
  option: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  optionText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});

