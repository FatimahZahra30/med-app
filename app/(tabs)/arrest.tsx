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

export default function CardiacArrestScreen() {

  const [elapsed, setElapsed] = useState(0);

  const [running, setRunning] = useState(false);

  const [query, setQuery] = useState("");

  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {

  if(!running) return;


  const interval =
    setInterval(() => {

      setElapsed(
        previous => previous + 1
      );

    },1000);



  return () => {
    clearInterval(interval);
  };


},[running]);

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
            subtitle="ALS protocol · interactive walkthrough"

            gradient={[
              "#DC2626",
              "#e14d4d"
            ]}

            titleSize={20}
          />

          
        </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.md,
    paddingBottom: 120,
  },
});
