import { black, bold } from "ansi-colors";
import React from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default class HomeScreen extends React.Component  {
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.droidSafeArea} />
        <ImageBackground style={styles.backGroundImage} source={require('../assets/bg.png')}>
     
        <View style={styles.titleBar}>
          <Text style={styles.titleText}>IssTrackerApp</Text>
        </View>
        <TouchableOpacity style={styles.routeCard} onPress={()=>{
          this.props.navigation.navigate('IssLocation')
        }}>
          <Text style={styles.routeText}>ISS Location</Text>
          <Text style={styles.knowMore}>{"know More---> "}</Text>
          <Text style={styles.bgDigit}>1 </Text>
          <Image source={require('../assets/iss_icon.png')} style={styles.iconImage}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.routeCard} onPress={()=>{
          this.props.navigation.navigate('Meteor')
        }}>
          <Text style={styles.routeText}>Meteors</Text>
          <Text style={styles.knowMore}>{"know More---> "}</Text>
          <Text style={styles.bgDigit}>2 </Text>
          <Image source={require('../assets/meteor_icon.png')} style={styles.iconImage}/>
        </TouchableOpacity>
        </ImageBackground >
    
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleBar: { flex: 0.15, justifyContent: "center", alignItems: "center" },
  routeCard: {

    flex: 0.25,
    marginLeft: 15,
    marginRight: 50,
    marginTop: 50,
    borderRadius: 30,
    backgroundColor: "rgba(52,52,52,0.5)",
  },
  titleText:{fontSize:40,fontWeight:'bold',color:'white'},
  routeText:{fontSize:35,fontWeight:"bold",color:'black',marginTop:75,paddingLeft:30},
  backGroundImage:{flex:1,resizeMode:'cover'},
  knowMore:{paddingLeft:30,color:'red',fontSize:15},
  bgDigit:{position:"absolute",color:'rgba(183,183,183,0.5)'},
  iconImage:{position:"absolute",height:200,width:200,resizeMode:"contain",right:20,top:-80}
});
