import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export default function Register() {
  const router = useRouter();
  const { role } = useLocalSearchParams<{ role?: "consumer" | "provider" }>();
  const isConsumer = role === "consumer";

  const scaleSubmit = useSharedValue(1);
  const submitStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleSubmit.value }],
  }));

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER */}
          <View style={styles.header}>
            {/* LOGO */}
           <Image
  source={require("../../assets/images/icon.png")}
  style={styles.logo}
  resizeMode="contain"
/>


            {/* ROLE ICON */}
            <Ionicons
              name={isConsumer ? "person-outline" : "briefcase-outline"}
              size={36}
              color="#22C55E"
            />

            <Text style={styles.title}>
              {isConsumer
                ? "Consumer Registration"
                : "Provider Registration"}
            </Text>

            <Text style={styles.subtitle}>
              {isConsumer
                ? "Create your account to explore trusted businesses"
                : "Register your business and start growing with Linkora"}
            </Text>
          </View>

          {/* COMMON FIELDS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>

            <Field label="Full Name" placeholder="John Doe" />
            <Field label="Email" placeholder="you@example.com" />
            <Field label="Phone Number" placeholder="+91 9XXXXXXXXX" />
            <Field label="Password" placeholder="••••••••" secure />
          </View>

          {/* CONSUMER EXTRA */}
          {isConsumer && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              <Field label="City" placeholder="Your city" />
              <Field
                label="Interests"
                placeholder="e.g. Salon, Fitness, Repair"
              />
            </View>
          )}

          {/* PROVIDER EXTRA */}
          {!isConsumer && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Business Details</Text>

              <Field label="Business Name" placeholder="Your business name" />
              <Field
                label="Business Category"
                placeholder="e.g. Salon, Plumbing"
              />
              <Field
                label="Services Offered"
                placeholder="e.g. Haircut, Spa, Repair"
              />
              <Field label="Price Range" placeholder="₹₹ / ₹₹₹" />
              <Field
                label="Business Description"
                placeholder="Describe your business"
                multiline
              />

              <View style={styles.uploadBox}>
                <Ionicons
                  name="image-outline"
                  size={26}
                  color="#9CA3AF"
                />
                <Text style={styles.uploadText}>
                  Upload Business Images (coming next)
                </Text>
              </View>

              <View style={styles.uploadBox}>
                <Ionicons
                  name="location-outline"
                  size={26}
                  color="#9CA3AF"
                />
                <Text style={styles.uploadText}>
                  Select Business Location (Google Maps)
                </Text>
              </View>
            </View>
          )}

          {/* SUBMIT */}
          <View style={styles.actions}>
            <Animated.View style={submitStyle}>
              <Pressable
                onPressIn={() => (scaleSubmit.value = withSpring(1.05))}
                onPressOut={() => (scaleSubmit.value = withSpring(1))}
                onPress={() =>
                  router.replace(
                    isConsumer
                      ? "/(consumer)/home"
                      : "/(provider)/dashboard"
                  )
                }
                style={styles.submitButton}
              >
                <Text style={styles.submitText}>Create Account</Text>
              </Pressable>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

/* ---------- REUSABLE FIELD ---------- */
function Field({
  label,
  placeholder,
  secure,
  multiline,
}: {
  label: string;
  placeholder: string;
  secure?: boolean;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        secureTextEntry={secure}
        multiline={multiline}
        style={[
          styles.input,
          multiline && { height: 100, textAlignVertical: "top" },
        ]}
      />
    </View>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    marginTop: 80,
    marginBottom: 30,
    alignItems: "center",
  },
  logo: {
    width: 96,
    height: 96,
    marginBottom: 14,
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
    maxWidth: "85%",
    lineHeight: 22,
  },
  section: {
    marginBottom: 28,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 6,
  },
  field: {
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
  uploadBox: {
    height: 80,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  uploadText: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  actions: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  submitText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
