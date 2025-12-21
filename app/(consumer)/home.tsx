import { View, Text } from "react-native";

export default function ConsumerHome() {
  return (
    <View style={{ flex:1, justifyContent:"center", alignItems:"center", backgroundColor:"#0B0B0F" }}>
      <Text style={{ color:"#fff", fontSize:24 }}>Consumer Home (JWT OK)</Text>
    </View>
  );
}
