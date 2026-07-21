import { Wind } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

import { theme } from "@/constants/theme";
import { AirwayResult } from "@/utils/airway";

type Props = {
  result: AirwayResult;
};

export default function AirwayResultsCard({ result }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Wind size={20} color="#0891B2" />
        </View>

        <Text style={styles.title}>Airway Recommendations</Text>
      </View>

      {/* Endotracheal Tube */}
      <Section title="Endotracheal Tube">
        <Row label="Cuffed" value={`${result.cuffedETT} mm`} />

        <Row label="Uncuffed" value={`${result.uncuffedETT} mm`} />

        <Row label="Depth" value={`${result.depth} cm`} />
      </Section>

      {/* Supraglottic */}
      <Section title="Supraglottic Airway">
        <Row label="iGel" value={`Size ${result.igel}`} />

        <Row label="LMA Classic" value={`Size ${result.lma}`} />
      </Section>

      {/* Other */}
      <Section title="Other Equipment">
        <Row label="Guedel Airway" value={result.guedel} />

        <Row label="Laryngoscope" value={result.blade} />
      </Section>
    </View>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {children}
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,

    borderRadius: 22,

    borderWidth: 1,
    borderColor: theme.colors.border,

    padding: 20,

    marginBottom: theme.spacing.lg,

    ...theme.shadow.card,
  },

  header: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 22,
  },

  iconContainer: {
    width: 40,

    height: 40,

    borderRadius: 12,

    backgroundColor: "#E0F2FE",

    justifyContent: "center",

    alignItems: "center",
  },

  title: {
    marginLeft: 12,

    fontSize: 18,

    fontWeight: "700",

    color: theme.colors.foreground,
  },

  section: {
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 15,

    fontWeight: "700",

    color: "#0891B2",

    marginBottom: 12,
  },

  row: {
    flexDirection: "row",

    justifyContent: "space-between",

    alignItems: "center",

    paddingVertical: 12,

    borderBottomWidth: 1,

    borderBottomColor: "#F1F5F9",
  },

  label: {
    fontSize: 15,

    color: theme.colors.foreground,
  },

  value: {
    fontSize: 16,

    fontWeight: "700",

    color: "#0891B2",
  },
});
