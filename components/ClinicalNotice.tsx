import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { theme } from "@/constants/theme";


type Props = {

  icon: React.ReactNode;

  title?: string;

  body: string;

  colour?: string;

  borderColour?: string;

  titleColour?: string;

  bodyColour?: string;

};


export default function ClinicalNotice({

  icon,

  title,

  body,

  colour = "#FEF2F2",

  borderColour = "#FECACA",

  titleColour = "#DC2626",

  bodyColour = theme.colors.foreground,

}: Props) {


  return (

    <View

      style={[
        styles.container,

        {
          backgroundColor: colour,

          borderColor: borderColour,
        },

      ]}

    >


      <View style={styles.header}>


        {icon}



        <View style={styles.content}>


          {title && (

            <Text

              style={[
                styles.title,

                {
                  color: titleColour,
                },

              ]}

            >

              {title}

            </Text>

          )}



          <Text
            style={[
                styles.body,
                {
                color: bodyColour,
                },
            ]}
            >
            {body}
            </Text>


        </View>


      </View>


    </View>

  );

}



const styles = StyleSheet.create({


  container: {

    borderRadius: 20,

    padding: 18,

    paddingBottom: 10,

    marginBottom: 16,


    borderWidth: 1,

  },


  header: {

    flexDirection: "row",

    alignItems: "flex-start",

  },


  content: {

    flex: 1,

    marginLeft: 10,

    marginTop: -2,

  },


  title: {

    fontSize: 16,

    fontWeight: "800",

    marginBottom: 6,

  },


  body: {

    fontSize: 14,

    lineHeight: 21,

  },


});