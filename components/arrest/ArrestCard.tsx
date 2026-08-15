import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { ChevronLeft, HeartPulse, RotateCcw } from "lucide-react-native";

import { theme } from "@/constants/theme";
import { ArrestEvent, ArrestNode } from "@/types/cardiacArrest";

import AdrenalineTimer from "@/components/arrest/AdrenalineTimer";
import ReversibleDropdown from "@/components/arrest/ReversibleCauses";
import RhythmCountdown from "@/components/arrest/RythmCountdown";
import { REVERSIBLE } from "@/data/cardiacArrest";
import ArrestSummaryCard from "./ArrestSummary";

type Props = {
  node: ArrestNode;

  checkedSteps: string[];

  onToggleStep: (step: string) => void;

  onAction: (action: string) => void;

  adrenalineRemaining: number;
  adrenalineRunning: boolean;
  completedActions: string[];
  adrenalineGiven: boolean;

  onYes: () => void;
  onNo: () => void;
  onReset: () => void;
  onBack: () => void;

  events: ArrestEvent[];
  duration: number;

  currentNodeId: string;

  showBack: boolean;

  showRhythmTimer: boolean;

  rhythmRemaining: number;
  rhythmRunning: boolean;

  onToggleRhythm: () => void;
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
  onAction,
  events,
  duration,

  adrenalineRemaining,
  adrenalineRunning,
  completedActions,
  adrenalineGiven,

  currentNodeId,

  onYes,
  onNo,
  onReset,
  onBack,

  showBack,

  showRhythmTimer,
  rhythmRemaining,
  rhythmRunning,
  onToggleRhythm,
}: Props) {
  const [expandedCause, setExpandedCause] = useState<string | null>(null);
  return (
    <>
      {showBack && (
        <Pressable style={styles.backButton} onPress={onBack}>
          <ChevronLeft size={16} color={theme.colors.mutedForeground} />

          <Text style={styles.backText}>Back</Text>
        </Pressable>
      )}

      <View style={styles.card}>
        {/* HEADER */}
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
            <HeartPulse size={22} color={RED.primary} />

            <Text style={styles.title}>{node.title}</Text>
          </View>
        </View>

        <View style={styles.section}>
          {/* ACTION CARDS */}
          {node.actionSteps && node.actionSteps.length > 0 && (
            <View style={styles.actionSection}>
              {node.actionSteps.map((action) => {
                const isShock = action.toLowerCase().includes("shock");
                const isAdrenaline = action
                  .toLowerCase()
                  .includes("adrenaline");

                const actionKey = `${currentNodeId}-${action}`;

                const adrenalineBlocked =
                  isAdrenaline && adrenalineRunning && adrenalineRemaining > 0;

                const given = isAdrenaline
                  ? adrenalineBlocked
                    ? true
                    : false
                  : completedActions.includes(actionKey);

                return (
                  <Pressable
                    key={action}
                    style={[
                      styles.actionCard,

                      isShock && styles.shockActionCard,

                      isShock && given && styles.shockActionCardGiven,

                      !isShock && given && styles.adrenalineActionCardGiven,
                    ]}
                    onPress={() => onAction(action)}
                  >
                    <View style={styles.actionContent}>
                      <View
                        style={[
                          styles.actionIndicator,
                          isShock && styles.shockIndicator,
                          given && !isShock && styles.actionIndicatorGiven,
                        ]}
                      />

                      <View style={styles.actionTextContainer}>
                        <Text
                          style={[
                            styles.actionLabel,
                            isShock && styles.shockLabelGiven,
                            given && !isShock && styles.actionLabelGiven,
                          ]}
                        >
                          {given
                            ? isShock
                              ? "SHOCK DELIVERED ✓"
                              : "ADRENALINE GIVEN ✓"
                            : isShock
                              ? "DELIVER SHOCK"
                              : "PREPARE ADRENALINE"}
                        </Text>

                        <Text
                          style={[
                            styles.actionText,
                            isShock && styles.shockText,
                            given && !isShock && styles.actionTextGiven,
                            given && isShock && styles.shockTextGiven,
                          ]}
                        >
                          {isShock ? "200 J biphasic" : "1 mg IV"}
                        </Text>

                        {!given && (
                          <Text
                            style={[
                              styles.actionHint,
                              isShock && styles.shockHint,
                            ]}
                          >
                            {isShock
                              ? "Tap when shock delivered"
                              : "Tap when given"}
                          </Text>
                        )}
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* NORMAL CHECKLIST */}
          {node.steps.map((step) => (
            <View key={step} style={styles.stepRow}>
              <View style={styles.bullet} />

              <Text style={styles.stepText}>{step}</Text>
            </View>
          ))}
        </View>

        {/* RHYTHM TIMER */}

        {showRhythmTimer && (
          <RhythmCountdown
            remaining={rhythmRemaining}
            running={rhythmRunning}
            onToggle={onToggleRhythm}
          />
        )}

        {/* ADRENALINE TIMER */}
        {adrenalineGiven && currentNodeId !== "end" && (
          <View style={styles.adrTimer}>
            <AdrenalineTimer remaining={adrenalineRemaining} />
          </View>
        )}

        {/* REVERSIBLE CAUSES */}
        {node.title === "CPR & Reversible Causes" && (
          <View style={styles.reversibleContainer}>
            <View style={styles.reversibleHeader}>
              <Text style={styles.reversibleTitle}>Reversible Causes</Text>
            </View>

            <View style={styles.reversibleList}>
              {REVERSIBLE.map((cause) => (
                <ReversibleDropdown
                  key={cause.name}
                  title={cause.name}
                  description={cause.detail}
                  expanded={expandedCause === cause.name}
                  onPress={() =>
                    setExpandedCause(
                      expandedCause === cause.name ? null : cause.name,
                    )
                  }
                />
              ))}
            </View>
          </View>
        )}

        {/* ARREST SUMMARY — ONLY ON FINAL NODE */}
        {currentNodeId === "end" && (
          <ArrestSummaryCard
            events={events}
            duration={duration}
            onSave={() => console.log("SAVE")}
            onDiscard={() => console.log("DISCARD")}
          />
        )}

        {/* NAVIGATION BUTTONS */}
        <View style={styles.buttonRow}>
          {node.noLabel && (
            <Pressable style={styles.secondaryButton} onPress={onNo}>
              <Text style={styles.secondaryButtonText}>{node.noLabel}</Text>
            </Pressable>
          )}

          {node.yesLabel === "Restart algorithm" ? (
            <Pressable style={styles.primaryButton} onPress={onReset}>
              <RotateCcw size={18} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Restart Algorithm</Text>
            </Pressable>
          ) : (
            node.yesLabel && (
              <Pressable style={styles.primaryButton} onPress={onYes}>
                <Text style={styles.primaryButtonText}>{node.yesLabel}</Text>
              </Pressable>
            )
          )}
        </View>
      </View>

      {/* RESET */}
      {currentNodeId !== "end" && (
        <Pressable style={styles.resetButton} onPress={onReset}>
          <RotateCcw size={18} color={theme.colors.mutedForeground} />

          <Text style={styles.resetText}>Restart Algorithm</Text>
        </Pressable>
      )}
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

  bullet: {
    width: 6,
    height: 6,
    borderRadius: 4,
    backgroundColor: RED.primary,
    marginTop: 9,
  },

  /* ACTION SECTION */

  actionSection: {
    marginTop: 4,

    gap: 10,
  },

  actionCard: {
    backgroundColor: "#FEF3C7",
    borderWidth: 1,
    borderColor: "#FCD34D",
    borderRadius: 16,
    padding: 16,
  },

  shockActionCard: {
    backgroundColor: "#f8d7d9",
    borderColor: "#f06d7c",
  },

  shockActionCardGiven: {
    backgroundColor: "#FEF2F2",
    borderColor: "#fabcbc",
  },

  adrenalineActionCardGiven: {
    backgroundColor: "#FFFBEB",
    borderColor: "#FCD34D",
  },

  actionContent: {
    flexDirection: "row",

    alignItems: "center",

    gap: 12,
  },

  actionIndicator: {
    width: 6,
    alignSelf: "stretch",
    borderRadius: 6,
    backgroundColor: "#F59E0B",
  },

  shockIndicator: {
    backgroundColor: "#EF4444",
  },

  actionIndicatorGiven: {
    backgroundColor: "#FCD34D",
  },

  actionTextContainer: {
    flex: 1,
  },

  actionLabel: {
    fontSize: 12,

    fontWeight: "800",

    letterSpacing: 1,

    color: "#92400E",
  },

  shockLabel: {
    color: "#c53535",
  },

  shockLabelGiven: {
    color: "#c53535",
  },

  actionLabelGiven: {
    color: "#92400E",
  },

  shockText: {
    color: "#c53535",
  },

  shockTextGiven: {
    color: "#c53535",
  },

  actionText: {
    marginTop: 3,

    fontSize: 16,

    fontWeight: "800",

    color: "#78350F",
  },

  actionTextGiven: {
    color: "#92400E",
  },

  actionHint: {
    marginTop: 6,

    fontSize: 13,

    fontWeight: "600",

    color: "#92400E",
  },

  shockHint: {
    color: "#c53535",
  },

  actionCardGiven: {
    backgroundColor: "#FFFBEB",

    borderColor: "#FCD34D",
  },

  /* BUTTONS */

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

  adrTimer: {
    marginTop: theme.spacing.lg,
  },

  /* RESET */

  resetButton: {
    marginTop: -4,

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

  reversibleCauses: {
    marginTop: theme.spacing.lg,
  },

  reversibleContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#f2ecf8",
    borderWidth: 1,
    borderColor: "#be9ad9",
  },

  reversibleHeader: {
    marginBottom: 12,
  },

  reversibleTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#923dd2",
  },

  reversibleList: {
    gap: 8,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 2,
    marginBottom: -10,
  },

  backText: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.mutedForeground,
  },
});
