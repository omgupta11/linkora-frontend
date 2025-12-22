// app/(provider)/add-service.tsx

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function AddService() {
  const router = useRouter();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.title}>Add Service</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Field label="Service Name" placeholder="Haircut & Styling" />
        <Field label="Price" placeholder="₹499" />
        <Field
          label="Description"
          placeholder="Describe the service"
          multiline
        />

        <View style={styles.uploadBox}>
          <Ionicons name="image-outline" size={26} color="#9CA3AF" />
          <Text style={styles.uploadText}>Upload Service Images</Text>
        </View>
      </ScrollView>

      <Animated.View style={animatedStyle}>
        <Pressable
          style={styles.saveBtn}
          onPressIn={() => (scale.value = withSpring(1.05))}
          onPressOut={() => (scale.value = withSpring(1))}
          onPress={() => router.back()}
        >
          <Text style={styles.saveText}>Save Service</Text>
        </Pressable>
      </Animated.View>
    </LinearGradient>
  );
}

function Field({
  label,
  placeholder,
  multiline,
}: {
  label: string;
  placeholder: string;
  multiline?: boolean;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        multiline={multiline}
        style={[
          styles.input,
          multiline && { height: 100, textAlignVertical: "top" },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#1F2937",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    color: "#FFFFFF",
    fontSize: 15,
  },
  uploadBox: {
    height: 90,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 10,
  },
  uploadText: {
    color: "#9CA3AF",
    fontSize: 13,
  },
  saveBtn: {
    marginVertical: 24,
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  saveText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
});
