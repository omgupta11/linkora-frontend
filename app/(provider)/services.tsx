// app/(provider)/services.tsx

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

const SERVICES = [
  { id: "1", name: "Haircut & Styling", price: "₹499", active: true },
  { id: "2", name: "Facial & Cleanup", price: "₹799", active: true },
  { id: "3", name: "Bridal Package", price: "₹4999", active: false },
];

export default function ProviderServices() {
  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>My Services</Text>

        <Pressable style={styles.addBtn}>
          <Ionicons name="add" size={22} color="#000" />
        </Pressable>
      </View>

      <FlatList
        data={SERVICES}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => <ServiceCard item={item} />}
      />
    </LinearGradient>
  );
}

function ServiceCard({ item }: { item: any }) {
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
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>{item.price}</Text>
          </View>

          <View style={styles.right}>
            <View
              style={[
                styles.status,
                item.active ? styles.active : styles.inactive,
              ]}
            >
              <Text style={styles.statusText}>
                {item.active ? "Active" : "Hidden"}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={18}
              color="#9CA3AF"
            />
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  addBtn: {
    backgroundColor: "#22C55E",
    borderRadius: 14,
    padding: 10,
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  price: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  active: {
    backgroundColor: "#14532D",
  },
  inactive: {
    backgroundColor: "#374151",
  },
  statusText: {
    fontSize: 12,
    color: "#FFFFFF",
  },
});
