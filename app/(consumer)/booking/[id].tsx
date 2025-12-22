import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function ConsumerBookingDetail() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </Pressable>
        <Text style={styles.title}>Booking Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <Animated.View entering={FadeInUp} style={styles.card}>
        <Text style={styles.business}>Glow Salon</Text>
        <Text style={styles.service}>Haircut & Styling</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>24 Dec 2025</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Time</Text>
          <Text style={styles.value}>10:30 AM</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Amount Paid</Text>
          <Text style={styles.amount}>₹499</Text>
        </View>

        <View style={styles.status}>
          <Text style={styles.statusText}>Confirmed</Text>
        </View>
      </Animated.View>

      <Pressable style={styles.support}>
        <Text style={styles.supportText}>Contact Support</Text>
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: { fontSize: 22, fontWeight: "700", color: "#FFF" },
  card: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 20,
    gap: 12,
  },
  business: { fontSize: 20, fontWeight: "700", color: "#FFF" },
  service: { fontSize: 14, color: "#9CA3AF" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "#9CA3AF", fontSize: 14 },
  value: { color: "#FFF", fontSize: 14 },
  amount: { color: "#22C55E", fontWeight: "700" },
  status: {
    marginTop: 14,
    backgroundColor: "#14532D",
    paddingVertical: 8,
    borderRadius: 14,
    alignItems: "center",
  },
  statusText: { color: "#FFF", fontWeight: "600" },
  support: {
    marginTop: "auto",
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  supportText: { color: "#22C55E", fontWeight: "600" },
});
