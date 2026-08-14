import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/constants/theme";

import ScreenHeader from "@/components/ScreenHeader";
import ArrestCard from "@/components/arrest/ArrestCard";
import ArrestTimer from "@/components/arrest/ArrestTimer";

import { arrestFlow } from "@/data/cardiacArrest";
import { useLocalSearchParams } from "expo-router";

export default function CardiacArrestScreen() {
  const { newSession } = useLocalSearchParams();

  const scrollRef = useRef<ScrollView>(null);

  const [elapsed, setElapsed] = useState(0);

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

  const resetSession = () => {
    setElapsed(0);

    setStarted(false);
    setRunning(false);

    setRhythmRemaining(120);
    setRhythmRunning(false);

    setAdrenalineGiven(false);

    setAdrenalineRemaining(30);
    setAdrenalineRunning(false);

    setCompletedActions([]);

    setCheckedSteps([]);
    setHistory([]);
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

  // ADRENALINE 3 MINUTE COUNTDOWN
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

  const handleAction = (action: string) => {
  const lowerAction = action.toLowerCase();

  //SHOCK
  if (lowerAction.includes("shock")) {
    const actionKey = `${currentNodeId}-${action}`;

    setCompletedActions((prev) => {
      if (prev.includes(actionKey)) {
        return prev;
      }

      return [...prev, actionKey];
    });

    // Later: add shock to log
    return;
    }

    //ADRENALINE
    if (lowerAction.includes("adrenaline")) {
      // Don't allow another dose while the current timer is running
      if (adrenalineRunning && adrenalineRemaining > 0) {
        return;
      }

      const actionKey = `${currentNodeId}-${action}`;

      setCompletedActions((prev) => {
        if (prev.includes(actionKey)) {
          return prev;
        }

        return [...prev, actionKey];
      });

      // A dose has now been given
      setAdrenalineGiven(true);

      // Start/restart the countdown
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

    // If the next node needs a rhythm timer:
    if (nextNode.timer && nextNode.timerDuration) {
      // Start a new timer if the CURRENT node
      // does not have a timer running.
      if (!currentNode.timer || !rhythmRunning) {
        startRhythmTimer(nextNode.timerDuration);
      }
    }

    // If we're moving to a node without a timer,
    // stop the current rhythm timer.
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

  const handleYes = () => {
    if (!currentNode.yes) return;

    if (currentNodeId === "start") {
      setStarted(true);
      setRunning(true);
    }

    setHistory((prev) => [...prev, currentNodeId]);

    handleNextNode(currentNode.yes);
  };

  const handleNo = () => {
    if (!currentNode.no) return;

    if (currentNodeId === "start") {
      setStarted(true);
      setRunning(true);
    }

    setHistory((prev) => [...prev, currentNodeId]);

    handleNextNode(currentNode.no);
  };

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

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
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
});
