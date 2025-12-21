import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#0B0B0F" }}>
      <Text style={{ color:"#fff", fontSize:32, marginBottom:20 }}>Linkora</Text>
      <Link href="/role-select">
        <Text style={{ color:"#22C55E", fontSize:18 }}>Get Started</Text>
      </Link>
    </View>
  );
}
