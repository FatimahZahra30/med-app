import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  CheckSquare,
  Square,
  ChevronRight,
  RotateCcw,
  HeartPulse,
} from "lucide-react-native";

import { theme } from "@/constants/theme";
import { ArrestNode } from "@/types/cardiacArrest";

type Props = {
  node: ArrestNode;
  checkedSteps: string[];
  onToggleStep: (step: string) => void;
  onYes: () => void;
  onNo: () => void;
  onReset: () => void;
};

const RED = {
  primary: "#DC2626",
  light: "#FEF2F2",
  border: "#FECACA",
};

export default function ArrestCard({
  node,
  checkedSteps,
  onToggleStep,
  onYes,
  onNo,
  onReset,
}: Props) {
  return (
    <>
      <View style={styles.card}>
        <View
          style={[
            styles.header,
            {
              backgroundColor: RED.light,
              borderColor: RED.border,
            },
          ]}
        >
          <View style={styles.headerRow}>
            <HeartPulse
              size={22}
              color={RED.primary}
            />

            <Text style={styles.title}>
              {node.title}
            </Text>
          </View>
        </View>

        <Text style={styles.progress}>
          {checkedSteps.length} / {node.steps.length} completed
        </Text>

        <View style={styles.section}>
          {node.steps.map((step) => {
            const checked =
              checkedSteps.includes(step);

            return (
              <Pressable
                key={step}
                style={styles.stepRow}
                onPress={() =>
                  onToggleStep(step)
                }
              >
                {checked ? (
                  <CheckSquare
                    size={22}
                    color={RED.primary}
                  />
                ) : (
                  <Square
                    size={22}
                    color="#94A3B8"
                  />
                )}

                <Text
                  style={[
                    styles.stepText,
                    checked &&
                      styles.completedStep,
                  ]}
                >
                  {step}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.buttonRow}>
          {node.noLabel && (
            <Pressable
              style={styles.secondaryButton}
              onPress={onNo}
            >
              <Text
                style={
                  styles.secondaryButtonText
                }
              >
                {node.noLabel}
              </Text>
            </Pressable>
          )}

          {node.yesLabel && (
            <Pressable
              style={styles.primaryButton}
              onPress={onYes}
            >
              <Text
                style={
                  styles.primaryButtonText
                }
              >
                {node.yesLabel}
              </Text>

              <ChevronRight
                size={18}
                color="white"
              />
            </Pressable>
          )}
        </View>
      </View>

      <Pressable
        style={styles.resetButton}
        onPress={onReset}
      >
        <RotateCcw
          size={18}
          color={
            theme.colors.mutedForeground
          }
        />

        <Text style={styles.resetText}>
          Restart Algorithm
        </Text>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow.card,
  },

  header: {
    borderRadius: 18,
    borderWidth: 1,
    padding: 18,
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  title: {
    flex: 1,
    fontSize: 23,
    fontWeight: "800",
    color: theme.colors.foreground,
  },

  progress: {
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "700",
    color: RED.primary,
  },

  section: {
    gap: 16,
  },

  stepRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  stepText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 23,
    color: theme.colors.foreground,
  },

  completedStep: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 28,
  },

  primaryButton: {
    flex: 1,
    backgroundColor: RED.primary,
    borderRadius: 14,
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

  primaryButtonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  secondaryButton: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#CBD5E1",
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
    textAlign: "center",
  },

  resetButton: {
    marginTop: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 14,
  },

  resetText: {
    fontSize: 15,
    fontWeight: "700",
    color: theme.colors.mutedForeground,
  },
});