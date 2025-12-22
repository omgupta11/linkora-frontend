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

export default function ProviderBookingDetail() {
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
        <Text style={styles.title}>Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <Animated.View entering={FadeInUp} style={styles.card}>
        <Text style={styles.user}>Customer: Om Gupta</Text>
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
          <Text style={styles.label}>Amount</Text>
          <Text style={styles.amount}>₹499</Text>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.complete}>
            <Text style={styles.actionText}>Mark Completed</Text>
          </Pressable>

          <Pressable style={styles.cancel}>
            <Text style={styles.cancelText}>Cancel</Text>
          </Pressable>
        </View>
      </Animated.View>
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
  user: { fontSize: 18, fontWeight: "600", color: "#FFF" },
  service: { fontSize: 14, color: "#9CA3AF" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  label: { color: "#9CA3AF", fontSize: 14 },
  value: { color: "#FFF", fontSize: 14 },
  amount: { color: "#22C55E", fontWeight: "700" },
  actions: { gap: 12, marginTop: 14 },
  complete: {
    backgroundColor: "#22C55E",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  cancel: {
    borderWidth: 1,
    borderColor: "#374151",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  actionText: { color: "#000", fontWeight: "600" },
  cancelText: { color: "#EF4444", fontWeight: "600" },
});
