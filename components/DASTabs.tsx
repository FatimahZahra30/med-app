import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { theme } from "@/constants/theme";

type Plan = "A" | "B" | "C" | "D";

type Props = {
  selected: Plan;
  onSelect: (plan: Plan) => void;
};

const PLANS: Plan[] = ["A", "B", "C", "D"];

export default function DASTabs({
  selected,
  onSelect,
}: Props) {
  return (
    <View style={styles.container}>
      {PLANS.map((plan) => {
        const active = selected === plan;

        return (
          <Pressable
            key={plan}
            onPress={() => onSelect(plan)}
            style={[
              styles.tab,
              active && styles.activeTab,
            ]}
          >
            <Text
              style={[
                styles.text,
                active && styles.activeText,
              ]}
            >
              {plan}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",

    backgroundColor: "#F8FAFC",

    borderRadius: 18,

    padding: 6,

    marginVertical: 16,

    gap: 6,
  },

  tab: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingVertical: 12,

    borderRadius: 14,
  },

  activeTab: {
    backgroundColor: "#06a271",

    ...theme.shadow.card,
  },

  text: {
    fontSize: 14,

    fontWeight: "700",

    color: "#64748B",
  },

  activeText: {
    color: "#FFFFFF",
  },
});