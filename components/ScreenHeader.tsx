import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;

  gradient?: readonly [string, string];

  iconBackground?: string;

  iconColor?: string;

  showBackButton?: boolean;

  titleSize?: number;
};

export default function ScreenHeader({
  title,
  subtitle,

  gradient = ["#4338CA", "#6366F1"],

  iconBackground = "rgba(255,255,255,0.16)",

  iconColor = "white",

  showBackButton = true,

  titleSize = 22,
}: ScreenHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        <View style={styles.headerRow}>
          {showBackButton ? (
            <Pressable
              onPress={() => router.back()}
              style={[styles.backButton, { backgroundColor: iconBackground }]}
            >
              <ChevronLeft size={22} color={iconColor} strokeWidth={2.5} />
            </Pressable>
          ) : (
            <View style={styles.backButton} />
          )}

          <View style={styles.textContainer}>
            <Text
              style={[styles.title, { fontSize: titleSize }]}
              ellipsizeMode="tail"
            >
              {title}
            </Text>

            {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: theme.spacing.xl,

    borderRadius: 26,

    ...theme.shadow.card,
  },

  container: {
    borderRadius: 26,

    paddingHorizontal: 20,
    paddingVertical: 18,
  },

  headerRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  backButton: {
    width: 44,
    height: 44,

    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },

  iconCircle: {
    width: 44,
    height: 44,

    borderRadius: 14,

    marginLeft: 12,

    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,

    marginLeft: 16,
  },

  title: {
    fontSize: 22,

    fontWeight: "800",

    color: "white",

    letterSpacing: -0.4,
  },

  subtitle: {
    marginTop: 3,

    fontSize: 13,

    lineHeight: 18,

    color: "rgba(255,255,255,0.82)",
  },
});
