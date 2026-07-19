import { Text, type TextProps, StyleSheet } from "react-native";

import { theme } from "@/constants/theme";

export type ThemedTextProps = TextProps & {
  color?: keyof typeof theme.colors;
  type?:
    | "default"
    | "title"
    | "defaultSemiBold"
    | "subtitle"
    | "link";
};

export function ThemedText({
  style,
  color = "foreground",
  type = "default",
  ...rest
}: ThemedTextProps) {
  return (
    <Text
      style={[
        { color: theme.colors[color] },
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },

  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },

  title: {
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "700",
  },

  subtitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
  },

  link: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.primary,
  },
});