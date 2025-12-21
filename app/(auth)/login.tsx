import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { saveAuth } from "../../src/utils/auth";

export default function Login() {
  const { role } = useLocalSearchParams<{ role: "consumer" | "provider" }>();
  const router = useRouter();

  const handleLogin = async () => {
    await saveAuth("FAKE_JWT_TOKEN", role || "consumer");

    router.replace(
      role === "provider"
        ? "/(provider)/dashboard"
        : "/(consumer)/home"
    );
  };

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#0B0B0F" }}>
      <Text style={{ color:"#fff", fontSize:22, marginBottom:20 }}>
        Login ({role})
      </Text>

      <Pressable
        onPress={handleLogin}
        style={{ backgroundColor:"#22C55E", padding:14, borderRadius:12 }}
      >
        <Text style={{ color:"#000", fontWeight:"600" }}>Login</Text>
      </Pressable>
    </View>
  );
}
