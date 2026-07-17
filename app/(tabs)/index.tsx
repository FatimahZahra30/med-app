import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import HeaderCard from "@/components/HeaderCard";
import { theme } from "@/constants/theme";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderCard
        title="Anaesthesia Toolkit"
        subtitle="Clinical Reference & Decision Support"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
});