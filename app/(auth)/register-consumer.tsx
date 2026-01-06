import { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import api from "../../lib/api";

/* ---------------- CONSTANTS ---------------- */

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;

const PREFERENCES = [
  "Salon",
  "Cleaning",
  "Repair",
  "Electrician",
  "Plumber",
  "Coaching",
];

/* ---------------- SCREEN ---------------- */

export default function RegisterConsumer() {
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  /* -------- BASIC -------- */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [phone, setPhone] = useState("");

  /* -------- DOB -------- */
  const [dob, setDob] = useState<Date | null>(null);
  const [showDob, setShowDob] = useState(false);

  /* -------- IMAGE -------- */
  const [profileImage, setProfileImage] = useState<any>(null);

  /* -------- PREFS -------- */
  const [prefs, setPrefs] = useState<string[]>([]);

  /* ---------------- IMAGE PICKER ---------------- */

  async function pickImage() {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!res.canceled) {
      setProfileImage(res.assets[0]);
    }
  }

  /* ---------------- VALIDATION ---------------- */

  const isValid = useMemo(() => {
    return (
      name.trim().length >= 2 &&
      emailRegex.test(email.trim()) &&
      password.length >= 6 &&
      phoneRegex.test(phone) &&
      dob !== null
    );
  }, [name, email, password, phone, dob]);

  /* ---------------- SUBMIT ---------------- */

  async function handleSubmit() {
    setSubmitted(true);
    if (!isValid) return;

    try {
      setLoading(true);

      const form = new FormData();
      form.append("name", name.trim());
      form.append("email", email.trim().toLowerCase());
      form.append("password", password);
      form.append("phone", phone);
      form.append("role", "consumer");
      form.append("dob", dob!.toISOString().split("T")[0]);
      form.append("preferences", JSON.stringify(prefs));

      if (profileImage) {
        form.append("profile_image", {
          uri: profileImage.uri,
          name: "profile.jpg",
          type: "image/jpeg",
        } as any);
      }

      await api.post("/api/auth/register/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Account created. Please login.");
      router.replace("/(auth)/login-consumer");
    } catch (e: any) {
      console.log("REGISTER ERROR:", e?.response?.data);
      Alert.alert(
        "Registration failed",
        JSON.stringify(e?.response?.data, null, 2)
      );
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- UI ---------------- */

  return (
    <LinearGradient colors={["#0B0B0F", "#12121A"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.heading}>Consumer Registration</Text>

          <ImagePickerBox image={profileImage} onPick={pickImage} />

          <Input
            label="Full Name *"
            value={name}
            onChangeText={setName}
            error={submitted && name.length < 2 && "Enter full name"}
          />

          <Input
            label="Email *"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={submitted && !emailRegex.test(email) && "Invalid email"}
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
            error={submitted && password.length < 6 && "Min 6 characters"}
          />

          <Input
            label="Phone (10 digits) *"
            value={phone}
            keyboardType="numeric"
            onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ""))}
            error={submitted && !phoneRegex.test(phone) && "Invalid phone"}
          />

          {/* DOB */}
          <Pressable onPress={() => setShowDob(true)} style={styles.dobBox}>
            <Text style={styles.dobText}>
              {dob ? dob.toDateString() : "Select Date of Birth *"}
            </Text>
          </Pressable>
          {submitted && !dob && (
            <Text style={styles.error}>DOB is required</Text>
          )}

          {showDob && (
            <DateTimePicker
              value={dob || new Date(2000, 0, 1)}
              mode="date"
              display="default"
              maximumDate={new Date()}
              onChange={(_, d) => {
                setShowDob(false);
                if (d) setDob(d);
              }}
            />
          )}

          {/* PREFERENCES */}
          <Text style={styles.prefLabel}>Preferences (optional)</Text>
          {PREFERENCES.map((p) => (
            <Pressable
              key={p}
              style={styles.prefRow}
              onPress={() =>
                setPrefs((prev) =>
                  prev.includes(p)
                    ? prev.filter((x) => x !== p)
                    : [...prev, p]
                )
              }
            >
              <Ionicons
                name={prefs.includes(p) ? "checkbox" : "square-outline"}
                size={20}
                color="#22C55E"
              />
              <Text style={styles.prefText}>{p}</Text>
            </Pressable>
          ))}

          <Pressable
            style={[styles.primary, (!isValid || loading) && styles.disabled]}
            disabled={!isValid || loading}
            onPress={handleSubmit}
          >
            <Text style={styles.primaryText}>
              {loading ? "Creating..." : "Create Account"}
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Input({ label, error, rightIcon, ...props }: any) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput {...props} style={styles.input} placeholderTextColor="#6B7280" />
        {rightIcon}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

function ImagePickerBox({ image, onPick }: any) {
  return (
    <Pressable style={styles.imageBox} onPress={onPick}>
      {image ? (
        <Image source={{ uri: image.uri }} style={styles.image} />
      ) : (
        <>
          <Ionicons name="camera" size={28} color="#9CA3AF" />
          <Text style={{ color: "#9CA3AF", marginTop: 6 }}>
            Upload Profile Photo (optional)
          </Text>
        </>
      )}
    </Pressable>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  heading: { fontSize: 26, color: "#FFF", fontWeight: "700", marginTop: 60 },
  label: { color: "#9CA3AF", fontSize: 13, marginBottom: 6 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1F2937",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  input: { height: 52, flex: 1, color: "#FFF", fontSize: 15 },
  error: { color: "#EF4444", fontSize: 12, marginTop: 6 },
  dobBox: {
    height: 52,
    backgroundColor: "#1F2937",
    borderRadius: 14,
    justifyContent: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  dobText: { color: "#FFF" },
  prefLabel: { color: "#9CA3AF", marginTop: 20, marginBottom: 10 },
  prefRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  prefText: { color: "#FFF", marginLeft: 10 },
  imageBox: {
    height: 140,
    backgroundColor: "#1F2937",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  image: { width: "100%", height: "100%", borderRadius: 14 },
  primary: {
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginVertical: 40,
  },
  primaryText: { color: "#000", fontWeight: "600", fontSize: 16 },
  disabled: { opacity: 0.5 },
});
