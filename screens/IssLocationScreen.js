import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import axios from "axios";
import MapView, { Marker } from "react-native-maps";
export default class IssLocationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
    };
  }
  getIssLocation = () => {
    axios
      .get("https://api.wheretheiss.at/v1/satellites/25544")
      .then((response) => {
        this.setState({
          location: response.data,
        }).catch((error) => {
          Alert.alert(error.message);
        });
      });
  };
  componentDidMount() {
    this.getIssLocation();
  }

  render() {
    if (Object.keys(this.state.location).length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading your Iss location...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <ImageBackground
            style={styles.backgroundImage} //corrected capitalisation
            source={require("../assets/iss_icon.png")}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}> ISS LOCATION SCREEN!</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.infoText}>
                Latitude:{this.state.location.latitude}
              </Text>
              <Text style={styles.infoText}>
                Longitude:{this.state.location.longitude}
              </Text>
              <Text style={styles.infoText}>
                Altitude(KM):{this.state.location.altitude}
              </Text>
              <Text style={styles.infoText}>
                Velocity(Kmph):{this.state.location.velocity}
              </Text>
            </View>
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                region={{
                  latitude: this.state.location.lattitude,
                  longitude: this.state.location.longitude,
                  latitudeDelta: 100,
                  longitudeDelta: 100,
                }}
              ></MapView>
              <Marker
                coordinate={{
                  latitude: this.state.location.latitude,
                  longitude: this.state.location.longitude,
                }}
              >
                <Image source={require("../assets/iss_icon.png")} />
              </Marker>
            </View>
          </ImageBackground>
          <View style={{ flex: 2 }}>
            <Text>PS.VERY HARD TO RECREATE</Text>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  backgroundImage: { flex: 1, resizeMode: "cover" },
  titleContainer: { flex: 0.1, justifyContent: "center", alignItems: "center" },
  titleText: { fontSize: 30, fontWeight: "bold", color: "white" },
  mapContainer: { flex: 0.7 },
  map: { width: "80%", height: "80%" },
  infoContainer: {
    flex: 0.2,
    backgroundColor: "white",
    marginTop: -10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  infoText: { fontSize: 15, color: "black", fontWeight: "bold" },
});
