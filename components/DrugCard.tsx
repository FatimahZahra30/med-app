import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ChevronRight } from "lucide-react-native";

import { theme } from "@/constants/theme";
import { Drug } from "@/types/drug";
import { calculateDose } from "@/utils/calculations";
import { CATEGORY_COLORS } from "@/constants/categoryColors";


type DrugCardProps = {
  drug: Drug;
  weight: number;
  onPress?: () => void;
};


export default function DrugCard({
  drug,
  weight,
  onPress,
}: DrugCardProps) {


  const result = calculateDose(weight, drug);


  const categoryColor =
    CATEGORY_COLORS[drug.category];



  return (

    <Pressable

      onPress={onPress}

      style={({ pressed }) => [
        styles.container,

        pressed && styles.pressed,
      ]}

    >


      {/* Main content */}

      <View style={styles.content}>


        <Text style={styles.name}>
          {drug.name}
        </Text>



        <Text style={styles.subtitle}>
          {drug.range} · {drug.indication}
        </Text>




        {/* Category Badge */}

        <View
          style={[
            styles.badge,
            {
              backgroundColor:
                categoryColor.light,

              borderColor:
                categoryColor.border,
            },
          ]}
        >

          <Text
            style={[
              styles.badgeText,
              {
                color:
                  categoryColor.text,
              },
            ]}
          >

            {drug.category}

          </Text>

        </View>


      </View>




      {/* Dose */}

      <View style={styles.right}>


        <View style={styles.doseRow}>

          <Text
            style={[
              styles.amount,
              {
                color:
                  categoryColor.bg,
              },
            ]}
          >

            {result.amount}

          </Text>


          <Text style={styles.unit}>

            {result.unit}

          </Text>


        </View>




        <View style={styles.infoRow}>


          <Text
            style={[
              styles.info,
              {
                color:
                  categoryColor.text,
              },
            ]}
          >

            Info

          </Text>



          <ChevronRight

            size={16}

            color={categoryColor.text}

          />


        </View>


      </View>


    </Pressable>

  );
}



const styles = StyleSheet.create({


  container: {

    backgroundColor:
      theme.colors.card,


    borderRadius: 22,


    borderWidth: 1,

    borderColor:
      theme.colors.border,


    padding: 18,


    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",


    marginBottom:
      theme.spacing.md,


    ...theme.shadow.card,

  },



  content: {

    flex: 1,

    paddingRight: 12,

  },



  name: {

    fontSize: 18,

    fontWeight: "800",

    color:
      theme.colors.foreground,

  },



  subtitle: {

    marginTop: 5,

    fontSize: 13,

    lineHeight: 18,

    color:
      theme.colors.mutedForeground,

  },



  badge: {

    alignSelf: "flex-start",

    marginTop: 10,


    paddingHorizontal: 10,

    paddingVertical: 5,


    borderRadius: 999,


    borderWidth: 1,

  },



  badgeText: {

    fontSize: 12,

    fontWeight: "700",


    textTransform: "capitalize",

  },



  right: {

    alignItems: "flex-end",

    justifyContent: "center",

  },



  doseRow: {

    flexDirection: "row",

    alignItems: "baseline",

  },



  amount: {

    fontSize: 30,

    fontWeight: "800",

  },



  unit: {

    marginLeft: 5,


    fontSize: 16,

    fontWeight: "600",

    color:
      theme.colors.mutedForeground,

  },



  infoRow: {

    flexDirection: "row",

    alignItems: "center",

    marginTop: 10,

  },



  info: {

    fontSize: 13,

    fontWeight: "700",

  },



  pressed: {

    opacity: 0.85,

    transform: [
      {
        scale: 0.985,
      },
    ],

  },


});