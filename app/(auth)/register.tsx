import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function Register() {
  const { role } = useLocalSearchParams<{ role: "consumer" | "provider" }>();
  const router = useRouter();

  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#0B0B0F" }}>
      <Text style={{ color:"#fff", fontSize:24, marginBottom:20 }}>
        Register ({role})
      </Text>

      <Pressable
        onPress={() =>
          router.replace(
            role === "provider"
              ? "/(provider)/dashboard"
              : "/(consumer)/home"
          )
        }
        style={{ backgroundColor:"#22C55E", padding:14, borderRadius:12 }}
      >
        <Text style={{ color:"#000", fontWeight:"600" }}>Create Account</Text>
      </Pressable>
    </View>
  );
}
