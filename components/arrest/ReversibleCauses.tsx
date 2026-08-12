import { ChevronDown, ChevronUp } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  title: string;
  description: string;
};

export default function ReversibleDropdown({ title, description }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* DROPDOWN HEADER */}
      <Pressable style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.title}>{title}</Text>

        {expanded ? (
          <ChevronUp size={20} color={theme.colors.mutedForeground} />
        ) : (
          <ChevronDown size={20} color={theme.colors.mutedForeground} />
        )}
      </Pressable>

      {/* DESCRIPTION */}
      {expanded && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: "hidden",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.foreground,
  },

  descriptionContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: theme.colors.mutedForeground,
  },
});
