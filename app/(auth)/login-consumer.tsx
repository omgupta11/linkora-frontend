import { View, Text, StyleSheet } from "react-native";

export default function LoginConsumer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>LOGIN CONSUMER SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0B0B0F",
  },
  text: {
    color: "red",
    fontSize: 22,
    fontWeight: "600",
  },
});
