import { StyleSheet, TextInput, View } from "react-native";
import { Search } from "lucide-react-native";

import { theme } from "@/constants/theme";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function SearchBar({
  value,
  onChangeText,
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <Search
        size={18}
        color={theme.colors.mutedForeground}
      />

      <TextInput
        style={styles.input}
        placeholder="Search drugs..."
        placeholderTextColor={theme.colors.mutedForeground}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,

    borderRadius: theme.radius.lg,

    borderWidth: 1,
    borderColor: theme.colors.border,

    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,

    flexDirection: "row",
    alignItems: "center",

    marginBottom: theme.spacing.md,
  },

  input: {
    flex: 1,

    marginLeft: theme.spacing.sm,

    fontSize: 16,

    color: theme.colors.foreground,
  },
});