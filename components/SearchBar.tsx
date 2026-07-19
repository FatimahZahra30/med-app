import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import {
  Search,
} from "lucide-react-native";

import { theme } from "@/constants/theme";


type SearchBarProps = {

  value: string;

  onChangeText:
    (text:string)=>void;

  onFocus?: ()=>void;

};



export default function SearchBar({

  value,

  onChangeText,

  onFocus,

}: SearchBarProps) {


  return (

    <View style={styles.container}>


      <Search

        size={20}

        color={
          theme.colors.mutedForeground
        }

      />


      <TextInput

        style={styles.input}

        placeholder="Search drugs..."

        placeholderTextColor={
          theme.colors.mutedForeground
        }

        value={value}

        onChangeText={onChangeText}

        onFocus={onFocus}

        keyboardType="default"

      />


    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    flexDirection:"row",

    alignItems:"center",

    backgroundColor:
      theme.colors.card,


    borderRadius:
      theme.radius.lg,


    borderWidth:1,

    borderColor:
      theme.colors.border,


    paddingHorizontal:16,

    height:52,


    marginBottom:
      theme.spacing.md,


    ...theme.shadow.card,

  },


  input: {

    flex:1,

    marginLeft:10,

    fontSize:15,

    color:
      theme.colors.foreground,

  },

});