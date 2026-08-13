import { useRef, useState } from "react";

import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { TriangleAlert } from "lucide-react-native";

import { theme } from "@/constants/theme";
import { dasPlans } from "@/data/das";
import { DASPlan } from "@/types/das";

import ScreenHeader from "@/components/ScreenHeader";
import ClinicalNotice from "@/components/ClinicalNotice";
import DASTabs from "@/components/DASTabs";
import DASCard from "@/components/DASCard";


type PlanID = "A" | "B" | "C" | "D";


export default function DifficultAirwayScreen() {

  const { width } = useWindowDimensions();

  const flatListRef =
    useRef<FlatList<DASPlan>>(null);



  const [selectedPlan, setSelectedPlan] =
    useState<PlanID>("A");



  const [checkedSteps, setCheckedSteps] =
    useState<Record<PlanID, string[]>>({
      A: [],
      B: [],
      C: [],
      D: [],
    });



  const planIndex: Record<PlanID, number> = {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
  };



  const toggleStep = (step: string) => {

    setCheckedSteps((prev) => {

      const current =
        prev[selectedPlan];


      return {
        ...prev,

        [selectedPlan]:

          current.includes(step)

          ? current.filter(
              (s) => s !== step
            )

          : [
              ...current,
              step,
            ],
      };

    });

  };



  const changePlan = (plan: PlanID) => {

    setSelectedPlan(plan);


    flatListRef.current?.scrollToIndex({

      index:
        planIndex[plan],

      animated:true,

    });

  };



  const handleSwipe = (
    event:
    NativeSyntheticEvent<NativeScrollEvent>
  ) => {

    const index =
      Math.round(
        event.nativeEvent.contentOffset.x /
        width
      );


    const plans: PlanID[] = [
      "A",
      "B",
      "C",
      "D",
    ];


    if(plans[index]){

      setSelectedPlan(
        plans[index]
      );

    }

  };



  const handleNext = () => {

    const current =
      dasPlans.find(
        (p) =>
          p.id === selectedPlan
      );


    if(current?.nextPlan){

      changePlan(
        current.nextPlan as PlanID
      );

    }

  };



  const handleReset = () => {

    setCheckedSteps({

      A:[],
      B:[],
      C:[],
      D:[],

    });


    changePlan("A");

  };




  return (

    <SafeAreaView

      style={styles.container}

      edges={["top"]}

    >


      <ScrollView

        showsVerticalScrollIndicator={false}

        nestedScrollEnabled

        contentContainerStyle={
          styles.scrollContent
        }

      >


        <View
          style={styles.headerContainer}
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

            onSelect={changePlan}

          />


        </View>





        <FlatList

          ref={flatListRef}

          data={dasPlans}

          horizontal

          pagingEnabled

          nestedScrollEnabled

          showsHorizontalScrollIndicator={false}

          onMomentumScrollEnd={
            handleSwipe
          }


          keyExtractor={(item)=>
            item.id
          }



          renderItem={({item})=>{

            const planId =
              item.id as PlanID;


            return (

              <View

                style={[
                  styles.page,
                  {
                    width,
                  },
                ]}

              >

                <DASCard

                  plan={item}

                  checkedSteps={
                    checkedSteps[planId]
                  }

                  onToggleStep={
                    toggleStep
                  }

                  onNext={
                    handleNext
                  }

                  onReset={
                    handleReset
                  }

                />


              </View>

            );

          }}



          getItemLayout={
            (_,index)=>({

              length: width,

              offset:
                width * index,

              index,

            })
          }


        />


      </ScrollView>


    </SafeAreaView>

  );

}





const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:
      theme.colors.background,
  },


  headerContainer:{
    paddingHorizontal:
      theme.spacing.lg,

    paddingTop:
      theme.spacing.md,
  },


  page:{
    alignItems:"center",

    paddingHorizontal:
      theme.spacing.lg,

  },


  scrollContent:{
    paddingBottom:120,
  },

});