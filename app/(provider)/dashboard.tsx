import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import api from "../../lib/api";
import { useAuth } from "../../context/AuthContext";

type Stats = {
  total_services: number;
  total_bookings: number;
  completed_bookings: number;
  total_reviews: number;
  average_rating: number;
};

export default function ProviderDashboard() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  // 🚫 HARD BLOCK: profile incomplete
  const businessName = user?.provider_profile?.business_name;

  useEffect(() => {
    if (!businessName) {
      return;
    }
    fetchStats();
  }, []);

  async function fetchStats() {
    try {
      const res = await api.get("/provider/dashboard/");
      setStats(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  // ⛔ PROFILE NOT COMPLETE
  if (!businessName) {
    return (
      <LinearGradient
        colors={["#0B0B0F", "#0F172A", "#0B0B0F"]}
        style={styles.container}
      >
        <View style={styles.center}>
          <Ionicons name="alert-circle-outline" size={54} color="#EF4444" />
          <Text style={styles.errorTitle}>
            Profile Incomplete
          </Text>
          <Text style={styles.errorText}>
            You must complete your business profile before using the dashboard.
          </Text>

          <Pressable
            onPress={() => {
              logout();
              router.replace("/(auth)/login?role=provider");
            }}
            style={styles.logoutBtn}
          >
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </LinearGradient>
    );
  }

  if (loading || !stats) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#22C55E" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#0B0B0F", "#0F172A", "#0B0B0F"]}
      style={styles.container}
    >
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.name}>{businessName}</Text>

      <View style={styles.grid}>
        <Card label="Services" value={stats.total_services} />
        <Card label="Bookings" value={stats.total_bookings} />
        <Card label="Completed" value={stats.completed_bookings} />
        <Card label="Reviews" value={stats.total_reviews} />
      </View>

      <View style={styles.rating}>
        <Ionicons name="star" size={18} color="#FACC15" />
        <Text style={styles.ratingText}>
          Average Rating:{" "}
          <Text style={styles.ratingValue}>
            {stats.average_rating.toFixed(1)}
          </Text>
        </Text>
      </View>
    </LinearGradient>
  );
}

/* ---------- components ---------- */

function Card({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardLabel}>{label}</Text>
    </View>
  );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  loader: {
    flex: 1,
    backgroundColor: "#0B0B0F",
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    color: "#9CA3AF",
    fontSize: 14,
  },
  name: {
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 30,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
  },
  card: {
    width: "48%",
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 18,
  },
  cardValue: {
    fontSize: 26,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  cardLabel: {
    color: "#9CA3AF",
    marginTop: 6,
  },
  rating: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ratingText: {
    color: "#9CA3AF",
  },
  ratingValue: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  errorTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 16,
  },
  errorText: {
    color: "#9CA3AF",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },
  logoutBtn: {
    marginTop: 30,
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
  },
  logoutText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
