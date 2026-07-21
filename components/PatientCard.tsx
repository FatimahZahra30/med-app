import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import Slider from "@react-native-community/slider";
import { Calendar, Scale, User } from "lucide-react-native";

import { theme } from "@/constants/theme";

type Props = {
  age: number;
  weight: number;
  sex: "male" | "female";
  onAgeChange: (value: number) => void;
  onWeightChange: (value: number) => void;
  onSexChange: (value: "male" | "female") => void;

  accentColor?: string;
  accentBackground?: string;
};

export default function PatientCard({
  age,
  weight,
  sex,
  onAgeChange,
  onWeightChange,
  onSexChange,
  accentColor = "#0891B2",
  accentBackground = "#E0F2FE",
}: Props) {
  const [ageInput, setAgeInput] = useState(age.toString());
  const [weightInput, setWeightInput] = useState(weight.toString());

  useEffect(() => {
    setAgeInput(age.toString());
  }, [age]);

  useEffect(() => {
    setWeightInput(weight.toString());
  }, [weight]);

  const commitAge = () => {
    const value = Number(ageInput);

    if (isNaN(value)) {
      setAgeInput(age.toString());
      return;
    }

    const finalAge = Math.max(0, Math.min(100, value));

    onAgeChange(finalAge);
    setAgeInput(finalAge.toString());
  };

  const commitWeight = () => {
    const value = Number(weightInput);

    if (isNaN(value)) {
      setWeightInput(weight.toString());
      return;
    }

    const finalWeight = Math.max(1, Math.min(200, value));

    onWeightChange(finalWeight);
    setWeightInput(finalWeight.toString());
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View
          style={[styles.iconContainer, { backgroundColor: accentBackground }]}
        >
          <User size={20} color={accentColor} />
        </View>

        <Text style={styles.title}>Patient Information</Text>
      </View>

      {/* Age */}

      <View style={styles.row}>
        <View style={styles.labelRow}>
          <Calendar size={16} color={theme.colors.mutedForeground} />

          <Text style={styles.label}>Age</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={ageInput}
            onChangeText={setAgeInput}
            onEndEditing={commitAge}
            keyboardType="number-pad"
            style={styles.input}
          />

          <Text style={styles.unit}>yrs</Text>
        </View>
      </View>

      {/* Weight */}

      <View style={styles.row}>
        <View style={styles.labelRow}>
          <Scale size={16} color={theme.colors.mutedForeground} />

          <Text style={styles.label}>Weight</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={weightInput}
            onChangeText={setWeightInput}
            onEndEditing={commitWeight}
            keyboardType="decimal-pad"
            style={styles.input}
          />

          <Text style={styles.unit}>kg</Text>
        </View>
      </View>

      <Slider
        style={styles.slider}
        minimumValue={1}
        maximumValue={200}
        value={weight}
        step={0.5}
        minimumTrackTintColor={accentColor}
        maximumTrackTintColor="#E5E7EB"
        thumbTintColor={accentColor}
        onValueChange={(v) => onWeightChange(Number(v.toFixed(1)))}
      />

      {/* Sex */}

      <Text style={styles.sexLabel}>Gender</Text>

      <View style={styles.sexRow}>
        <Pressable
          onPress={() => onSexChange("male")}
          style={[
            styles.sexButton,
            sex === "male" && {
              backgroundColor: accentBackground,
              borderColor: accentColor,
            },
          ]}
        >
          <Text
            style={[
              styles.sexText,
              sex === "male" && {
                color: accentColor,
              },
            ]}
          >
            Male
          </Text>
        </Pressable>

        <Pressable
          onPress={() => onSexChange("female")}
          style={[
            styles.sexButton,
            sex === "female" && {
              backgroundColor: accentBackground,
              borderColor: accentColor,
            },
          ]}
        >
          <Text
            style={[
              styles.sexText,
              sex === "female" && {
                color: accentColor,
              },
            ]}
          >
            Female
          </Text>
        </Pressable>
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
    marginBottom: 20,
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
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    marginLeft: 8,
    fontWeight: "600",
    fontSize: 15,
    color: theme.colors.foreground,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 46,
    backgroundColor: "#F8FAFC",
  },

  input: {
    width: 55,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: theme.colors.foreground,
    padding: 0,
  },

  unit: {
    marginLeft: 4,
    color: theme.colors.mutedForeground,
    fontWeight: "600",
  },

  slider: {
    width: "100%",
    height: 36,
    marginBottom: 18,
  },

  sexLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: theme.colors.foreground,
    marginBottom: 10,
  },

  sexRow: {
    flexDirection: "row",
    gap: 12,
  },

  sexButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  sexText: {
    fontWeight: "700",
    color: theme.colors.foreground,
  },
});
