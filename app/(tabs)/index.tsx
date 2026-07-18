import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View} from "react-native";
import HeaderCard from "@/components/HeaderCard";
import { theme } from "@/constants/theme";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import { Calculator, Scale, Activity, Syringe, Timer, Zap, Navigation, Heart, BookOpen, FileText, Pill, Waves, Wind, AlertTriangle} from 'lucide-react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderCard
        title="Anaesthesia Toolkit"
        subtitle="Clinical Reference & Decision Support"
      />

      <SectionTitle
        title="Quick Access"
      />

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
          onPress={() => {}}
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
          title="Drug Library"
          features={[
            { icon: BookOpen, text: "Drug Information" },
            { icon: Waves, text: "Regional Anaesthesia" },
            { icon: FileText, text: "Coagulation Guide" },
          ]}
          icon={Pill}
          accentColor="#0891B2"
          onPress={() => {}}
        />

        <FeatureCard
          title="Airway"
          features={[
            { icon: FileText, text: "DAS Guidelines" },
            { icon: AlertTriangle, text: "Difficult Airway" },
            { icon: Activity, text: "Flowcharts" },
          ]}
          icon={Wind}
          accentColor="#059669"
          onPress={() => {}}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },

  cardRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 12,
  paddingBottom: 12,
},
});