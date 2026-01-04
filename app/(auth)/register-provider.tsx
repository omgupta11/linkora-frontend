import { useEffect, useMemo, useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import api from "../../lib/api";

/* ---------------- CONSTANTS ---------------- */

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
  "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
  "Madhya Pradesh","Maharashtra",Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura",
  "Uttar Pradesh","Uttarakhand","West Bengal",
];

const CATEGORIES = [
  "Salon","Electrician","Plumber","Cleaning","Repair","Coaching","Other",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const pinRegex = /^[0-9]{6}$/;
const phoneRegex = /^[0-9]{10}$/;

/* ---------------- SCREEN ---------------- */

export default function RegisterProvider() {
  const router = useRouter();

/* -------- STEP CONTROL -------- */

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [submitted, setSubmitted] = useState(false);
const next = () => setStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev));
const back = () => setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));


/* -------- ACCOUNT -------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [phone, setPhone] = useState("");

/* -------- BUSINESS -------- */
  const [businessName, setBusinessName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [category, setCategory] = useState("");

/* -------- ADDRESS -------- */
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country] = useState("India");
  const [pincode, setPincode] = useState("");
  const [landmark, setLandmark] = useState("");

/* -------- OPTIONAL -------- */
  const [gst, setGst] = useState("");

/* -------- IMAGES -------- */
  const [coverImage, setCoverImage] = useState<any>(null);
  const [ownerImage, setOwnerImage] = useState<any>(null);

/* -------- UI -------- */
  const [loading, setLoading] = useState(false);

/* ---------------- IMAGE PICKER ---------------- */

  async function pickImage(setter: any) {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!res.canceled) {
      setter(res.assets[0]);
    }
  }

/* ---------------- VALIDATION ---------------- */

  function isStepValid() {
    if (step === 1) {
      return (
        emailRegex.test(email.trim()) &&
        password.length >= 6 &&
        phoneRegex.test(phone)
      );
    }
    if (step === 2) {
      return businessName.trim() && ownerName.trim() && category;
    }
    if (step === 3) {
      return (
        street.trim() &&
        city.trim() &&
        state &&
        pinRegex.test(pincode)
      );
    }
    return true;
  }

