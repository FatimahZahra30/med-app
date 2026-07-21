import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { Emergency } from "@/types/emergency";
import { ChevronRight } from "lucide-react-native";

type DrugCardProps = {
  emergency: Emergency;
  onPress?: () => void;
};

export default function DrugCard({ emergency, onPress }: DrugCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {/* Main content */}

      <View style={styles.content}>
        <Text style={styles.name}>{emergency.title}</Text>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>{emergency.category}</Text>
        </View>
      </View>

      <ChevronRight
        size={theme.typography.fontSize.xl}
        color={theme.colors.mutedForeground}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,

    borderRadius: 22,

    borderWidth: 1,

    borderColor: theme.colors.border,

    padding: 18,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: theme.spacing.md,

    ...theme.shadow.card,
  },

  content: {
    flex: 1,

    paddingRight: 12,
  },

  name: {
    fontSize: 18,

    fontWeight: "800",

    color: theme.colors.foreground,
  },

  subtitle: {
    marginTop: 5,

    fontSize: 13,

    lineHeight: 18,

    color: theme.colors.mutedForeground,
  },

  badge: {
    alignSelf: "flex-start",

    marginTop: 10,

    backgroundColor: "#EEF2FF",

    paddingHorizontal: 10,

    paddingVertical: 5,

    borderRadius: 999,
  },

  badgeText: {
    fontSize: 12,

    fontWeight: "700",

    color: theme.colors.primary,

    textTransform: "capitalize",
  },

  right: {
    alignItems: "flex-end",

    justifyContent: "center",
  },

  doseRow: {
    flexDirection: "row",

    alignItems: "baseline",
  },

  amount: {
    fontSize: 30,

    fontWeight: "800",

    color: theme.colors.primary,
  },

  unit: {
    marginLeft: 5,

    fontSize: 16,

    fontWeight: "600",

    color: theme.colors.mutedForeground,
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    marginTop: 10,
  },

  info: {
    fontSize: 13,

    fontWeight: "700",

    color: theme.colors.primary,
  },

  pressed: {
    opacity: 0.85,

    transform: [
      {
        scale: 0.985,
      },
    ],
  },
});
