import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList,
  StatusBar, //added import
  SafeAreaView,
  ImageBackground,
  Image, //added import
  Dimensions, //added import
} from "react-native";
import axios from "axios";

export default class MeteorScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      meteors: {},
    };
  }
  getMeteors = () => {
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/feed?api_key=3KobdddrK2cz7wPTfvSWysKVNR50DL3MdhQJA5Zd"
      )
      .then((response) => {
        this.setState({
          meteors: response.data.near_earth_objects,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
  componentDidMount() {
    this.getMeteors();
  }
  keyExtractor = (item, index) => index.toString();
  renderItem = ({ item }) => {
    let meteor = item;
    let bg_img, speed, size;
    if (meteor.threatScore <= 30) {
      bg_img = require("../assets/meteor_bg1.png");
      speed = require("../assets/meteor_speed1.gif"); //corrected file name
      size = 100;
    } else if (meteor.threat_score <= 75) {
      bg_img = require("../assets/meteor_bg2.png");
      speed = require("../assets/meteor_speed2.gif"); //corrected file name
      size = 150;
    } else {
      bg_img = require("../assets/meteor_bg3.png");
      speed = require("../assets/meteor_speed3.gif");
      size = 200;
    }
    return (
      <View>
        <ImageBackground source={bg_img} style={styles.backgroundImage}>
          <View styles={styles.gifContainer}>
            <Image
              source={speed}
              style={{ width: size, height: size, alignSelf: "center" }}
            ></Image>
            <View>
              <Text
                style={[styles.cardTitle, { marginTop: 400, marginLeft: 50 }]}
              >
                {item.name}
              </Text>
              <Text
                style={[styles.cardText, { marginTop: 20, marginLeft: 50 }]}
              >
                Closest to Earth -
                {item.close_approach_data[0].close_approach_date_full}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Minimum Diameter (KM) -
                {item.estimated_diameter.kilometers.estimated_diameter_min}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Maximum Diameter (KM) -
                {item.estimated_diameter.kilometers.estimated_diameter_max}
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Velocity (KM/H) -
                {
                  item.close_approach_data[0].relative_velocity
                    .kilometers_per_hour
                }
              </Text>
              <Text style={[styles.cardText, { marginTop: 5, marginLeft: 50 }]}>
                Missing Earth by (KM) -
                {item.close_approach_data[0].miss_distance.kilometers}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  render() {
    if (Object.keys(this.state.meteors).length == 0) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading meteor Screen...</Text>
        </View>
      );
    } else {
      let meteor_arr = Object.keys(this.state.meteors).map((meteor_date) => {
        return this.state.meteors[meteor_date];
      });
      let meteors = [].concat.apply([], meteor_arr);
      meteors.forEach(function (element) {
        let diameter =
          (element.estimated_diameter.kilometers.estimated_diameter_min +
            element.estimated_diameter.kilometers.estimated_diameter_max) /
          2;
        let threatScore =
          (diameter / element.close_approach_data[0].miss_distance.kilometers) *
          1000000000;
        element.threatScore = threatScore;
      });
      meteors.sort(function (a, b) {
        return b.threatScore - a.threatScore;
      });
      meteors = meteors.slice(0, 5);

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <FlatList
            keyExtractor={this.keyExtractor}
            data={meteors}
            renderItem={this.renderItem}
            horizontal={true}
          />
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
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  titleBar: { flex: 0.15, justifyContent: "center", alignItems: "center" },
  titleText: { fontSize: 30, fontWeight: "bold", color: "white" },
  meteorContainer: { flex: 0.85 },
  listContainer: {
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    justifyContent: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderRadius: 10,
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "white",
  },
  cardText: { color: "white" },
  threatDetector: {
    height: 10,
    marginBottom: 10,
  },
  gifContainer: { justifyContent: "center", alignItems: "center", flex: 1 },
  meteorDataContainer: { justifyContent: "center", alignItems: "center" },
});
