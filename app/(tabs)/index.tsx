import { View, StyleSheet } from "react-native";
import HeaderCard from "@/components/HeaderCard";
import { theme } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HeaderCard
        title="Anaesthesia Toolkit"
        subtitle="Clinical Reference & Calculators"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
});