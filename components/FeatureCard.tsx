import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "@/constants/theme";
import { LucideIcon } from "lucide-react-native";

type Feature = {
  text: string;
  icon: LucideIcon;
};

type FeatureCardProps = {
  title: string;
  features: Feature[];
  icon: LucideIcon;
  accentColor: string;
  onPress: () => void;
};

export default function FeatureCard({
    title,
    features,
    icon,
    accentColor,
    onPress,
}: FeatureCardProps) {
    const MainIcon = icon;

    return (
        <Pressable 
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed,
            ]}
            onPress={onPress}
        >
            <View
                style={[
                    styles.iconContainer,
                    { backgroundColor: accentColor + "22" },
                ]}
            >

                <MainIcon
                size={24}
                color={accentColor}
                strokeWidth={2}
                />
            </View>

            <Text style={styles.title}>{title}</Text>
            {features.map((feature) => {
            const FeatureIcon = feature.icon;

            return (
                <View key={feature.text} style={styles.featureRow}>
                <FeatureIcon
                    size={13}
                    color={theme.colors.mutedForeground}
                    strokeWidth={2}
                />
                <Text style={styles.feature}>{feature.text}</Text>
                </View>
            );
            })}
        </Pressable>
    )
}

const styles = StyleSheet.create({
  container: {
    width: "48%",

    backgroundColor: theme.colors.card,
    borderRadius: 20,

    paddingHorizontal: 16,
    paddingVertical: 18,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    ...theme.shadow.card,
  },

  iconContainer: {
    width: 44,
    height: 44,

    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 14,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: theme.colors.cardForeground,

    marginBottom: 10,
    lineHeight: 20,
  },

  featureRow: {
    flexDirection: "row",
    alignItems: "center",

    marginTop: 5,
  },

  feature: {
    marginLeft: 6,

    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    marginBottom: 3,

    color: theme.colors.mutedForeground,

    flexShrink: 1,
  },

  pressed: {
    opacity: 0.9,
  },
});