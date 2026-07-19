import { theme } from "@/constants/theme";

export function useThemeColor(
  _props: {},
  colorName: keyof typeof theme.colors
) {
  return theme.colors[colorName];
}