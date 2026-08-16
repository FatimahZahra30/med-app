import { useRef, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/constants/theme";

import AnticoagCard from "@/components/AnticoagCard";
import AnticoagulantModal from "@/components/AnticoagModal";
import ClinicalNotice from "@/components/ClinicalNotice";
import ScreenHeader from "@/components/ScreenHeader";
import SearchBar from "@/components/SearchBar";

import { TriangleAlert } from "lucide-react-native";

import { anticoagulants } from "@/data/anticoagulants";
import { Anticoagulant } from "@/types/anticoagulant";

export default function AnticoagulantScreen() {
  const [query, setQuery] = useState("");

  const [selectedAnticoagulant, setSelectedAnticoagulant] =
    useState<Anticoagulant | null>(null);

  const [modalVisible, setModalVisible] = useState(false);

  const scrollRef = useRef<ScrollView>(null);

  // Ensures the whole page shifts up when search bar is tapped
  const handleSearchFocus = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 260,
        animated: true,
      });
    }, 250);
  };

  // Performs filtering form the search bar
  const filteredAnticoagulants = anticoagulants.filter((drug) =>
    drug.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.content}
        >
          <ScreenHeader
            title="Anticoagulants & Regional Anesthesia"
            subtitle="ASRA-guided timing for neuraxial & regional blocks · tap a drug for info"
            gradient={["#D97706", "#F9A13C"]}
            titleSize={20}
          />
          <ClinicalNotice
            title="Clinical Reference"
            icon={<TriangleAlert size={18} color="#D97706" />}
            colour="#FFF7ED"
            borderColour="#FED7AA"
            titleColour="#D97706"
            bodyColour="#92400E"
            body="Guidance based on ASRA recommendations. Consider individual patient factors including renal function, age, and concurrent medications. Always follow local protocols when uncertain."
          />
          <SearchBar
            value={query}
            onChangeText={setQuery}
            onFocus={handleSearchFocus}
            placeholder="Search anticoagulant..."
          />
          // Filter only shows the cards that meet the criteria
          {filteredAnticoagulants.map((drug) => (
            <AnticoagCard
              key={drug.name}
              drug={drug}
              onPress={() => {
                setSelectedAnticoagulant(drug);
                setModalVisible(true);
              }}
            />
          ))}
        </ScrollView>

        <AnticoagulantModal
          visible={modalVisible}
          anticoag={selectedAnticoagulant}
          onClose={() => {
            setModalVisible(false);
            setSelectedAnticoagulant(null);
          }}
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
