import { ChevronDown, ChevronUp } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

type Props = {
  title: string;
  description: string;
  expanded: boolean;
  onPress: () => void;
};

export default function ReversibleDropdown({
  title,
  description,
  expanded,
  onPress,
}: Props) {
  return (
    <View style={styles.dropdown}>
      <Pressable style={styles.header} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>

        {expanded ? (
          <ChevronUp size={20} color={theme.colors.mutedForeground} />
        ) : (
          <ChevronDown size={20} color={theme.colors.mutedForeground} />
        )}
      </Pressable>

      {expanded && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: theme.colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#dedae1",
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
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#7d51a0",
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
