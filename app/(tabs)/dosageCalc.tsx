import { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";

import { theme } from "@/constants/theme";

import ScreenHeader from "@/components/ScreenHeader";
import WeightCard from "@/components/WeightCard";
import SearchBar from "@/components/SearchBar";
import CategoryChips from "@/components/CategoryChips";
import DrugCard from "@/components/DrugCard";

import { DRUGS } from "@/data/drugs";
import { Calculator } from "lucide-react-native";

export default function DrugCalculatorScreen() {
  const [weight, setWeight] = useState(70);

  const [query, setQuery] = useState("");

  const [category, setCategory] = useState("all");

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

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView
            showsVerticalScrollIndicator={false}
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

        <CategoryChips
          selected={category}
          onSelect={setCategory}
        />

        <SearchBar
          value={query}
          onChangeText={setQuery}
        />

        {filteredDrugs.map((drug) => (
          <DrugCard
            key={drug.id}
            drug={drug}
            weight={weight}
            onPress={() => {}}
          />
        ))}
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
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
  },
});