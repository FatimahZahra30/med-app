import { useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

export default function ArrestLogDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Arrest Log</Text>

      <Text style={styles.id}>Log ID: {id}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.foreground,
  },

  id: {
    marginTop: 12,
    fontSize: 14,
    color: theme.colors.mutedForeground,
  },
});
