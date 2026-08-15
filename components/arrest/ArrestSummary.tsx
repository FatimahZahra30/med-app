import { theme } from "@/constants/theme";
import { ArrestEvent } from "@/types/cardiacArrest";
import { Clock, FileText, HeartPulse, Syringe, Zap } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  events: ArrestEvent[];
  duration: number;
  onSave: () => void;
  onDiscard: () => void;
};

// chatGPT created the whole arrest summary card
function formatTime(secs: number) {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

function formatDate(timestamp: string) {
  return new Date(timestamp).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatClockTime(timestamp: string) {
  return new Date(timestamp).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ArrestSummaryCard({
  events,
  duration,
  onSave,
  onDiscard,
}: Props) {
  const shockCount = events.filter((event) => event.type === "shock").length;

  const adrenalineCount = events.filter(
    (event) => event.type === "adrenaline",
  ).length;

  const rhythmCount = events.filter((event) => event.type === "rhythm").length;

  const roscAchieved = events.some((event) => event.type === "rosc");

  const startEvent = events.find((event) => event.type === "start");

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.headerIcon}>
          <FileText size={24} color="#35407c" />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>Arrest Summary</Text>

          {startEvent && (
            <Text style={styles.date}>
              {formatDate(startEvent.timestamp)} ·{" "}
              {formatClockTime(startEvent.timestamp)}
            </Text>
          )}
        </View>
      </View>

      {/* OUTCOME */}
      <View style={styles.outcomeCard}>
        <View style={styles.outcomeDot} />

        <View>
          <Text style={styles.outcomeLabel}>OUTCOME</Text>

          <Text style={styles.outcomeText}>
            {roscAchieved ? "ROSC achieved" : "Algorithm completed"}
          </Text>
        </View>
      </View>

      {/* STATISTICS */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Clock size={20} color="#64748B" />

          <Text style={styles.statValue}>{formatTime(duration)}</Text>

          <Text style={styles.statLabel}>Duration</Text>
        </View>

        <View style={styles.statCard}>
          <Zap size={20} color="#DC2626" />

          <Text style={styles.statValue}>{shockCount}</Text>

          <Text style={styles.statLabel}>Shocks</Text>
        </View>

        <View style={styles.statCard}>
          <Syringe size={20} color="#D97706" />

          <Text style={styles.statValue}>{adrenalineCount}</Text>

          <Text style={styles.statLabel}>Adrenaline</Text>
        </View>

        <View style={styles.statCard}>
          <HeartPulse size={20} color="#7C3AED" />

          <Text style={styles.statValue}>{rhythmCount}</Text>

          <Text style={styles.statLabel}>Rhythm Checks</Text>
        </View>
      </View>

      {/* TIMELINE */}
      <View style={styles.timelineSection}>
        <Text style={styles.sectionTitle}>Event Timeline</Text>

        <View style={styles.timeline}>
          {events.map((event, index) => (
            <View key={event.id} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <Text style={styles.elapsed}>
                  {formatTime(event.elapsedTime)}
                </Text>

                {index < events.length - 1 && (
                  <View style={styles.timelineLine} />
                )}
              </View>

              <View style={styles.eventDot} />

              <View style={styles.eventContent}>
                <Text style={styles.eventDescription}>{event.description}</Text>

                <Text style={styles.eventTime}>
                  {formatClockTime(event.timestamp)}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    paddingBottom: 5,
    marginTop: theme.spacing.lg,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#e3e2f5",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 23,
    fontWeight: "800",
    color: "#0F172A",
  },

  date: {
    marginTop: 4,
    fontSize: 13,
    color: "#64748B",
  },

  outcomeCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F0FDF4",
    borderWidth: 1,
    borderColor: "#BBF7D0",
    borderRadius: 16,
    padding: 15,
    marginBottom: 16,
  },

  outcomeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#16A34A",
    marginRight: 12,
  },

  outcomeLabel: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1,
    color: "#15803D",
  },

  outcomeText: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: "700",
    color: "#166534",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 24,
  },

  statCard: {
    width: "48%",
    minHeight: 100,
    borderRadius: 16,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
  },

  statValue: {
    marginTop: 8,
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
  },

  statLabel: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "600",
    color: "#64748B",
  },

  timelineSection: {
    marginTop: 2,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 16,
  },

  timeline: {
    paddingBottom: 4,
  },

  timelineItem: {
    flexDirection: "row",
    minHeight: 58,
  },

  timelineLeft: {
    width: 50,
    alignItems: "flex-end",
  },

  elapsed: {
    fontSize: 12,
    fontWeight: "800",
    color: "#DC2626",
    fontVariant: ["tabular-nums"],
  },

  timelineLine: {
    width: 1,
    flex: 1,
    backgroundColor: "#E2E8F0",
    marginTop: 6,
    marginRight: 4,
  },

  eventDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#DC2626",
    marginLeft: 10,
    marginTop: 3,
  },

  eventContent: {
    flex: 1,
    marginLeft: 12,
    paddingBottom: 16,
  },

  eventDescription: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    lineHeight: 19,
  },

  eventTime: {
    marginTop: 3,
    fontSize: 11,
    color: "#94A3B8",
  },

  actions: {
    marginTop: 20,
    gap: 10,
  },

  saveButton: {
    minHeight: 50,
    borderRadius: 14,
    backgroundColor: "#DC2626",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  discardButton: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  discardButtonText: {
    color: "#64748B",
    fontSize: 15,
    fontWeight: "700",
  },
});
