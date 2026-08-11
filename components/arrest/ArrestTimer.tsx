import { Pressable, StyleSheet, Text, View } from "react-native";

import { Clock, Pause, Play } from "lucide-react-native";

import { theme } from "@/constants/theme";

type Props = {
  elapsed: number;
  started: boolean;
  running: boolean;
  onToggle: () => void;
};

export default function ArrestTimer({
  elapsed,
  started,
  running,
  onToggle,
}: Props) {
  // Convert seconds into MM:SS format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={[styles.container, running && styles.activeContainer]}>
      <View style={[styles.iconBox, running && styles.activeIcon]}>
        <Clock size={20} color={running ? "#FFFFFF" : "#64748B"} />
      </View>

      <View style={styles.content}>
        <Text style={styles.label}>TOTAL ARREST TIME</Text>

        <Text style={[styles.time, running && styles.activeTime]}>
          {formatTime(elapsed)}
        </Text>
      </View>

      {started && (
        <Pressable onPress={onToggle} style={styles.controlButton}>
          {running ? (
            <Pause size={18} color="#DC2626" />
          ) : (
            <Play size={18} color="#DC2626" />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    padding: 16,

    marginTop: -20,

    borderRadius: 20,

    backgroundColor: theme.colors.card,

    borderWidth: 1,

    borderColor: theme.colors.border,

    gap: 14,
  },

  activeContainer: {
    backgroundColor: "#FEF2F2",

    borderColor: "#FECACA",
  },

  iconBox: {
    width: 44,
    height: 44,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#E2E8F0",
  },

  activeIcon: {
    backgroundColor: "#EF4444",
  },

  content: {
    flex: 1,
  },

  label: {
    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 1,

    color: theme.colors.mutedForeground,
  },

  time: {
    marginTop: 4,

    fontSize: 32,

    fontWeight: "800",

    color: "#334155",
  },

  activeTime: {
    color: "#DC2626",
  },

  controlButton: {
    width: 38,

    height: 38,

    borderRadius: 12,

    alignItems: "center",

    justifyContent: "center",

    backgroundColor: "#FFFFFF",

    borderWidth: 1,

    borderColor: "#FECACA",
  },
});
