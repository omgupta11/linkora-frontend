import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function RoleSelect() {
  return (
    <View style={{ flex:1, backgroundColor:"#0B0B0F", justifyContent:"center", alignItems:"center" }}>
      
      <Link href="/(auth)/login?role=consumer" style={{ marginBottom:20 }}>
        <Text style={{ color:"#22C55E", fontSize:18 }}>Continue as Consumer</Text>
      </Link>

      <Link href="/(auth)/login?role=provider">
        <Text style={{ color:"#FFFFFF", fontSize:18 }}>Continue as Provider</Text>
      </Link>

    </View>
  );
}
