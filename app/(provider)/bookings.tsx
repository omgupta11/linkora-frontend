// app/(provider)/bookings.tsx

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

const BOOKINGS = [
  {
    id: "1",
    user: "Om Gupta",
    service: "Haircut & Styling",
    time: "10:30 AM",
    status: "Upcoming",
  },
  {
    id: "2",
    user: "Aman Verma",
    service: "Facial & Cleanup",
    time: "01:00 PM",
    status: "Completed",
  },
];

export default function ProviderBookings() {
  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <Text style={styles.title}>Bookings</Text>

      <FlatList
        data={BOOKINGS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BookingCard item={item} index={index} />
        )}
      />
    </LinearGradient>
  );
}

function BookingCard({ item, index }: { item: any; index: number }) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInUp.delay(index * 80)}
      style={[styles.card, animatedStyle]}
    >
      <Pressable
        onPressIn={() => (scale.value = withSpring(1.03))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <View style={styles.row}>
          <View>
            <Text style={styles.user}>{item.user}</Text>
            <Text style={styles.service}>{item.service}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>

          <View
            style={[
              styles.status,
              item.status === "Completed"
                ? styles.done
                : styles.upcoming,
            ]}
          >
            <Text style={styles.statusText}>{item.status}</Text>
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
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  user: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  service: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 6,
  },
  status: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  done: {
    backgroundColor: "#14532D",
  },
  upcoming: {
    backgroundColor: "#1E3A8A",
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
});
