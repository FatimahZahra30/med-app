import { Pressable, StyleSheet, Text, View } from "react-native";
import { Pill } from "lucide-react-native";

import { theme } from "@/constants/theme";
import { Drug } from "@/types/drug";
import { calculateDose } from "@/utils/calculations";

type DrugCardProps = {
  drug: Drug;
  weight: number;
  onPress?: () => void;
};

export default function DrugCard({
  drug,
  weight,
  onPress,
}: DrugCardProps) {
  const result = calculateDose(weight, drug);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.left}>
        <View style={styles.iconContainer}>
          <Pill
            size={20}
            color={theme.colors.primary}
            strokeWidth={2}
          />
        </View>

        <View style={styles.info}>
          <Text style={styles.name}>{drug.name}</Text>

          <Text style={styles.note}>{drug.note}</Text>

          <Text style={styles.range}>{drug.range}</Text>
        </View>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>
          {result.amount}
        </Text>

        <Text style={styles.unit}>
          {result.unit}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,

    borderRadius: theme.radius.lg,

    borderWidth: 1,
    borderColor: theme.colors.border,

    padding: theme.spacing.lg,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: theme.spacing.md,

    ...theme.shadow.card,
  },

  left: {
    flexDirection: "row",
    flex: 1,
  },

  iconContainer: {
    width: 42,
    height: 42,

    borderRadius: 16,

    backgroundColor: theme.colors.secondary,

    justifyContent: "center",
    alignItems: "center",
  },

  info: {
    marginLeft: theme.spacing.md,
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.foreground,
  },

  note: {
    marginTop: 2,
    fontSize: 13,
    color: theme.colors.mutedForeground,
  },

  range: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: theme.colors.primary,
  },

  right: {
    alignItems: "flex-end",
    marginLeft: theme.spacing.md,
  },

  amount: {
    fontSize: 24,
    fontWeight: "700",
    color: theme.colors.primary,
  },

  unit: {
    fontSize: 13,
    color: theme.colors.mutedForeground,
  },

  pressed: {
    opacity: 0.9,
  },
});