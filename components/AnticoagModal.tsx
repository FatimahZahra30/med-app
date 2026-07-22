import React from "react";

import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Pill,
  X,
  TriangleAlert,
  FlaskConical,
  Undo2,
  Clock,
  Activity,
  Microscope,
} from "lucide-react-native";

import { theme } from "@/constants/theme";
import { Anticoagulant } from "@/types/anticoagulant";
import ClinicalNotice from "./ClinicalNotice";


type Props = {
  visible: boolean;

  anticoag: Anticoagulant | null;

  onClose: () => void;
};


export default function AnticoagulantModal({
  visible,
  anticoag,
  onClose,
}: Props) {


  if (!anticoag) return null;


  return (
    <Modal
    
          visible={visible}
    
          animationType="slide"
    
          transparent
    
          statusBarTranslucent
    
          onRequestClose={onClose}
    
        >
    
          <Pressable
    
            style={styles.overlay}
    
            onPress={onClose}
    
          />
    
    
          <View style={styles.sheet}>
    
    
            <Pressable
    
              style={styles.closeButton}
    
              onPress={onClose}
    
            >
    
              <X
    
                size={20}
    
                color={theme.colors.foreground}
    
              />
    
            </Pressable>
    
    
    
            <ScrollView
    
              showsVerticalScrollIndicator={false}
    
              contentContainerStyle={styles.content}
    
            >
    
    
              {/* Header */}
    
              <View style={styles.header}>
    
    
                <Text style={styles.title}>
    
                  {anticoag.name}
    
                </Text>
    
    
              </View>

              <View style={styles.bubbleRow}>
                {/* Withhold */}
                <View style={styles.redBubble}>
                <Text style={styles.labelRed}>
                    WITHHOLD
                </Text>
        
                <Text style={styles.value}>
                    {anticoag.hold}
                </Text>
                </View>
        
                {/* Restart */}
                <View style={styles.greenBubble}>
                <Text style={styles.labelGreen}>
                    RESTART AFTER
                </Text>
        
                <Text style={styles.value}>
                    {anticoag.restart}
                </Text>
                </View>
              </View>

              {/* Mechanism of Action */}

              <Section
              
                    title="Mechanism of Action"
        
                    icon={
        
                    <FlaskConical
        
                        size={18}
        
                        color="#D97706"
        
                    />
        
                    }
        
                    items={anticoag.mechanism}
        
                />

                {/* Reversal Agent */}

                <Section
                
                    title="Reversal Agent"
        
                    icon={
        
                        <Undo2
        
                        size={18}
        
                        color="#D97706"
        
                        />
        
                    }
        
                    items={anticoag.reversal}
        
                    />

                {/* Half life */}

                <Section
                
                    title="Half-Life"
        
                    icon={
        
                        <Clock
        
                        size={18}
        
                        color="#D97706"
        
                        />
        
                    }
        
                    items={anticoag.halfLife}
        
                    />
                
                {/* Onset of Action*/}
                <Section
                
                    title="Onset of Action"
        
                    icon={
        
                        <Activity
        
                        size={18}
        
                        color="#D97706"
        
                        />
        
                    }
        
                    items={anticoag.onset}
        
                    />
                
                {/*  Metabolism & Clearance */}

                <Section
                
                    title="Metabolism & Clearance"
        
                    icon={
        
                        <Microscope
        
                        size={18}
        
                        color="#D97706"
        
                        />
        
                    }
        
                    items={anticoag.metabolism}
        
                    />
                
                {/* Monitoring */}

                <Section
                
                    title="Monitoring"
        
                    icon={
        
                        <Pill
        
                        size={18}
        
                        color="#D97706"
        
                        />
        
                    }
        
                    items={anticoag.monitoring}
        
                    />
                
                {/* Clinical Notes */}
                
                {anticoag.note && (
    
                <ClinicalNotice
    
    
                    icon={
                    <TriangleAlert
                        size={18}
                        color="#D97706"
                    />
                    }
    
                    body={anticoag.note}
    
                    colour="#FFF7ED"
    
                    borderColour="#FED7AA"
    
                    titleColour="#D97706"
    
                    bodyColour="#793308"
    
                />
    
                )}
            </ScrollView>


            </View>


        </Modal>

    );

}

