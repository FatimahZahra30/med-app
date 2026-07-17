export const theme = {
  colors: {
    background: "#F8FAFC",
    foreground: "#0F172A",

    card: "#FFFFFF",
    cardForeground: "#0F172A",

    primary: "#4F46E5",
    primaryForeground: "#FFFFFF",

    secondary: "#EEF2FF",
    secondaryForeground: "#4F46E5",

    muted: "#F1F5F9",
    mutedForeground: "#64748B",

    accent: "#4F46E5",
    accentForeground: "#FFFFFF",

    destructive: "#DC2626",
    destructiveForeground: "#FFFFFF",

    border: "rgba(15, 23, 42, 0.08)",

    inputBackground: "#FFFFFF",
    switchBackground: "#CBD5E1",

    success: "#10B981",
    warning: "#F59E0B",
    info: "#0EA5E9",
  },

  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      title: 30,
    },

    fontWeight: {
      normal: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 56,
  },

  radius: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
    pill: 999,
  },

  shadow: {
    card: {
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: {
        width: 0,
        height: 4,
      },
      elevation: 3,
    },
  },
};