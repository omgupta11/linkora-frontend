import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { getAuth } from "./auth";

export default function RequireAuth({
  children,
  role,
}: {
  children: React.ReactNode;
  role: "consumer" | "provider";
}) {
  const router = useRouter();
  const [ok, setOk] = useState(false);

  useEffect(() => {
    (async () => {
      const { token, role: savedRole } = await getAuth();

      if (!token || savedRole !== role) {
        router.replace("/");
      } else {
        setOk(true);
      }
    })();
  }, []);

  if (!ok) {
    return (
      <View style={{ flex:1, justifyContent:"center", alignItems:"center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <>{children}</>;
}
