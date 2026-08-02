import { useEffect, useRef, useState } from "react";

import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { theme } from "@/constants/theme";

import ScreenHeader from "@/components/ScreenHeader";
import ArrestTimer from "@/components/arrest/ArrestTimer";
import ArrestCard from "@/components/arrest/ArrestCard";

import { arrestFlow } from "@/data/cardiacArrest";

export default function CardiacArrestScreen() {
  const scrollRef = useRef<ScrollView>(null);

  const [elapsed, setElapsed] = useState(0);

  const [started, setStarted] = useState(false);
  const [running, setRunning] = useState(false);

  const [rhythmRemaining, setRhythmRemaining] =
    useState(120);

  const [rhythmRunning, setRhythmRunning] =
    useState(false);

  const [currentNodeId, setCurrentNodeId] =
    useState("start");

  const [checkedSteps, setCheckedSteps] =
    useState<string[]>([]);


  const currentNode = arrestFlow[currentNodeId];


  // TOTAL ARREST TIMER
  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    },1000);

    return () => clearInterval(interval);

  },[running]);



  // 2 MIN CPR COUNTDOWN
  useEffect(() => {
    if (!rhythmRunning) return;

    if (rhythmRemaining <= 0) {
      setRhythmRunning(false);
      return;
    }

    const interval = setInterval(() => {
      setRhythmRemaining(prev => prev - 1);
    },1000);


    return () => clearInterval(interval);

  },[
    rhythmRunning,
    rhythmRemaining
  ]);



  const startRhythmTimer = () => {
    setRhythmRemaining(120);
    setRhythmRunning(true);
  };



  const toggleTimer = () => {
    setRunning(prev => !prev);
  };



  const toggleRhythmTimer = () => {
    setRhythmRunning(prev => !prev);
  };



  const toggleStep = (step:string) => {
    setCheckedSteps(prev =>
      prev.includes(step)
        ? prev.filter(item => item !== step)
        : [...prev,step]
    );
  };



  const handleYes = () => {

    if (!currentNode.yes) return;


    if (currentNodeId === "start") {
      setStarted(true);
      setRunning(true);
    }


    // START CPR COUNTDOWN WHEN ENTERING CPR CYCLE
    if (
      currentNode.yes === "shock1" ||
      currentNode.yes === "shock2" ||
      currentNode.yes === "cpr1" ||
      currentNode.yes === "cpr2" ||
      currentNode.yes === "nonshockable" ||
      currentNode.yes === "peaCpr"
    ) {
      startRhythmTimer();
    }



    setCheckedSteps([]);

    setCurrentNodeId(currentNode.yes);


    scrollRef.current?.scrollTo({
      y:0,
      animated:true,
    });

  };



  const handleNo = () => {

    if (!currentNode.no) return;


    if (currentNodeId === "start") {
      setStarted(true);
      setRunning(true);
    }


    if (
      currentNode.no === "nonshockable"
    ) {
      startRhythmTimer();
    }



    setCheckedSteps([]);

    setCurrentNodeId(currentNode.no);


    scrollRef.current?.scrollTo({
      y:0,
      animated:true,
    });

  };



  const handleReset = () => {

    setElapsed(0);

    setStarted(false);
    setRunning(false);

    setRhythmRemaining(120);
    setRhythmRunning(false);

    setCheckedSteps([]);

    setCurrentNodeId("start");


    scrollRef.current?.scrollTo({
      y:0,
      animated:true,
    });

  };



  return (

    <SafeAreaView
      style={styles.container}
      edges={["top"]}
    >

      <KeyboardAvoidingView
        style={{flex:1}}
        behavior={
          Platform.OS === "ios"
          ?"padding"
          :undefined
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
            title="Cardiac Arrest Algorithm"
            subtitle="ALS Protocol · Interactive Walkthrough"
            gradient={[
              "#DC2626",
              "#EF4444",
            ]}
            titleSize={20}
          />



          <ArrestTimer
            elapsed={elapsed}
            started={started}
            running={running}
            onToggle={toggleTimer}
          />



          <ArrestCard
            node={currentNode}
            checkedSteps={checkedSteps}
            onToggleStep={toggleStep}
            onYes={handleYes}
            onNo={handleNo}
            onReset={handleReset}

            showRhythmTimer={
              rhythmRunning ||
              rhythmRemaining < 120
            }

            rhythmRemaining={
              rhythmRemaining
            }

            rhythmRunning={
              rhythmRunning
            }

            onToggleRhythm={
              toggleRhythmTimer
            }

          />


        </ScrollView>

      </KeyboardAvoidingView>

    </SafeAreaView>

  );
}



const styles = StyleSheet.create({

  container:{
    flex:1,
    backgroundColor:
      theme.colors.background,
  },

  content:{
    paddingHorizontal:
      theme.spacing.lg,

    paddingTop:
      theme.spacing.md,

    paddingBottom:120,

    gap:18,
  },

});