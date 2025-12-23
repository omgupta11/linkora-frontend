import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../context/AuthContext";

export default function ProviderLayout() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  if (user.role !== "provider") {
    return <Redirect href="/" />;
  }

  return <Stack />;
}
