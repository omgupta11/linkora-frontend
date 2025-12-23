import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import Slider from "@react-native-community/slider";
import { getNearbyServices } from "../../lib/services";

const CATEGORIES = ["All", "Salon", "Gym", "Spa"];

export default function ConsumerHome() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [services, setServices] = useState<any[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  const [radius, setRadius] = useState(5);
  const [category, setCategory] = useState<string>("All");
  const [maxPrice, setMaxPrice] = useState(5000);

  // set location (map override OR current GPS)
  useEffect(() => {
    if (params.lat && params.lng) {
      setCoords({
        lat: Number(params.lat),
        lng: Number(params.lng),
      });
    } else {
      getCurrentLocation();
    }
  }, [params]);

  // fetch services on filter change
  useEffect(() => {
    if (coords) fetchServices();
  }, [coords, radius, category, maxPrice]);

  async function getCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    setCoords({
      lat: loc.coords.latitude,
      lng: loc.coords.longitude,
    });
  }

  async function fetchServices() {
    const data = await getNearbyServices({
      lat: coords!.lat,
      lng: coords!.lng,
      radius,
      category: category === "All" ? undefined : category,
      min_price: 0,
      max_price: maxPrice,
    });
    setServices(data);
  }

  return (
    <LinearGradient
      colors={["#0B0B0F", "#0F172A", "#0B0B0F"]}
      style={styles.container}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Nearby Services</Text>
        <Pressable onPress={() => router.push("/(consumer)/select-location")}>
          <Ionicons name="location-outline" size={22} color="#22C55E" />
        </Pressable>
      </View>

      {/* RADIUS */}
      <Text style={styles.label}>Radius: {radius} km</Text>
      <Slider
        minimumValue={1}
        maximumValue={20}
        step={1}
        value={radius}
        onValueChange={setRadius}
        minimumTrackTintColor="#22C55E"
        maximumTrackTintColor="#374151"
      />

      {/* CATEGORY */}
      <View style={styles.row}>
        {CATEGORIES.map((c) => (
          <Pressable
            key={c}
            onPress={() => setCategory(c)}
            style={[
              styles.chip,
              category === c && styles.chipActive,
            ]}
          >
            <Text
              style={[
                styles.chipText,
                category === c && styles.chipTextActive,
              ]}
            >
              {c}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* PRICE */}
      <Text style={styles.label}>Max Price: ₹{maxPrice}</Text>
      <Slider
        minimumValue={500}
        maximumValue={10000}
        step={500}
        value={maxPrice}
        onValueChange={setMaxPrice}
        minimumTrackTintColor="#22C55E"
        maximumTrackTintColor="#374151"
      />

      {/* LIST */}
      <FlatList
        data={services}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.category}>{item.category}</Text>
            <Text style={styles.price}>₹ {item.price}</Text>
          </View>
        )}
      />
    </LinearGradient>
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
    marginBottom: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
  },
  label: {
    color: "#9CA3AF",
    marginTop: 14,
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 10,
    flexWrap: "wrap",
  },
  chip: {
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipActive: {
    backgroundColor: "#22C55E",
    borderColor: "#22C55E",
  },
  chipText: {
    color: "#9CA3AF",
    fontSize: 13,
  },
  chipTextActive: {
    color: "#000",
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
  },
  name: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  category: {
    fontSize: 13,
    color: "#9CA3AF",
    marginTop: 4,
  },
  price: {
    color: "#22C55E",
    marginTop: 8,
    fontWeight: "600",
  },
});
