import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

type HeaderCardProps = {
  title: string;
  subtitle: string;
};

export default function HeaderCard({
  title,
  subtitle,
}: HeaderCardProps) {
  const now = new Date();

  const date = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  })
    .format(now)
    .replace(",", "");

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);

  return (
    <View style={styles.shadowContainer}>
    <LinearGradient
      colors={["#4F46E5", "#6366F1"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons
            name="medical-bag"
            size={24}
            color="white"
          />
        </View>

        <View style={styles.dateContainer}>
          <Text style={styles.time}>{time}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
    shadowContainer: {
    borderRadius: 24,
    marginBottom: theme.spacing.lg,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.18,
    shadowRadius: 16,

    elevation: 8,
  },

  gradient: {
    borderRadius: 24,
    padding: theme.spacing.lg,
  },
  
  container: {
    borderRadius: 24,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.sm,
    ...theme.shadow.card,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: theme.spacing.md,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },

  dateContainer: {
    alignItems: "flex-end",
  },

  time: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  date: {
    marginTop: 4,
    fontSize: 12,
    color: "rgba(255,255,255,0.75)",
  },

  title: {
    fontSize: 21,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "rgba(255,255,255,0.82)",
  },
});