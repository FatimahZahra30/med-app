import { ChevronRight, Clock, HeartPulse } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { ArrestLog } from "@/database/arrestLogs";

type Props = {
  log: ArrestLog;
  onPress: () => void;
};

export default function ArrestLogCard({ log, onPress }: Props) {
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds,
    ).padStart(2, "0")}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("en-MY", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString("en-MY", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      {/* ICON */}
      <View style={styles.iconContainer}>
        <HeartPulse size={22} color="#DC2626" />
      </View>

      {/* BASIC LOG INFORMATION */}
      <View style={styles.content}>
        <Text style={styles.title}>Cardiac Arrest</Text>

        <Text style={styles.date}>
          {formatDate(log.completedAt)} · {formatTime(log.completedAt)}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Clock size={14} color={theme.colors.mutedForeground} />

            <Text style={styles.metaText}>{formatDuration(log.duration)}</Text>
          </View>

          <Text style={styles.metaText}>
            {log.events.length} {log.events.length === 1 ? "event" : "events"}
          </Text>
        </View>
      </View>

      {/* CHEVRON */}
      <ChevronRight size={20} color={theme.colors.mutedForeground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",

    backgroundColor: theme.colors.card,

    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 18,

    padding: 16,

    ...theme.shadow.card,
  },

  cardPressed: {
    opacity: 0.7,
  },

  iconContainer: {
    width: 46,
    height: 46,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FEF2F2",

    marginRight: 12,
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "800",
    color: theme.colors.foreground,
    marginBottom: 5,
  },

  date: {
    marginTop: 3,

    fontSize: 13,
    color: theme.colors.mutedForeground,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",

    gap: 14,

    marginTop: 8,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",

    gap: 5,
  },

  metaText: {
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.mutedForeground,
  },
});
