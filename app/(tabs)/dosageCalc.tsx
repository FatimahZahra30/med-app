import { useMemo, useRef, useState } from "react";

import {
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/constants/theme";

import ScreenHeader from "@/components/ScreenHeader";
import WeightCard from "@/components/WeightCard";
import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import DrugCard from "@/components/DrugCard";
import DrugInfoSheet from "@/components/DrugInfoSheet";

import { DRUGS } from "@/data/drugs";
import { Drug } from "@/types/drug";
import { calculateDose } from "@/utils/calculations";

export default function DrugCalculatorScreen() {
  const [weight, setWeight] = useState(70);

  const [query, setQuery] = useState("");

  const [category, setCategory] = useState("all");

  const [selectedDrug, setSelectedDrug] =
    useState<Drug | null>(null);

  const [sheetVisible, setSheetVisible] =
    useState(false);

  const scrollRef = useRef<ScrollView>(null);

  const filteredDrugs = useMemo(() => {
    return DRUGS.filter((drug) => {
      const matchesSearch = drug.name
        .toLowerCase()
        .includes(query.toLowerCase());

      const matchesCategory =
        category === "all" ||
        drug.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [query, category]);

  const handleSearchFocus = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 260,
        animated: true,
      });
    }, 250);
  };

  const openDrug = (drug: Drug) => {
    setSelectedDrug(drug);
    setSheetVisible(true);
  };

  const closeSheet = () => {
    setSheetVisible(false);
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.content}
        >
          <ScreenHeader
            title="Drug Dosage Calculator"
            subtitle="Weight-based medication dosing"
          />

          <WeightCard
            weight={weight}
            onChange={setWeight}
          />

          <SearchBar
            value={query}
            onChangeText={setQuery}
            onFocus={handleSearchFocus}
          />

          <CategoryChips
            selected={category}
            onSelect={setCategory}
          />

          {filteredDrugs.map((drug) => (
            <DrugCard
              key={drug.id}
              drug={drug}
              weight={weight}
              onPress={() => openDrug(drug)}
            />
          ))}
        </ScrollView>

        <DrugInfoSheet
          visible={sheetVisible}
          drug={selectedDrug}
          calculatedDose={
            selectedDrug
              ? `${calculateDose(weight, selectedDrug).amount} ${calculateDose(weight, selectedDrug).unit}`
              : ""
          }
          onClose={closeSheet}
        />
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