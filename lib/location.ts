import * as Location from "expo-location";
import api from "./api";

export async function updateLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== "granted") return;

  const loc = await Location.getCurrentPositionAsync({});
  await api.post("/accounts/location/", {
    current_lat: loc.coords.latitude,
    current_lng: loc.coords.longitude,
  });
}