function Section({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string;
}) {
  return (
    <View style={styles.card}>

      <View style={styles.sectionHeader}>
        {icon}

        <Text style={styles.sectionTitle}>
          {title}
        </Text>
      </View>


      <Text style={styles.body}>
        {items}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,

    backgroundColor: "rgba(0,0,0,0.45)",
  },


  sheet: {
    position: "absolute",

    bottom: 0,

    width: "100%",

    height: "88%",


    backgroundColor:
      theme.colors.background,


    borderTopLeftRadius: 30,

    borderTopRightRadius: 30,


    paddingHorizontal: 24,

    paddingTop: 24,
  },



  content: {
    paddingBottom: 50,
  },



  closeButton: {

    position: "absolute",

    right: 18,

    top: 18,


    width: 38,

    height: 38,


    borderRadius: 19,


    justifyContent: "center",

    alignItems: "center",


    backgroundColor: "#F3F4F6",


    zIndex: 20,

  },



  header: {

    marginTop: 10,

    marginBottom: 8,

  },



  title: {

    fontSize: 30,

    fontWeight: "800",


    color:
      theme.colors.foreground,

  },



  categoryLabel: {

    marginTop: 6,


    fontSize: 13,


    fontWeight: "800",


    letterSpacing: 1,


    color: "#D97706",

  },

  redBubble: {
    flex: 1,

    minWidth: 0,

    backgroundColor: "#FEF2F2",

    borderRadius: 14,

    borderWidth: 1,

    borderColor: "#FECACA",

    paddingHorizontal: 14,

    paddingVertical: 12,

  },

  greenBubble: {
    flex: 1,

    minWidth: 0,

    backgroundColor: "#ECFDF5",

    borderRadius: 14,

    borderWidth: 1,

    borderColor: "#A7F3D0",

    paddingHorizontal: 14,

    paddingVertical: 12,
  },

  labelRed: {
    fontSize: 12,

    fontWeight: "800",

    color: "#DC2626",

    letterSpacing: 0.8,

    marginBottom: 4,
  },

  labelGreen: {
    fontSize: 12,

    fontWeight: "800",

    color: "#059669",

    letterSpacing: 0.8,

    marginBottom: 4,
  },

  value: {
    fontSize: 15,

    fontWeight: "600",

    color: theme.colors.foreground,
  },

bubbleRow: {
    flexDirection: "row",
    gap: 12,
    marginVertical: 12,
    marginBottom: 20,
  },

  summaryCard: {

    backgroundColor: "#ffedf1",


    borderRadius: 24,


    borderWidth: 1.5,

    borderColor: "#D97706",


    padding: 22,


    marginVertical: 24,


    shadowColor: "#D97706",

    shadowOffset: {

      width: 0,

      height: 4,

    },

    shadowOpacity: 0.12,

    shadowRadius: 8,


    elevation: 3,

  },



  smallLabel: {

    color:
      theme.colors.mutedForeground,


    fontWeight: "600",

  },



  category: {

    marginTop: 6,


    fontSize: 34,


    fontWeight: "800",


    color: "#D97706",

  },



  subtitle: {

    marginTop: 8,


    color:
      theme.colors.mutedForeground,

  },



  card: {

    backgroundColor:
      theme.colors.card,


    borderRadius: 20,


    padding: 18,


    marginBottom: 16,


    borderWidth: 1,


    borderColor:
      theme.colors.border,


    ...theme.shadow.card,

  },



  sectionHeader: {

    flexDirection: "row",


    alignItems: "center",


    marginBottom: 16,

  },



  sectionTitle: {

    marginLeft: 10,


    fontSize: 17,


    fontWeight: "800",


    color: "#D97706",

  },


  body: {

    flex: 1,


    fontSize: 15,


    lineHeight: 23,


    color:
      theme.colors.foreground,

  },




  footer: {

    marginTop: 10,


    marginBottom: 30,


    textAlign: "center",


    fontSize: 12,


    lineHeight: 20,


    color:
      theme.colors.mutedForeground,

  },

});