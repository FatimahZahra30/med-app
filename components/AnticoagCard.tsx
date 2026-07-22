import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ChevronRight } from "lucide-react-native";

import { theme } from "@/constants/theme";
import { Anticoagulant } from "@/types/anticoagulant";

type Props = {
  drug: Anticoagulant;
  onPress: () => void;
};

export default function AnticoagCard({
  drug,
  onPress,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
      ]}
      onPress={onPress}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>
          {drug.name}
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.info}>
            Info
          </Text>

          <ChevronRight
            size={16}
            color="#D97706"
          />
        </View>
      </View>

      {/* Withhold */}
      <View style={styles.redBubble}>
        <Text style={styles.labelRed}>
          WITHHOLD
        </Text>

        <Text style={styles.value}>
          {drug.hold}
        </Text>
      </View>

      {/* Restart */}
      <View style={styles.greenBubble}>
        <Text style={styles.labelGreen}>
          RESTART AFTER
        </Text>

        <Text style={styles.value}>
          {drug.restart}
        </Text>
      </View>

      {/* Note */}
      {drug.note && (
        <Text style={styles.note}>
          {drug.note}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,

    borderRadius: 22,

    padding: 18,

    marginBottom: 14,

    borderWidth: 1,

    borderColor: theme.colors.border,

    ...theme.shadow.card,
  },

  cardPressed: {
    opacity: 0.92,

    transform: [{ scale: 0.99 }],
  },

  header: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    marginBottom: 16,
  },

  name: {
    flex: 1,

    fontSize: 18,

    fontWeight: "800",

    color: theme.colors.foreground,

    marginRight: 12,
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  info: {
    fontSize: 14,

    fontWeight: "700",

    color: "#D97706",

    marginRight: 2,
  },

  redBubble: {
    backgroundColor: "#FEF2F2",

    borderRadius: 14,

    borderWidth: 1,

    borderColor: "#FECACA",

    paddingHorizontal: 14,

    paddingVertical: 12,

    marginBottom: 10,
  },

  greenBubble: {
    backgroundColor: "#ECFDF5",

    borderRadius: 14,

    borderWidth: 1,

    borderColor: "#A7F3D0",

    paddingHorizontal: 14,

    paddingVertical: 12,
  },

  labelRed: {
    fontSize: 11,

    fontWeight: "800",

    color: "#DC2626",

    letterSpacing: 0.8,

    marginBottom: 4,
  },

  labelGreen: {
    fontSize: 11,

    fontWeight: "800",

    color: "#059669",

    letterSpacing: 0.8,

    marginBottom: 4,
  },

  value: {
    fontSize: 15,

    fontWeight: "600",

    color: theme.colors.foreground,
  },

  note: {
    marginTop: 14,

    fontSize: 14,

    lineHeight: 21,

    color: theme.colors.mutedForeground,
  },
});