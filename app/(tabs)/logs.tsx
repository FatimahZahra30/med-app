import { useFocusEffect, useRouter } from "expo-router";
import { HeartPulse } from "lucide-react-native";
import { useCallback, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { ArrestLog, getArrestLogs } from "@/database/arrestLogs";
import { SafeAreaView } from "react-native-safe-area-context";

import ArrestLogCard from "@/components/logs/ArrestLogCard";

export default function LogsScreen() {
  const [logs, setLogs] = useState<ArrestLog[]>([]);

  const router = useRouter();

  // Reload logs whenever the Logs tab is opened
  useFocusEffect(
    useCallback(() => {
      const savedLogs = getArrestLogs();
      setLogs(savedLogs);
    }, []),
  );

  const handleLogPress = (log: ArrestLog) => {
    router.push(`/arrest-log/${log.id}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Logs</Text>

        <Text style={styles.subtitle}>Previous cardiac arrest sessions</Text>
      </View>

      {/* EMPTY STATE */}
      {logs.length === 0 ? (
        <View style={styles.emptyState}>
          <View style={styles.emptyIcon}>
            <HeartPulse size={28} color="#DC2626" />
          </View>

          <Text style={styles.emptyTitle}>No logs yet</Text>

          <Text style={styles.emptyText}>
            Completed cardiac arrest sessions will appear here.
          </Text>
        </View>
      ) : (
        /* LOG LIST */
        <FlatList
          data={logs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ArrestLogCard log={item} onPress={() => handleLogPress(item)} />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: theme.colors.foreground,
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: theme.colors.mutedForeground,
  },

  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 12,
  },

  emptyState: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 40,
    paddingBottom: 100,
  },

  emptyIcon: {
    width: 64,
    height: 64,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FEF2F2",

    marginBottom: 16,
  },

  emptyTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: theme.colors.foreground,
  },

  emptyText: {
    marginTop: 6,

    fontSize: 14,
    lineHeight: 21,

    textAlign: "center",

    color: theme.colors.mutedForeground,
  },
});
