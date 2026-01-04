import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { height } = Dimensions.get("window");

export default function Landing() {
  const router = useRouter();

  const scaleConsumer = useSharedValue(1);
  const scaleProvider = useSharedValue(1);

  const consumerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleConsumer.value }],
  }));

  const providerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleProvider.value }],
  }));

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      {/* HERO */}
      <View style={styles.hero}>
        <Text style={styles.logo}>Linkora</Text>
        <Text style={styles.tagline}>Where Every Purchase Pays Back</Text>
        <Text style={styles.description}>
          Linkora connects consumers with trusted local businesses and empowers
          service providers with visibility, transparency, and growth.
        </Text>
      </View>

      {/* FEATURES */}
      <View style={styles.features}>
        <Text style={styles.feature}>• Discover verified local businesses</Text>
        <Text style={styles.feature}>• Transparent pricing & services</Text>
        <Text style={styles.feature}>• Earn rewards on every booking</Text>
        <Text style={styles.feature}>• Grow your business with trust</Text>
      </View>

      {/* CTA */}
      <View style={styles.cta}>
        <Animated.View style={consumerStyle}>
          <Pressable
            onPress={() => router.push("/role-select?role=consumer")}
            onPressIn={() => (scaleConsumer.value = withSpring(1.05))}
            onPressOut={() => (scaleConsumer.value = withSpring(1))}
            style={[styles.button, styles.consumer]}
          >
            <Text style={styles.buttonText}>Continue as Consumer</Text>
          </Pressable>
        </Animated.View>

        <Animated.View style={providerStyle}>
          <Pressable
            onPress={() => router.push("/role-select?role=provider")}
            onPressIn={() => (scaleProvider.value = withSpring(1.05))}
            onPressOut={() => (scaleProvider.value = withSpring(1))}
            style={[styles.button, styles.provider]}
          >
            <Text style={styles.buttonText}>Continue as Provider</Text>
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
    paddingTop: height * 0.12,
  },
  hero: { marginBottom: 40 },
  logo: {
    fontSize: 42,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 18,
    color: "#22C55E",
    marginBottom: 14,
  },
  description: {
    fontSize: 15,
    color: "#A1A1AA",
    lineHeight: 22,
  },
  features: { marginBottom: 40 },
  feature: {
    fontSize: 14,
    color: "#D4D4D8",
    marginBottom: 10,
  },
  cta: {
    marginTop: "auto",
    marginBottom: 30,
    gap: 14,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  consumer: { backgroundColor: "#22C55E" },
  provider: {
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
