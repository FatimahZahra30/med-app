import { useRef, useState } from "react";

import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/constants/theme";

import EmergencyCard from "@/components/EmergencyCard";
import ScreenHeader from "@/components/ScreenHeader";
import SearchBar from "@/components/SearchBar";

import { emergencies } from "@/data/emergencies";
import { Emergency } from "@/types/emergency";
import EmergencyModal from "@/components/EmergencyModal";
import ClinicalNotice from "@/components/ClinicalNotice";
import { TriangleAlert } from "lucide-react-native";

export default function AnesthEmergenciesScreen() {
  const [query, setQuery] = useState("");

  const scrollRef = useRef<ScrollView>(null);

  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(
    null,
  );

  const handleSearchFocus = () => {
    setTimeout(() => {
      scrollRef.current?.scrollTo({
        y: 260,

        animated: true,
      });
    }, 250);
  };

  const filteredEmergencies = emergencies.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase()),
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
            title="Anesthetic Emergencies"
            subtitle="RCoA-guided protocols · tap to view details"
            gradient={["#DB2777", "#f54593"]}
            titleSize={20}
          />

          <ClinicalNotice

            title="Clinical Reference"

            icon={
              <TriangleAlert
                size={18}
                color="#ed182d"
              />
            }

            body="Clinical reference based on Royal College of Anaesthetists (RCoA) / AAGBI guidelines. Always follow local protocols and call for senior help early.
          "


          />

          <SearchBar
            value={query}
            onChangeText={setQuery}
            onFocus={handleSearchFocus}
            placeholder="Search emergencies..."
          />

          {filteredEmergencies.map((item) => (
            <EmergencyCard
              key={item.id}
              emergency={item}
              onPress={() => {
                setSelectedEmergency(item);
              }}
            />
          ))}
        </ScrollView>

        <EmergencyModal
          visible={selectedEmergency !== null}
          emergency={selectedEmergency}
          onClose={() => setSelectedEmergency(null)}
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
