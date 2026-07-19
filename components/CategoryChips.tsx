import { ScrollView, Pressable, Text, StyleSheet } from "react-native";

import { theme } from "@/constants/theme";
import { CATEGORIES } from "@/constants/categories";

type CategoryChipsProps = {
  selected: string;
  onSelect: (category: string) => void;
};

export default function CategoryChips({
  selected,
  onSelect,
}: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {CATEGORIES.map((category) => (
        <Pressable
          key={category.id}
          onPress={() => onSelect(category.id)}
          style={[
            styles.chip,
            selected === category.id && styles.selectedChip,
          ]}
        >
          <Text
            style={[
              styles.text,
              selected === category.id && styles.selectedText,
            ]}
          >
            {category.label}
          </Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing.md,
    gap: theme.spacing.sm,
  },

  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,

    borderRadius: 999,

    borderWidth: 1,
    borderColor: theme.colors.border,

    backgroundColor: theme.colors.card,
  },

  selectedChip: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },

  text: {
    fontSize: 14,
    fontWeight: "600",

    color: theme.colors.foreground,
  },

  selectedText: {
    color: "#FFFFFF",
  },
});