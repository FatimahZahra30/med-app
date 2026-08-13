import { useRef, useState } from "react";

import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/constants/theme";

import AirwayResultCard from "@/components/AirwayResultCard";
import PatientCard from "@/components/PatientCard";
import ScreenHeader from "@/components/ScreenHeader";

import { calculateAirway } from "@/utils/airway";

export default function AirwaySizeCalcScreen() {
  const [age, setAge] = useState(25);

  const [weight, setWeight] = useState(70);

  const [sex, setSex] = useState<"male" | "female">("male");

  const scrollRef = useRef<ScrollView>(null);

  const airwayResult = calculateAirway(age, weight, sex);

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
            title="Airway Size Calculator"
            subtitle="Weight-based sizing for airway devices"
            gradient={["#0369A1", "#0891B2"]}
          />

          <PatientCard
            age={age}
            weight={weight}
            sex={sex}
            onAgeChange={setAge}
            onWeightChange={setWeight}
            onSexChange={setSex}
            accentColor="#0891B2"
            accentBackground="#E0F2FE"
          />

          <AirwayResultCard result={airwayResult} />
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
  },
});
