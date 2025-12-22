// app/(consumer)/bookings.tsx

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const BOOKINGS = [
  {
    id: "1",
    business: "Glow Salon",
    service: "Haircut & Styling",
    date: "24 Dec 2025",
    price: "₹499",
    status: "Completed",
  },
  {
    id: "2",
    business: "FitZone Gym",
    service: "Monthly Membership",
    date: "20 Dec 2025",
    price: "₹1499",
    status: "Upcoming",
  },
];

export default function Bookings() {
  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <Text style={styles.title}>My Bookings</Text>

      <FlatList
        data={BOOKINGS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => <BookingCard item={item} />}
      />
    </LinearGradient>
  );
}

function BookingCard({ item }: { item: any }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.card, animatedStyle]}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(1.03))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <View style={styles.row}>
          <View>
            <Text style={styles.business}>{item.business}</Text>
            <Text style={styles.service}>{item.service}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>

          <View style={styles.right}>
            <Text style={styles.price}>{item.price}</Text>
            <View
              style={[
                styles.badge,
                item.status === "Completed"
                  ? styles.done
                  : styles.upcoming,
              ]}
            >
              <Text style={styles.badgeText}>{item.status}</Text>
            </View>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  business: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  service: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
  },
  right: {
    alignItems: "flex-end",
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: "#22C55E",
  },
  badge: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  done: {
    backgroundColor: "#14532D",
  },
  upcoming: {
    backgroundColor: "#1E3A8A",
  },
  badgeText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
});