/* ---------------- SUBMIT ---------------- */

  async function handleSubmit() {
    setSubmitted(true);
    if (!isStepValid()) return;

    try {
      setLoading(true);

      const form = new FormData();
      form.append("email", email.trim().toLowerCase());
      form.append("password", password);
      form.append("phone", phone);
      form.append("role", "provider");

      form.append("business_name", businessName.trim());
      form.append("owner_name", ownerName.trim());
      form.append("category", category);

      form.append("street", street.trim());
      form.append("city", city.trim());
      form.append("state", state);
      form.append("country", country);
      form.append("pincode", pincode);
      if (landmark) form.append("landmark", landmark);
      if (gst) form.append("gst", gst);

      if (coverImage) {
        form.append("cover_image", {
          uri: coverImage.uri,
          name: "cover.jpg",
          type: "image/jpeg",
        } as any);
      }

      if (ownerImage) {
        form.append("owner_image", {
          uri: ownerImage.uri,
          name: "owner.jpg",
          type: "image/jpeg",
        } as any);
      }

      await api.post("/auth/register/", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Account created. Please login.");
      router.replace("/(auth)/login-provider");
    } catch (e: any) {
      Alert.alert(
        "Registration failed",
        e?.response?.data?.detail || "Please check details"
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
          <Text style={styles.heading}>Provider Registration</Text>
          <Text style={styles.step}>Step {step} of 4</Text>

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <Input label="Email *" value={email} onChangeText={setEmail}
                error={submitted && !emailRegex.test(email) && "Invalid email"} />
              <Input label="Password *" value={password}
                onChangeText={setPassword} secureTextEntry={!showPwd}
                error={submitted && password.length < 6 && "Min 6 chars"}
                rightIcon={
                  <Ionicons
                    name={showPwd ? "eye-off" : "eye"}
                    size={18}
                    color="#9CA3AF"
                    onPress={() => setShowPwd(!showPwd)}
                  />
                } />
              <Input label="Phone (10 digits) *" value={phone}
                keyboardType="numeric"
                onChangeText={(t) => setPhone(t.replace(/[^0-9]/g, ""))}
                error={submitted && !phoneRegex.test(phone) && "Invalid phone"} />
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <Input label="Business Name *" value={businessName} onChangeText={setBusinessName}
                error={submitted && !businessName && "Required"} />
              <Input label="Owner Name *" value={ownerName} onChangeText={setOwnerName}
                error={submitted && !ownerName && "Required"} />
              <Dropdown label="Category *" value={category} setValue={setCategory} options={CATEGORIES}
                error={submitted && !category && "Select category"} />
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <Input label="Street Address *" value={street} onChangeText={setStreet}
                error={submitted && !street && "Required"} />
              <Input label="City *" value={city} onChangeText={setCity}
                error={submitted && !city && "Required"} />
              <Dropdown label="State *" value={state} setValue={setState} options={INDIAN_STATES}
                error={submitted && !state && "Select state"} />
              <Input label="Pincode *" value={pincode} keyboardType="numeric"
                onChangeText={(t) => setPincode(t.replace(/[^0-9]/g, ""))}
                error={submitted && !pinRegex.test(pincode) && "6 digit PIN"} />
              <Input label="Landmark (optional)" value={landmark} onChangeText={setLandmark} />
            </>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <>
              <Input label="GST Number (optional)" value={gst} onChangeText={setGst} />
              <ImagePickerBox label="Business Cover (optional)" image={coverImage}
                onPick={() => pickImage(setCoverImage)} />
              <ImagePickerBox label="Owner Photo (optional)" image={ownerImage}
                onPick={() => pickImage(setOwnerImage)} />
            </>
          )}

          {/* ACTIONS */}
          <View style={styles.actions}>
            {step > 1 && (
              <Pressable style={styles.secondary} onPress={back}>
                <Text style={styles.secondaryText}>Back</Text>
              </Pressable>
            )}
            {step < 4 ? (
              <Pressable
                style={[styles.primary, !isStepValid() && styles.disabled]}
                onPress={() => {
                  setSubmitted(true);
                  if (isStepValid()) next();
                }}
              >
                <Text style={styles.primaryText}>Next</Text>
              </Pressable>
            ) : (
              <Pressable
                style={[styles.primary, loading && styles.disabled]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.primaryText}>
                  {loading ? "Submitting..." : "Create Account"}
                </Text>
              </Pressable>
            )}
          </View>
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

function Dropdown({ label, value, setValue, options, error }: any) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text style={styles.label}>{label}</Text>
      <ScrollView style={styles.dropdown}>
        {options.map((o: string) => (
          <Pressable key={o} onPress={() => setValue(o)}>
            <Text style={[
              styles.option,
              value === o && { color: "#22C55E" },
            ]}>{o}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

function ImagePickerBox({ label, image, onPick }: any) {
  return (
    <View style={{ marginBottom: 22 }}>
      <Text style={styles.label}>{label}</Text>
      <Pressable style={styles.imageBox} onPress={onPick}>
        {image ? (
          <Image source={{ uri: image.uri }} style={styles.image} />
        ) : (
          <Ionicons name="camera" size={28} color="#9CA3AF" />
        )}
      </Pressable>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 24 },
  heading: { fontSize: 26, color: "#FFF", fontWeight: "700", marginTop: 60 },
  step: { color: "#9CA3AF", marginTop: 6, marginBottom: 30 },
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
  dropdown: {
    maxHeight: 180,
    backgroundColor: "#1F2937",
    borderRadius: 14,
    padding: 12,
  },
  option: { color: "#FFF", paddingVertical: 8 },
  imageBox: {
    height: 140,
    backgroundColor: "#1F2937",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "100%", borderRadius: 14 },
  actions: { flexDirection: "row", gap: 12, marginVertical: 40 },
  primary: {
    flex: 1,
    backgroundColor: "#22C55E",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  primaryText: { color: "#000", fontWeight: "600", fontSize: 16 },
  secondary: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    backgroundColor: "#1F2937",
  },
  secondaryText: { color: "#FFF" },
  disabled: { opacity: 0.5 },
});
