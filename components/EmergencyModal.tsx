import React from "react";

import {
    Alert,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  ClipboardList,
  CircleAlert,
  Pill,
  Stethoscope,
  X,
  TriangleAlert,
  AlertCircle,
  AlertOctagonIcon,
} from "lucide-react-native";

import { theme } from "@/constants/theme";
import { Emergency } from "@/types/emergency";
import ClinicalNotice from "./ClinicalNotice";


type Props = {
  visible: boolean;

  emergency: Emergency | null;

  onClose: () => void;
};


export default function EmergencyModal({
  visible,
  emergency,
  onClose,
}: Props) {


  if (!emergency) return null;


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

              {emergency.title}

            </Text>



            <Text style={styles.categoryLabel}>

              {emergency.category.toUpperCase()}

            </Text>


          </View>




          {/* Emergency Category Card */}


          <View style={styles.summaryCard}>


            <Text style={styles.smallLabel}>

              Emergency Category

            </Text>



            <Text style={styles.category}>

              {emergency.category.toUpperCase()}

            </Text>



            <Text style={styles.subtitle}>

              RCoA / AAGBI Clinical Reference

            </Text>


          </View>





          {/* Recognition */}

          <Section

            title="Recognition"

            icon={

              <Stethoscope

                size={18}

                color="#f54593"

              />

            }

            items={emergency.recognition}

          />




          {/* Immediate Management */}

          <Section

            title="Immediate Management"

            icon={

              <CircleAlert

                size={18}

                color="#f54593"

              />

            }

            items={emergency.immediateManagement}

          />




          {/* Secondary Management */}

          <Section

            title="Secondary Management"

            icon={

              <AlertOctagonIcon

                size={18}

                color="#f54593"

              />

            }

            items={emergency.secondaryManagement}

          />





          {/* Drugs */}

          {emergency.drugs && emergency.drugs.length > 0 && (

            <View style={styles.card}>


              <View style={styles.sectionHeader}>


                <Pill

                  size={18}

                  color="#f54593"

                />


                <Text style={styles.sectionTitle}>

                  Key Drugs & Doses

                </Text>


              </View>



              {emergency.drugs.map((drug) => (

                <View

                  key={drug.name}

                  style={styles.drugRow}

                >


                  <Text style={styles.drugName}>

                    {drug.name}

                  </Text>



                  <Text style={styles.drugDose}>

                    {drug.dose}

                  </Text>


                </View>

              ))}


            </View>

          )}






          {/* Clinical Notes */}

            {emergency.notes && (

            <ClinicalNotice


                icon={
                <TriangleAlert
                    size={18}
                    color="#D97706"
                />
                }

                body={emergency.notes}

                colour="#FFF7ED"

                borderColour="#FED7AA"

                titleColour="#D97706"

                bodyColour="#793308"

            />

            )}




          <Text style={styles.footer}>

            Clinical reference only. Always follow

            local institutional protocols and

            seek senior support early.

          </Text>


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

  items: string[];

}) {


  return (

    <View style={styles.card}>


      <View style={styles.sectionHeader}>


        {icon}


        <Text style={styles.sectionTitle}>

          {title}

        </Text>


      </View>





      {items.map((item) => (

        <View

          key={item}

          style={styles.bulletRow}

        >


          <View style={styles.bullet} />



          <Text style={styles.body}>

            {item}

          </Text>


        </View>

      ))}



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


    color: "#DB2777",

  },



  summaryCard: {

    backgroundColor: "#ffedf1",


    borderRadius: 24,


    borderWidth: 1.5,

    borderColor: "#f54593",


    padding: 22,


    marginVertical: 24,


    shadowColor: "#DB2777",

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


    color: "#DB2777",

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


    color: "#DB2777",

  },



  bulletRow: {

    flexDirection: "row",


    alignItems: "flex-start",


    marginBottom: 12,

  },



  bullet: {

    width: 5,

    height: 5,


    borderRadius: 999,


    backgroundColor: "#DB2777",


    marginTop: 8,


    marginRight: 12,

  },



  body: {

    flex: 1,


    fontSize: 15,


    lineHeight: 23,


    color:
      theme.colors.foreground,

  },



  drugRow: {

    paddingVertical: 14,


    borderBottomWidth: 1,


    borderBottomColor: "#F1F5F9",

  },



  drugName: {

    fontSize: 15,


    fontWeight: "700",


    color:
      theme.colors.foreground,

  },



  drugDose: {

    marginTop: 4,


    fontSize: 15,


    fontWeight: "600",


    color: "#DB2777",

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