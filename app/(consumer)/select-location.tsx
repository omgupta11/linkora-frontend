import { useEffect, useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function SelectLocation() {
  const router = useRouter();
  const [region, setRegion] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);

  useEffect(() => {
    loadCurrentLocation();
  }, []);

  async function loadCurrentLocation() {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") return;

    const loc = await Location.getCurrentPositionAsync({});
    const r = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.05,
      longitudeDelta: 0.05,
    };

    setRegion(r);
    setMarker(r);
  }

  function confirmLocation() {
    router.replace({
      pathname: "/(consumer)/home",
      params: {
        lat: marker.latitude,
        lng: marker.longitude,
      },
    });
  }

  if (!region) return null;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        onPress={(e) => setMarker(e.nativeEvent.coordinate)}
      >
        {marker && <Marker coordinate={marker} />}
      </MapView>

      <Pressable style={styles.btn} onPress={confirmLocation}>
        <Text style={styles.btnText}>Use This Location</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "#22C55E",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 30,
  },
  btnText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
});
