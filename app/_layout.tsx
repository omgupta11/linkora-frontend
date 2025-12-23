import { Stack } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { AuthProvider } from "../context/AuthContext";

function HeaderTitle() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Linkora</Text>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#0B0B0F" },
          headerTintColor: "#FFFFFF",
          headerTitle: () => <HeaderTitle />,
          headerShadowVisible: false,
        }}
      />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logo: {
    width: 26,
    height: 26,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
