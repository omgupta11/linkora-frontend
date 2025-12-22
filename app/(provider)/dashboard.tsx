import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function ProviderDashboard() {
  return (
    <LinearGradient
      colors={["#0B0B0F", "#12121A", "#0B0B0F"]}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Welcome back</Text>
            <Text style={styles.businessName}>Your Business</Text>
          </View>

          <Ionicons name="settings-outline" size={22} color="#9CA3AF" />
        </View>

        {/* STATS */}
        <View style={styles.statsRow}>
          <StatCard title="Views" value="1.2k" icon="eye-outline" />
          <StatCard title="Bookings" value="86" icon="calendar-outline" />
        </View>

        <View style={styles.statsRow}>
          <StatCard title="Rating" value="4.8" icon="star-outline" />
          <StatCard title="Services" value="12" icon="briefcase-outline" />
        </View>

        {/* ACTIONS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>

          <ActionCard
            icon="add-circle-outline"
            title="Add / Edit Services"
            subtitle="Manage what you offer"
          />

          <ActionCard
            icon="image-outline"
            title="Manage Business Images"
            subtitle="Upload gallery & cover"
          />

          <ActionCard
            icon="location-outline"
            title="Business Location"
            subtitle="Update map & address"
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

/* ---------- STAT CARD ---------- */
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: any;
}) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={22} color="#22C55E" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

/* ---------- ACTION CARD ---------- */
function ActionCard({
  icon,
  title,
  subtitle,
}: {
  icon: any;
  title: string;
  subtitle: string;
}) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.actionCard, animatedStyle]}>
      <Pressable
        onPressIn={() => (scale.value = withSpring(1.04))}
        onPressOut={() => (scale.value = withSpring(1))}
      >
        <View style={styles.actionRow}>
          <Ionicons name={icon} size={22} color="#22C55E" />
          <View>
            <Text style={styles.actionTitle}>{title}</Text>
            <Text style={styles.actionSubtitle}>{subtitle}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

/* ---------- STYLES ---------- */
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
    marginBottom: 30,
  },
  welcome: {
    fontSize: 14,
    color: "#9CA3AF",
  },
  businessName: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
  },
  statsRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 6,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  statTitle: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  section: {
    marginTop: 30,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#E5E7EB",
  },
  actionCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
  },
  actionRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  actionSubtitle: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
