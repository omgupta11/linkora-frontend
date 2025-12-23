import api from "./api";

export async function getNearbyServices(params: {
  lat: number;
  lng: number;
  radius: number;
  category?: string;
  min_price?: number;
  max_price?: number;
}) {
  const res = await api.get("/services/nearby/", { params });
  return res.data;
}
