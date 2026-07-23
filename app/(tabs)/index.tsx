import FeatureCard from "@/components/FeatureCard";
import HeaderCard from "@/components/HeaderCard";
import SectionTitle from "@/components/SectionTitle";
import { theme } from "@/constants/theme";
import { router } from "expo-router";
import {
  Activity,
  Aperture,
  BookMarked,
  Calculator,
  Droplets,
  FileText,
  FlaskConical,
  GitBranch,
  Heart,
  Layers,
  Navigation,
  Pill,
  Ruler,
  Scale,
  Scissors,
  ShieldAlert,
  Siren,
  Syringe,
  Thermometer,
  Timer,
  Wind,
  XCircle,
  Zap,
} from "lucide-react-native";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <HeaderCard
          title="Anaesthesia Toolkit"
          subtitle="Clinical Reference & Decision Support"
        />

        <SectionTitle title="Quick Access" />

        <View style={styles.cardRow}>
          <FeatureCard
            title="Drug Calculator"
            features={[
              { icon: Calculator, text: "Dosage Calculator" },
              { icon: Scale, text: "ETT Size" },
              { icon: Activity, text: "Weight-based Calc" },
            ]}
            icon={Syringe}
            accentColor="#4F46E5"
            onPress={() => router.push("/(tabs)/dosageCalc")}
          />

          <FeatureCard
            title="Cardiac Arrest"
            features={[
              { icon: Navigation, text: "ALS Algorithm" },
              { icon: Timer, text: "CPR Timer" },
              { icon: Zap, text: "Emergency Drugs" },
            ]}
            icon={Heart}
            accentColor="#DC2626"
            onPress={() => {}}
          />
        </View>

        <View style={styles.cardRow}>
          <FeatureCard
            title="Airway Size Calc"
            features={[
              { icon: Scale, text: "ETT Size" },
              { icon: Aperture, text: "LMA Size" },
              { icon: Scissors, text: "Blade Size" },
            ]}
            icon={Ruler}
            accentColor="#0891B2"
            onPress={() => router.push("/(tabs)/airwaySize")}
          />

          <FeatureCard
            title="Difficult Airway"
            features={[
              { icon: FileText, text: "DAS Guidelines" },
              { icon: XCircle, text: "Can't Intubate" },
              { icon: GitBranch, text: "Flowcharts" },
            ]}
            icon={Wind}
            accentColor="#059669"
            onPress={() => router.push("/(tabs)/difficult")}
          />
        </View>

        <View style={styles.cardRow}>
          <FeatureCard
            title="Anesthetic Emergencies"
            features={[
              { icon: Thermometer, text: "MH Protocol" },
              { icon: FlaskConical, text: "LAST Protocol" },
              { icon: ShieldAlert, text: "Anaphylaxis" },
            ]}
            icon={Siren}
            accentColor="#DB2777"
            onPress={() => router.push("/(tabs)/emergencies")}
          />
          
          <FeatureCard
            title="Anticoagulants & Regional"
            features={[
              { icon: Droplets, text: "Anticoagulants" },
              { icon: Layers, text: "Neuraxial Blocks" },
              { icon: BookMarked, text: "ASRA Guidelines" },
            ]}
            icon={Pill}
            accentColor="#D97706" 
            onPress={() => router.push("/(tabs)/anticoag")}
          />
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },

  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingBottom: 12,
  },
});
