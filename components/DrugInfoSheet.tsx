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
  AlertTriangle,
  Beaker,
  Clock3,
  Pill,
  ShieldAlert,
  Timer,
  X,
} from "lucide-react-native";

import { Drug } from "@/types/drug";
import { theme } from "@/constants/theme";
import { CATEGORY_COLORS } from "@/constants/categoryColors";


type Props = {
  visible: boolean;
  drug: Drug | null;
  calculatedDose: string;
  onClose: () => void;
};


export default function DrugInfoSheet({
  visible,
  drug,
  calculatedDose,
  onClose,
}: Props) {


  if (!drug) return null;


  const categoryColor =
    CATEGORY_COLORS[drug.category];


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

          <Text style={styles.title}>
            {drug.name}
          </Text>



          <Text
            style={[
              styles.category,
              {
                color: categoryColor.bg,
              },
            ]}
          >

            {drug.category.toUpperCase()}

          </Text>





          {/* Dose */}

          <View
            style={[
              styles.doseCard,
              {
                backgroundColor:
                  categoryColor.light,

                borderColor:
                  categoryColor.border,
              },
            ]}
          >


            <Text style={styles.smallLabel}>
              Calculated Dose
            </Text>



            <Text
              style={[
                styles.dose,
                {
                  color:
                    categoryColor.bg,
                },
              ]}
            >

              {calculatedDose}

            </Text>



            <Text style={styles.subtitle}>
              {drug.range} • {drug.indication}
            </Text>


          </View>






          <InfoCard
            title="Mechanism of Action"
            icon={
              <Pill
                size={18}
                color={categoryColor.bg}
              />
            }
            body={drug.mechanism}
          />



          <InfoCard
            title="Onset"
            icon={
              <Timer
                size={18}
                color={categoryColor.bg}
              />
            }
            body={drug.onset}
          />



          <InfoCard
            title="Duration"
            icon={
              <Clock3
                size={18}
                color={categoryColor.bg}
              />
            }
            body={drug.duration}
          />



          <InfoCard
            title="Metabolism & Clearance"
            icon={
              <Beaker
                size={18}
                color={categoryColor.bg}
              />
            }
            body={drug.metabolism}
          />





          {drug.cautions.length > 0 && (

            <WarningCard
              title="Cautions"
              icon={
                <AlertTriangle
                  size={18}
                  color="#D97706"
                />
              }
              colour="#FFF7ED"
              borderColor="#FED7AA"
              items={drug.cautions}
            />

          )}






          {drug.contraindications.length > 0 && (

            <WarningCard
              title="Contraindications"
              icon={
                <ShieldAlert
                  size={18}
                  color="#DC2626"
                />
              }
              colour="#FEF2F2"
              borderColor="#FECACA"
              items={drug.contraindications}
            />

          )}






          <Text style={styles.footer}>
            Always verify doses with your local
            institutional guidelines before
            administration.
          </Text>



        </ScrollView>


      </View>


    </Modal>

  );

}






function InfoCard({
  title,
  icon,
  body,
}: {
  title: string;
  icon: React.ReactNode;
  body: string;
}) {

  return (

    <View style={styles.card}>


      <View style={styles.header}>

        {icon}


        <Text style={styles.cardTitle}>
          {title}
        </Text>


      </View>


      <Text style={styles.body}>
        {body}
      </Text>


    </View>

  );

}






function WarningCard({
  title,
  icon,
  colour,
  borderColor,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  colour: string;
  borderColor: string;
  items: string[];
}) {


  return (

    <View
      style={[
        styles.card,
        {
          backgroundColor: colour,
          borderColor,
        },
      ]}
    >


      <View style={styles.header}>

        {icon}


        <Text style={styles.cardTitle}>
          {title}
        </Text>


      </View>




      {items.map((item) => (

        <Text
          key={item}
          style={styles.body}
        >
          • {item}
        </Text>

      ))}


    </View>

  );

}







const styles = StyleSheet.create({

  overlay: {
    flex: 1,

    backgroundColor:
      "rgba(0,0,0,0.45)",
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


    backgroundColor:
      "#F3F4F6",


    zIndex: 20,

  },



  title: {

    fontSize: 30,

    fontWeight: "800",


    color:
      theme.colors.foreground,

  },



  category: {

    marginTop: 4,

    fontSize: 13,

    fontWeight: "800",

    letterSpacing: 1,

  },



  doseCard: {

    borderRadius: 24,

    borderWidth: 1.5,


    padding: 22,


    marginVertical: 24,


    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,


    elevation: 3,

  },



  smallLabel: {

    color:
      theme.colors.mutedForeground,

    fontWeight: "600",

  },



  dose: {

    marginTop: 6,

    fontSize: 42,

    fontWeight: "800",

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



  header: {

    flexDirection: "row",

    alignItems: "center",


    marginBottom: 12,

  },



  cardTitle: {

    marginLeft: 8,


    fontSize: 16,


    fontWeight: "700",


    color:
      theme.colors.foreground,

  },



  body: {

    fontSize: 15,


    lineHeight: 24,


    color:
      theme.colors.foreground,

  },



  footer: {

    marginTop: 10,


    marginBottom: 50,


    textAlign: "center",


    lineHeight: 20,


    fontSize: 12,


    color:
      theme.colors.mutedForeground,

  },

});