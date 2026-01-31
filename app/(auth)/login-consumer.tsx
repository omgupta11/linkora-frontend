// app/(auth)/login-consumer.tsx
import { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  Pressable, 
  Alert, 
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function LoginConsumer() {
  const router = useRouter();
  const { login, loading: authLoading } = useAuth();
  
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin() {
    if (!usernameOrEmail.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter email/username and password");
      return;
    }

    try {
      setIsLoading(true);
      const result = await login(usernameOrEmail, password);
      
      if (!result.success) {
        Alert.alert("Login Failed", result.error || "Invalid credentials");
      }
      // Navigation happens in AuthContext on success
    } catch (e: any) {
      console.log("LOGIN ERROR:", e);
      Alert.alert("Login Failed", "Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LinearGradient colors={["#0B0B0F", "#12121A"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.heading}>Welcome Back</Text>
            <Text style={styles.subHeading}>Login to continue as Consumer</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email or Username</Text>
              <TextInput
                style={styles.input}
                value={usernameOrEmail}
                onChangeText={setUsernameOrEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                placeholder="john@example.com"
                placeholderTextColor="#6B7280"
                editable={!isLoading}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholder="••••••"
                placeholderTextColor="#6B7280"
                editable={!isLoading}
              />
            </View>

            <Pressable 
              style={[styles.primaryButton, (isLoading || authLoading) && styles.disabledButton]} 
              onPress={handleLogin}
              disabled={isLoading || authLoading}
            >
              {isLoading || authLoading ? (
                <ActivityIndicator color="#000" />
              ) : (
                <Text style={styles.primaryButtonText}>Login</Text>
              )}
            </Pressable>

            <Pressable 
              onPress={() => router.push("/(auth)/register-consumer")} 
              style={styles.signupLink}
              disabled={isLoading}
            >
              <Text style={styles.signupText}>
                Don't have an account? <Text style={styles.signupHighlight}>Sign Up</Text>
              </Text>
            </Pressable>

            <Pressable 
              onPress={() => router.push("/(auth)/forgot-password")}
              style={styles.forgotLink}
              disabled={isLoading}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  content: { 
    width: '100%',
  },
  heading: { 
    color: "#FFF", 
    fontSize: 32, 
    fontWeight: '700', 
    marginBottom: 8,
    textAlign: 'center',
  },
  subHeading: { 
    color: "#9CA3AF", 
    fontSize: 16, 
    marginBottom: 32,
    textAlign: 'center',
  },
  label: { 
    color: "#9CA3AF", 
    marginBottom: 6,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#1F2937",
    borderRadius: 14,
    padding: 16,
    color: "#FFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  inputContainer: {
    marginBottom: 20,
  },
  primaryButton: {
    backgroundColor: "#22C55E",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  primaryButtonText: { 
    color: "#000", 
    fontWeight: "600", 
    fontSize: 16,
  },
  signupLink: {
    alignItems: 'center',
    marginBottom: 16,
  },
  signupText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  signupHighlight: {
    color: '#22C55E',
    fontWeight: '600',
  },
  forgotLink: {
    alignItems: 'center',
  },
  forgotText: {
    color: '#22C55E',
    fontSize: 14,
    fontWeight: '500',
  },
});