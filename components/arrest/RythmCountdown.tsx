import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import {
  Pause,
  Play,
} from "lucide-react-native";


type Props = {
  remaining:number;
  running:boolean;
  onToggle:()=>void;
};


export default function RhythmCountdown({
  remaining,
  running,
  onToggle,
}:Props){


  const minutes =
    Math.floor(remaining / 60);

  const seconds =
    remaining % 60;


  const progress =
    ((120 - remaining) / 120) * 100;



  return (

    <View style={styles.container}>


      <View style={styles.header}>

        <Text style={styles.title}>
          RHYTHM CHECK TIMER
        </Text>


        <Pressable
          onPress={onToggle}
          style={styles.button}
        >

          {
            running
            ?
            <Pause size={18} color="#111827"/>
            :
            <Play size={18} color="#111827"/>
          }

        </Pressable>

      </View>



      <Text style={styles.time}>
        {minutes}:{seconds
          .toString()
          .padStart(2,"0")}
      </Text>



      <View style={styles.track}>

        <View
          style={[
            styles.progress,
            {
              width:`${progress}%`
            }
          ]}
        />

      </View>


    </View>

  );

}



const styles = StyleSheet.create({

container:{
  marginTop:20,
  padding:16,
  borderRadius:18,
  backgroundColor:"#F8FAFC",
  borderWidth:1,
  borderColor:"#CBD5E1",
},


header:{
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center",
},


title:{
  fontSize:12,
  fontWeight:"800",
  letterSpacing:1,
  color:"#64748B",
},


time:{
  marginTop:5,
  fontSize:34,
  fontWeight:"800",
  color:"#111827",
},


button:{
  width:36,
  height:36,
  borderRadius:12,
  alignItems:"center",
  justifyContent:"center",
  backgroundColor:"#E2E8F0",
},


track:{
  height:8,
  backgroundColor:"#E5E7EB",
  borderRadius:10,
  overflow:"hidden",
  marginTop:14,
},


progress:{
  height:"100%",
  backgroundColor:"#DC2626",
},

});