import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

import {
  ChevronRight,
  RotateCcw,
  Square,
  SquareCheckBig,
  TriangleAlert,
} from "lucide-react-native";

import { theme } from "@/constants/theme";
import { DASPlan } from "@/types/das";


type Props = {
  plan: DASPlan;
  checkedSteps: string[];
  onToggleStep: (step: string) => void;
  onNext: () => void;
  onReset: () => void;
};


const GREEN = {
  primary: "#059669",
  light: "#ECFDF5",
  border: "#BBF7D0",
};


const DECISION_COLOURS = {
  normal: {
    background: "#FFF7ED",
    border: "#FED7AA",
    icon: "#D97706",
    text: "#793002",
  },

  emergency: {
    background: "#FEF2F2",
    border: "#FECACA",
    icon: "#DC2626",
    text: "#991B1B",
  },
};



export default function DASCard({
  plan,
  checkedSteps,
  onToggleStep,
  onNext,
  onReset,
}: Props) {

  const { width } = useWindowDimensions();


  const decisionColours =
    plan.id === "D"
      ? DECISION_COLOURS.emergency
      : DECISION_COLOURS.normal;



  return (
    <View
      style={[
        styles.wrapper,
        {
          width,
        },
      ]}
    >

      <View style={styles.card}>


        {/* Header */}

        <View
          style={[
            styles.header,
            {
              backgroundColor:
                GREEN.light,

              borderColor:
                GREEN.border,
            },
          ]}
        >

          <Text style={styles.title}>
            {plan.title}
          </Text>


          <Text style={styles.subtitle}>
            {plan.subtitle}
          </Text>

        </View>




        {/* Progress */}

        <Text style={styles.progress}>
          {checkedSteps.length} / {plan.steps.length} completed
        </Text>





        {/* Checklist */}

        <View style={styles.section}>

          {plan.steps.map((step) => {

            const checked =
              checkedSteps.includes(step);


            return (

              <Pressable
                key={step}
                style={styles.stepRow}
                onPress={() =>
                  onToggleStep(step)
                }
              >

                {
                  checked ? (

                    <SquareCheckBig
                      size={22}
                      color={GREEN.primary}
                      style={styles.checkbox}
                    />

                  ) : (

                    <Square
                      size={22}
                      color="#94A3B8"
                      style={styles.checkbox}
                    />

                  )
                }



                <Text
                  style={[
                    styles.stepText,
                    checked &&
                      styles.completedStep,
                  ]}
                >
                  {step}
                </Text>


              </Pressable>

            );

          })}


        </View>






        {/* Decision */}

        <View
          style={[
            styles.decisionCard,
            {
              backgroundColor:
                decisionColours.background,

              borderColor:
                decisionColours.border,
            },
          ]}
        >


          <View style={styles.decisionRow}>


            <TriangleAlert
              size={18}
              color={decisionColours.icon}
              style={styles.decisionIcon}
            />



            <Text
              style={[
                styles.decisionText,
                {
                  color:
                    decisionColours.text,
                },
              ]}
            >
              {plan.decision}
            </Text>


          </View>


        </View>





        {/* Next */}

        {plan.nextPlan && (

          <Pressable
            onPress={onNext}
            style={styles.nextButton}
          >

            <Text style={styles.nextText}>
              Proceed to Plan {plan.nextPlan}
            </Text>


            <ChevronRight
              size={16}
              color={GREEN.primary}
            />

          </Pressable>

        )}






        {/* Reset */}

        <Pressable
          onPress={onReset}
          style={styles.resetButton}
        >

          <RotateCcw
            size={18}
            color={
              theme.colors.mutedForeground
            }
          />


          <Text style={styles.resetText}>
            Reset to Plan A
          </Text>


        </Pressable>


      </View>

    </View>
  );
}




const styles = StyleSheet.create({

  wrapper:{
    paddingHorizontal: theme.spacing.lg,
  },


  card:{
    backgroundColor:
      theme.colors.card,

    borderRadius:24,

    padding:20,

    borderWidth:1,

    borderColor:
      theme.colors.border,

    ...theme.shadow.card,
  },



  header:{
    borderRadius:18,

    borderWidth:1,

    padding:18,

    marginBottom:20,
  },


  title:{
    fontSize:24,

    fontWeight:"800",

    color:
      theme.colors.foreground,
  },


  subtitle:{
    marginTop:6,

    fontSize:15,

    lineHeight:22,

    color:
      theme.colors.mutedForeground,
  },



  progress:{
    marginBottom:18,

    fontSize:14,

    fontWeight:"700",

    color:
      GREEN.primary,
  },



  section:{
    gap:16,
  },



  stepRow:{
    flexDirection:"row",

    alignItems:"flex-start",

    gap:12,
  },


  checkbox:{
    marginTop:3,
  },



  stepText:{
    flex:1,

    fontSize:15,

    lineHeight:23,

    color:
      theme.colors.foreground,
  },



  completedStep:{
    textDecorationLine:
      "line-through",

    opacity:0.65,
  },



  decisionCard:{
    marginTop:24,

    borderRadius:18,

    borderWidth:1,

    padding:18,
  },



  decisionRow:{
    flexDirection:"row",

    alignItems:"flex-start",

    gap:10,
  },


  decisionIcon:{
    marginTop:3,
  },



  decisionText:{
    flex:1,

    fontSize:15,

    fontWeight:"600",

    lineHeight:23,
  },



  nextButton:{
    marginTop:12,

    flexDirection:"row",

    alignItems:"center",

    alignSelf:"flex-start",

    gap:4,

    paddingHorizontal:12,

    paddingVertical:7,

    borderRadius:999,

    backgroundColor:"#ECFDF5",

    borderWidth:1,

    borderColor:"#86EFAC",
  },



  nextText:{
    fontWeight:"700",

    fontSize:15,

    color:"#059669",
  },



  resetButton:{
    marginTop:18,

    flexDirection:"row",

    justifyContent:"center",

    alignItems:"center",

    gap:8,

    paddingVertical:14,
  },


  resetText:{
    fontSize:15,

    fontWeight:"700",

    color:
      theme.colors.mutedForeground,
  },

});