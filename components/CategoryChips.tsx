import { ScrollView, Pressable, Text, StyleSheet } from "react-native";

import { theme } from "@/constants/theme";
import { CATEGORIES } from "@/constants/categories";
import { CATEGORY_COLORS } from "@/constants/categoryColors";

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
      {CATEGORIES.map((category) => {

        const colours = CATEGORY_COLORS[category.id];

        const isSelected = selected === category.id;

        return (
          <Pressable
            key={category.id}
            onPress={() => onSelect(category.id)}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected
                  ? colours.bg
                  : colours.light,

                borderColor: colours.border,
              },
            ]}
          >

            <Text
              style={[
                styles.text,
                {
                  color: isSelected
                    ? "#FFFFFF"
                    : colours.text,
                },
              ]}
            >
              {category.label}
            </Text>

          </Pressable>
        );

      })}
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

  },


  text: {

    fontSize: 14,

    fontWeight: "700",

  },

});