import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

import Slider from "@react-native-community/slider";
import { Scale } from "lucide-react-native";

import { theme } from "@/constants/theme";

type WeightCardProps = {
  weight: number;
  onChange: (weight: number) => void;

  accentColor?: string;
  accentBackground?: string;
};

export default function WeightCard({
  weight,
  onChange,

  accentColor = theme.colors.primary,
  accentBackground = "#EEF2FF",
}: WeightCardProps) {
  const [inputValue, setInputValue] = useState(weight.toString());

  useEffect(() => {
    setInputValue(weight.toString());
  }, [weight]);

  const commitWeight = () => {
    const value = Number(inputValue);

    if (isNaN(value)) {
      setInputValue(weight.toString());
      return;
    }

    const clamped = Math.min(200, Math.max(1, value));

    onChange(clamped);
    setInputValue(clamped.toString());
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: accentBackground,
            },
          ]}
        >
          <Scale size={20} color={accentColor} />
        </View>

        <Text style={styles.title}>Patient Weight</Text>
      </View>

      {/* Weight Input */}
      <View style={styles.weightRow}>
        <Text style={styles.label}>Current Weight</Text>

        <View
          style={[
            styles.inputContainer,
            {
              borderColor: accentBackground,
            },
          ]}
        >
          <TextInput
            value={inputValue}
            keyboardType="decimal-pad"
            style={styles.weightInput}
            onChangeText={setInputValue}
            onEndEditing={commitWeight}
            returnKeyType="done"
          />

          <Text style={styles.unit}>kg</Text>
        </View>
      </View>

      {/* Slider */}
      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={200}
        step={0.5}
        value={weight}
        minimumTrackTintColor={accentColor}
        maximumTrackTintColor="#E5E7EB"
        thumbTintColor={accentColor}
        onValueChange={(value) => {
          onChange(Number(value.toFixed(1)));
        }}
      />

      {/* Scale Labels */}
      <View style={styles.sliderLabels}>
        <Text style={styles.sliderLabel}>1</Text>
        <Text style={styles.sliderLabel}>50</Text>
        <Text style={styles.sliderLabel}>100</Text>
        <Text style={styles.sliderLabel}>150</Text>
        <Text style={styles.sliderLabel}>200</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,

    borderRadius: 22,

    borderWidth: 1,
    borderColor: theme.colors.border,

    padding: 18,

    marginBottom: theme.spacing.lg,

    ...theme.shadow.card,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 18,
  },

  iconContainer: {
    width: 38,
    height: 38,

    borderRadius: 12,

    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    marginLeft: 12,

    fontSize: 17,
    fontWeight: "700",

    color: theme.colors.foreground,
  },

  weightRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 12,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",

    color: theme.colors.foreground,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",

    height: 46,

    paddingHorizontal: 14,

    borderRadius: 14,

    borderWidth: 1,

    backgroundColor: "#F8FAFC",
  },

  weightInput: {
    width: 60,

    fontSize: 20,
    fontWeight: "700",

    textAlign: "center",

    color: theme.colors.foreground,

    padding: 0,
  },

  unit: {
    marginLeft: 4,

    fontSize: 16,
    fontWeight: "600",

    color: theme.colors.mutedForeground,
  },

  slider: {
    width: "100%",
    height: 36,
  },

  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginTop: -4,
  },

  sliderLabel: {
    fontSize: 11,

    color: theme.colors.mutedForeground,
  },
});
