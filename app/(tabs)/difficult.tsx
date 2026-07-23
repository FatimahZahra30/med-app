import { useState } from "react";

import {
  ScrollView,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { TriangleAlert } from "lucide-react-native";

import { theme } from "@/constants/theme";

import { dasPlans } from "@/data/das";

import ScreenHeader from "@/components/ScreenHeader";
import ClinicalNotice from "@/components/ClinicalNotice";
import DASTabs from "@/components/DASTabs";
import DASCard from "@/components/DASCard";


type PlanID = "A" | "B" | "C" | "D";


export default function DifficultAirwayScreen() {

  const [selectedPlan, setSelectedPlan] =
    useState<PlanID>("A");


  const [checkedSteps, setCheckedSteps] =
  useState<Record<PlanID, string[]>>({
    A: [],
    B: [],
    C: [],
    D: [],
  });



  const currentPlan =
    dasPlans.find(
      (plan) => plan.id === selectedPlan
    )!;



  const toggleStep = (step: string) => {

  setCheckedSteps((prev) => {

    const current = prev[selectedPlan];

    return {
      ...prev,

      [selectedPlan]: current.includes(step)

        ? current.filter((s) => s !== step)

        : [...current, step],
    };

  });

};




  const handlePlanChange = (plan: PlanID) => {

  setSelectedPlan(plan);

};





  const handleNext = () => {

    if (currentPlan.nextPlan) {

      handlePlanChange(
        currentPlan.nextPlan as PlanID
      );

    }

  };




  const handleReset = () => {

  setSelectedPlan("A");

  setCheckedSteps({
    A: [],
    B: [],
    C: [],
    D: [],
  });

};




  return (

    <SafeAreaView

      style={styles.container}

      edges={["top"]}

    >

      <ScrollView

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.content}

      >



        <ScreenHeader

          title="Difficult Airway Society"

          subtitle="DAS 2015 Adult Airway Algorithm"

          gradient={[
            "#059669",
            "#2ebe91",
          ]}

        />




        <ClinicalNotice

          title="Clinical Reference"

          icon={
            <TriangleAlert
              size={18}
              color="#D97706"
            />
          }

          colour="#FFF7ED"

          borderColour="#FED7AA"

          titleColour="#D97706"

          bodyColour="#92400E"

          body="Based on the Difficult Airway Society (DAS) 2015 Guidelines for the management of unanticipated difficult intubation in adults. Always call for senior assistance early and follow your local institutional protocol."

        />




        <DASTabs

          selected={selectedPlan}

          onSelect={handlePlanChange}

        />




        <DASCard

          plan={currentPlan}

          checkedSteps={checkedSteps[selectedPlan]}

          onToggleStep={toggleStep}

          onNext={handleNext}

          onReset={handleReset}

        />



      </ScrollView>


    </SafeAreaView>

  );

}



const styles = StyleSheet.create({

  container: {

    flex: 1,

    backgroundColor:
      theme.colors.background,

  },


  content: {

    paddingHorizontal:
      theme.spacing.lg,

    paddingTop:
      theme.spacing.md,

    paddingBottom: 120,

  },

});