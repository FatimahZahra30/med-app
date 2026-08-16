import { X } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { initialiseDatabase } from "@/database/arrestDB";
import { saveArrestLog } from "@/database/arrestLogs";

import { theme } from "@/constants/theme";

import ScreenHeader from "@/components/ScreenHeader";
import ArrestCard from "@/components/arrest/ArrestCard";
import ArrestTimer from "@/components/arrest/ArrestTimer";
import ReversibleDropdown from "@/components/arrest/ReversibleCauses";

import { ArrestEvent } from "@/types/cardiacArrest";

import { arrestFlow, REVERSIBLE } from "@/data/cardiacArrest";
import { useFocusEffect, useLocalSearchParams } from "expo-router";

export default function CardiacArrestScreen() {
  const { newSession } = useLocalSearchParams();

  const [showReversibleCauses, setShowReversibleCauses] = useState(false);

  const [expandedCause, setExpandedCause] = useState<string | null>(null);

  const [startedAt, setStartedAt] = useState<string | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  const [elapsed, setElapsed] = useState(0);
  const [events, setEvents] = useState<ArrestEvent[]>([]);

  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);

  const [rhythmRemaining, setRhythmRemaining] = useState(120);
  const [rhythmRunning, setRhythmRunning] = useState(false);

  const [adrenalineGiven, setAdrenalineGiven] = useState(false);

  const [completedActions, setCompletedActions] = useState<string[]>([]);

  const [adrenalineRemaining, setAdrenalineRemaining] = useState(30);
  const [adrenalineRunning, setAdrenalineRunning] = useState(false);

  const [currentNodeId, setCurrentNodeId] = useState("start");

  const [checkedSteps, setCheckedSteps] = useState<string[]>([]);

  const [history, setHistory] = useState<string[]>([]);

  const currentNode = arrestFlow[currentNodeId];

  // Resets all details of cardiac arrest page
  // including timers and event history
  const resetSession = () => {
    setElapsed(0);

    setStarted(false);
    setRunning(false);

    setRhythmRemaining(120);
    setRhythmRunning(false);

    setStartedAt(null);

    setAdrenalineGiven(false);

    setAdrenalineRemaining(30);
    setAdrenalineRunning(false);

    setCompletedActions([]);

    setCheckedSteps([]);
    setHistory([]);
    setEvents([]);
    setCurrentNodeId("start");

    scrollRef.current?.scrollTo({
      y: 0,
      animated: false,
    });
  };

  useEffect(() => {
    if (newSession) {
      resetSession();
    }
  }, [newSession]);

  // A new event entry is created in the database at the
  // start of the algorithm
  useEffect(() => {
    initialiseDatabase();
  }, []);

  // Stores arrest log details if user has reached the last (end)
  // page of the cardiac arrest algorithm
  useEffect(() => {
    if (currentNodeId === "end" && startedAt) {
      const log = {
        id: `${Date.now()}`,
        startedAt,
        completedAt: new Date().toISOString(),
        duration: elapsed,
        events,
      };

      console.log("SAVING ARREST LOG:", log);

      saveArrestLog(log);
    }
  }, [currentNodeId]);

  // TOTAL ARREST TIMER
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [running]);

  // CPR RHYTHM COUNTDOWN
  useEffect(() => {
    if (!rhythmRunning) return;

    if (rhythmRemaining <= 0) {
      setRhythmRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setRhythmRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [rhythmRunning, rhythmRemaining]);

  // ADRENALINE COUNTDOWN
  useEffect(() => {
    if (!adrenalineRunning) return;

    if (adrenalineRemaining <= 0) {
      setAdrenalineRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setAdrenalineRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [adrenalineRunning, adrenalineRemaining]);

  // Test whether the events are being added correctly
  useEffect(() => {
    console.log("EVENTS:", events);
  }, [events]);

  const startRhythmTimer = (duration = 120) => {
    setRhythmRemaining(duration);
    setRhythmRunning(true);
  };

  const toggleTimer = () => {
    setRunning((prev) => !prev);
  };

  const toggleRhythmTimer = () => {
    setRhythmRunning((prev) => !prev);
  };

  const stopAllTimers = () => {
    setRunning(false);
    setRhythmRunning(false);
    setAdrenalineRunning(false);
  };

  // Ensures leaving the cardiac arrest page turns of all
  // running timers
  useFocusEffect(
    useCallback(() => {
      return () => {
        stopAllTimers();
      };
    }, []),
  );

  // Adds details of the particular algorithm run to the database
  const addEvent = (
    type: ArrestEvent["type"],
    description: string,
    nodeId: string = currentNodeId,
  ) => {
    const event: ArrestEvent = {
      id: `${Date.now()}-${Math.random()}`,
      type,
      description,
      elapsedTime: elapsed,
      timestamp: new Date().toISOString(),
      nodeId,
    };

    setEvents((prev) => [...prev, event]);
  };

  // Adds specific actions such as delivering shock or
  // giving adrenaline to the events of the log
  const handleAction = (action: string) => {
    const lowerAction = action.toLowerCase();

    // SHOCK
    if (lowerAction.includes("shock")) {
      const actionKey = `${currentNodeId}-${action}`;

      if (completedActions.includes(actionKey)) {
        return;
      }

      setCompletedActions((prev) => [...prev, actionKey]);

      addEvent("shock", "Shock delivered — 200 J biphasic");

      return;
    }

    // ADRENALINE
    if (lowerAction.includes("adrenaline")) {
      if (adrenalineRunning && adrenalineRemaining > 0) {
        return;
      }

      addEvent("adrenaline", "Adrenaline given — 1 mg IV");

      setAdrenalineGiven(true);

      setAdrenalineRemaining(30);
      setAdrenalineRunning(true);

      return;
    }
  };

  const toggleStep = (step: string) => {
    setCheckedSteps((prev) =>
      prev.includes(step)
        ? prev.filter((item) => item !== step)
        : [...prev, step],
    );
  };

  // chatgpt helped with this timing logic
  const handleNextNode = (nextNodeId: string) => {
    const nextNode = arrestFlow[nextNodeId];

    if (nextNode.timer && nextNode.timerDuration) {
      if (!currentNode.timer || !rhythmRunning) {
        startRhythmTimer(nextNode.timerDuration);
      }
    }

    if (!nextNode.timer) {
      setRhythmRunning(false);
      setRhythmRemaining(120);
    }

    setCheckedSteps([]);
    setCurrentNodeId(nextNodeId);

    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // Performs action for when the "yes" button is clicked
  const handleYes = () => {
    if (!currentNode.yes) return;

    if (currentNodeId === "start") {
      const startTime = new Date().toISOString();

      setStarted(true);
      setRunning(true);
      setStartedAt(startTime);

      addEvent("start", "Cardiac arrest algorithm started", "start");
    }

    if (currentNodeId === "rhythm" || currentNodeId === "rhythm2") {
      addEvent("rhythm", "Rhythm assessed — Shockable", currentNodeId);
    }

    if (currentNodeId === "rosc") {
      stopAllTimers();

      addEvent("rhythm", "ROSC achieved", "rosc");
    }

    setHistory((prev) => [...prev, currentNodeId]);

    handleNextNode(currentNode.yes);
  };

  // Performs action for when the "no" button is clicked
  const handleNo = () => {
    if (!currentNode.no) return;

    if (currentNodeId === "start") {
      const startTime = new Date().toISOString();

      setStarted(true);
      setRunning(true);
      setStartedAt(startTime);

      addEvent("start", "Cardiac arrest algorithm started", "start");
    }

    if (currentNodeId === "rhythm" || currentNodeId === "rhythm2") {
      addEvent("rhythm", "Rhythm assessed — Shockable", currentNodeId);
    }

    setHistory((prev) => [...prev, currentNodeId]);

    handleNextNode(currentNode.no);
  };

  // Performs action of going back to the previous steps of the algorithm
  const handleBack = () => {
    if (history.length === 0) return;

    const previousNodeId = history[history.length - 1];

    setHistory((prev) => prev.slice(0, -1));

    setCurrentNodeId(previousNodeId);

    setCheckedSteps([]);

    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleReset = () => {
    resetSession();
  };

  // For showing reversible causes
  const toggleCause = (cause: string) => {
    setExpandedCause((prev) => (prev === cause ? null : cause));
  };

  /*
   * 4 Hs
   */
  const hs = ["Hypoxia", "Hypovolaemia", "Hypo/hyperkalaemia", "Hypothermia"];

  /*
   * 4 Ts
   *
   * Note that thrombosis has TWO entries in REVERSIBLE:
   * cardiac and PE.
   */
  const ts = [
    "Tension pneumothorax",
    "Tamponade",
    "Toxins",
    "Thrombosis (cardiac)",
    "Thrombosis (PE)",
  ];

  // gets each reversible causes from the cardiac arrest data
  const getCause = (name: string) =>
    REVERSIBLE.find((cause) => cause.name === name);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* FLOATING REVERSIBLE CAUSES BUTTON */}

        <View style={styles.reversibleButtonWrapper}>
          <View style={styles.reversibleGlow} />

          <Pressable
            style={styles.reversibleButton}
            onPress={() => {
              setShowReversibleCauses(true);
              setExpandedCause(null);
            }}
          >
            <Text style={styles.reversibleButtonTop}>4H</Text>
            <Text style={styles.reversibleButtonBottom}>4T</Text>
          </Pressable>
        </View>

        {/* MAIN CONTENT */}

        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.content}
        >
          <ScreenHeader
            title="Cardiac Arrest Algorithm"
            subtitle="ALS Protocol · Interactive Walkthrough"
            gradient={["#DC2626", "#EF4444"]}
            titleSize={20}
          />

          <ArrestTimer
            elapsed={elapsed}
            started={started}
            running={running}
            onToggle={toggleTimer}
          />

          <ArrestCard
            node={currentNode}
            currentNodeId={currentNodeId}
            checkedSteps={checkedSteps}
            onToggleStep={toggleStep}
            onAction={handleAction}
            events={events}
            duration={elapsed}
            adrenalineRemaining={adrenalineRemaining}
            adrenalineRunning={adrenalineRunning}
            adrenalineGiven={adrenalineGiven}
            completedActions={completedActions}
            onYes={handleYes}
            onNo={handleNo}
            onReset={handleReset}
            onBack={handleBack}
            showBack={history.length > 0}
            showRhythmTimer={started && currentNode.timer === true}
            rhythmRemaining={rhythmRemaining}
            rhythmRunning={rhythmRunning}
            onToggleRhythm={toggleRhythmTimer}
          />
        </ScrollView>

        {/* REVERSIBLE CAUSES MODAL */}

        {showReversibleCauses && (
          <View style={styles.overlay}>
            <Pressable
              style={StyleSheet.absoluteFill}
              onPress={() => setShowReversibleCauses(false)}
            />

            <View style={styles.reversibleModal}>
              {/* MODAL HEADER */}

              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderText}>
                  <Text style={styles.modalTitle}>Reversible Causes</Text>

                  <Text style={styles.modalSubtitle}>
                    Consider throughout the arrest
                  </Text>
                </View>

                <Pressable
                  onPress={() => setShowReversibleCauses(false)}
                  style={styles.closeButton}
                >
                  <X size={20} color={theme.colors.foreground} />
                </Pressable>
              </View>

              {/* SCROLLABLE CAUSES */}

              <ScrollView
                style={styles.causesScroll}
                contentContainerStyle={styles.causesContent}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
              >
                {/* 4 HS */}

                <Text style={styles.causesHeading}>4 Hs</Text>

                <View style={styles.dropdownGroup}>
                  {hs.map((name) => {
                    const cause = getCause(name);

                    if (!cause) return null;

                    return (
                      <ReversibleDropdown
                        key={cause.name}
                        title={cause.name}
                        description={cause.detail}
                        expanded={expandedCause === cause.name}
                        onPress={() => toggleCause(cause.name)}
                      />
                    );
                  })}
                </View>

                {/* 4 TS */}

                <Text style={[styles.causesHeading, styles.tsHeading]}>
                  4 Ts
                </Text>

                <View style={styles.dropdownGroup}>
                  {ts.map((name) => {
                    const cause = getCause(name);

                    if (!cause) return null;

                    return (
                      <ReversibleDropdown
                        key={cause.name}
                        title={cause.name}
                        description={cause.detail}
                        expanded={expandedCause === cause.name}
                        onPress={() => toggleCause(cause.name)}
                      />
                    );
                  })}
                </View>

                <View style={styles.modalBottomSpace} />
              </ScrollView>
            </View>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: 120,
    gap: 18,
  },

  /*
   * FLOATING BUTTON
   */

  reversibleButtonWrapper: {
    position: "absolute",
    right: 20,
    bottom: 24,

    width: 58,
    height: 58,

    alignItems: "center",
    justifyContent: "center",

    zIndex: 20,
  },

  reversibleGlow: {
    position: "absolute",

    width: 53,
    height: 53,
    borderRadius: 29,

    backgroundColor: "#6D4AFF",

    shadowColor: "#6D4AFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 18,

    elevation: 18,
  },

  reversibleButton: {
    width: 58,
    height: 58,
    borderRadius: 29,

    backgroundColor: "#6D4AFF",

    alignItems: "center",
    justifyContent: "center",
  },

  reversibleButtonTop: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 16,
  },

  reversibleButtonBottom: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    lineHeight: 16,
  },

  /*
   * MODAL OVERLAY
   */

  overlay: {
    position: "absolute",

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,

    backgroundColor: "rgba(15, 23, 42, 0.45)",

    alignItems: "center",
    justifyContent: "center",

    paddingHorizontal: 24,

    zIndex: 50,
    elevation: 50,
  },

  /*
   * CENTERED MODAL
   */

  reversibleModal: {
    width: "100%",
    maxWidth: 420,

    maxHeight: "78%",

    backgroundColor: theme.colors.background,

    borderRadius: 22,

    overflow: "hidden",

    ...theme.shadow.card,
  },

  /*
   * MODAL HEADER
   */

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,

    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },

  modalHeaderText: {
    flex: 1,
    paddingRight: 12,
  },

  modalTitle: {
    fontSize: 21,
    fontWeight: "800",

    color: theme.colors.foreground,
  },

  modalSubtitle: {
    marginTop: 3,

    fontSize: 13,

    color: theme.colors.mutedForeground,
  },

  closeButton: {
    width: 38,
    height: 38,

    borderRadius: 20,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: theme.colors.card,

    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  /*
   * CAUSES
   */

  causesScroll: {
    flexGrow: 0,
  },

  causesContent: {
    padding: 20,
  },

  causesHeading: {
    fontSize: 13,
    fontWeight: "800",

    letterSpacing: 0.8,

    color: "#3B0969",

    marginBottom: 10,

    textTransform: "uppercase",
  },

  tsHeading: {
    marginTop: 22,
  },

  dropdownGroup: {
    gap: 9,
  },

  modalBottomSpace: {
    height: 4,
  },
});
