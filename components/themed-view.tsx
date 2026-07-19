import { View, type ViewProps } from "react-native";

import { theme } from "@/constants/theme";

export type ThemedViewProps = ViewProps & {
  color?: keyof typeof theme.colors;
};

export function ThemedView({
  style,
  color = "background",
  ...otherProps
}: ThemedViewProps) {
  return (
    <View
      style={[
        {
          backgroundColor: theme.colors[color],
        },
        style,
      ]}
      {...otherProps}
    />
  );
}