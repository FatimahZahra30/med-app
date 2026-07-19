import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ChevronLeft, LucideIcon } from "lucide-react-native";
import { router } from "expo-router";

import { theme } from "@/constants/theme";

type ScreenHeaderProps = {
  title: string;
  subtitle: string;
};

export default function ScreenHeader({
  title,
  subtitle,
}: ScreenHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <LinearGradient
        colors={["#4338CA", "#6366F1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.container}
      >
        {/* Header Row */}
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft
              size={22}
              color="white"
              strokeWidth={2.5}
            />
          </Pressable>

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              {title}
            </Text>

            <Text style={styles.subtitle}>
              {subtitle}
            </Text>
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

    backgroundColor: "rgba(255,255,255,0.16)",

    justifyContent: "center",
    alignItems: "center",
  },

  iconCircle: {
    width: 44,
    height: 44,

    borderRadius: 14,

    marginLeft: 10,

    backgroundColor: "rgba(255,255,255,0.16)",

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

    color: "rgba(255,255,255,0.80)",

    lineHeight: 18,
  },
});