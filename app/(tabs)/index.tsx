import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View} from "react-native";
import HeaderCard from "@/components/HeaderCard";
import { theme } from "@/constants/theme";
import SectionTitle from "@/components/SectionTitle";
import FeatureCard from "@/components/FeatureCard";
import { Calculator, Scale, Activity, Syringe } from 'lucide-react-native';

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
            { icon: Calculator, text: "ALS Algorithm" },
            { icon: Scale, text: "CPR Timer" },
            { icon: Activity, text: "Emergency Drugs" },
          ]}
          icon={Syringe}
          accentColor="#DC2626"
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
},
});