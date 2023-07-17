import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

import {
  Platform,
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import OpenMaps from "./OpenMaps";
//import { SafeAreaView, TouchableOpacity } from "react-native-web";
import { AuthContext } from "../store/auth-context";

import { getFormattedDateTime } from "../util/datetime";
import { ServerApiAddress } from "../util/ServerApi";

export default function GetCoordinates({ route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const backendurl = ServerApiAddress();
  // const [coordinatessent, setcoordinatessent] = useState(null);
  //const [currentStation, setcurrentStation] = useState(null);
  //const [locationObject, setlocationObject] = useState(null)
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  //const SelectedStation = route.params.SelectedStation;
  //console.log("Selected Station in Coordinates  Page:", SelectedStation);
  const ItemsForTransfer = route.params.ItemsForTransfer;
  /* console.log(
    "Selected Station in Coordinate  Page:",
    ItemsForTransfer.Stationname
  );*/
  const date = new Date();
  //console.log(" Date is:", getFormattedDateTime(date));
  var lat = 11.111111;
  var lng = 99.999999;
  //var latLng = 0;
  const navigation = useNavigation();

  async function SendCoordinates(token, location) {
    /*const response = await axios.put(
      "https://test-49947-default-rtdb.firebaseio.com/coordinates.json?auth=" +
        token,
      location
    );
    console.log("token value in getCoordinates", token);
    //let userStr = JSON.stringify(location);
    //let userStr = JSON.stringify(location);
    console.log("data being sent to server");
    console.log(location);*/
    //ngrock
    console.log("\n**************************\n");
    console.log("data being sent to server\n");
    console.log(location);
    console.log("\n**************************\n");
    const response = await axios.post(
      //"https://test-49947-default-rtdb.firebaseio.com/DutyDetails.json" //firebase

      backendurl + `/api/v1/coordinate`,
      //"https://sknpolicemetaverse.in/api/v1/coordinate",
      {
        //ddms data being sent
        userId: location.userId,
        dutyId: location.dutyId,
        locationName: location.locationName,
        latitude: location.latitude,
        longitude: location.longitude,
        createdAt: location.createdAt,
        //GRP data being sent
        /*station: location.station,
        lat: location.lat,
        long: location.long,
        accuracy: location.accuracy,
        userPno: location.userPno,
        dutyId: location.dutyId,
        createdAt: location.createdAt,*/
      },

      { headers: { Authorization: `Bearer ${token}` } }
    ); //ngrock

    //console.log("coordinate api response", response);
    return response;
  }
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          //console.log("Permission denied");
          //Alert.alert(" Permission to access location was denied");
          return;
        } else {
          console.log("*********************");
          console.log("Getting location");
          console.log("*********************");
          let location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
            accuracy: Location.Accuracy.High,
          });
          setLocation(location);
        }
      } catch (error) {
        //console.log("Error in getting location:", error);
        setErrorMsg(
          "Coordinates not sent.Go back to Welcome page and try again"
        );
      }
    })();
  }, []);

  let text = "इंतज़ार में..";
  let coordinateReceived = false;
  if (errorMsg) {
    text = errorMsg;
    coordinateReceived = true;
  } else if (location) {
    //text = JSON.stringify(location);
    text = "उपस्थिति अंकित की गई";
    coordinateReceived = true;
    //console.log("location data fetched:", location);
  }

  try {
    //parameters being sent with grp dms
    /*
    const locationObject = {
      //selectedStation: SelectedStation,
      station: ItemsForTransfer.Stationname,
      lat: location.coords.latitude,
      long: location.coords.longitude,
      accuracy: location.coords.accuracy,
      userPno: ItemsForTransfer.UserPno,
      dutyId: ItemsForTransfer.DutyId,
      createdAt: getFormattedDateTime(date),
    };*/
    //parameters being sent with ddms
    const locationObject = {
      userId: ItemsForTransfer.userId,
      dutyId: ItemsForTransfer.dutyId,
      locationName: ItemsForTransfer.locationName,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      createdAt: getFormattedDateTime(date),
    };

    //console.log("token value in SendCoordinates", token);
    //console.log("Data to be sent to backend  ", locationObject);
    if (location) {
      SendCoordinates(token, locationObject);
    }
  } catch (error) {
    console.log("Error in sending data to server", error);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      {coordinateReceived === true ? (
        <TouchableOpacity
          onPress={() => navigation.replace("Welcome")}
          style={styles.btn2}
        >
          <Text style={styles.text}>मुखपृष्ठ पर वापस</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.greytext}>मुखपृष्ठ पर वापस</Text>
      )}
    </View>
  );
}
/* */

/*{(() => {
        if (coordinatessent) {
          //console.log("Successful Biometric ", IsBiometricAuthenticated);
          {
            navigation.navigate("Welcome");
          }
        } else {
          Alert.alert(" error in fetching coordinate data");
          //text = "Error: Allow Location permissions";
          //console.log(" error in fetching coordinate data");
        }
      })()} */
const styles = StyleSheet.create({
  btn: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#0893FC",
    padding: 10,
    borderRadius: 5,
  },
  btn2: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    fontSize: 50,
    fontWeight: "400",
    marginVertical: 30,
    textAlign: "center",
  },
  image: {
    width: 400,
    height: 461,
  },
  text: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "500",
  },
  greytext: {
    color: "grey",
    fontSize: 20,
    fontWeight: "500",
  },
  title: {
    fontSize: 50,
    fontWeight: "400",
    marginVertical: 30,
    textAlign: "center",
  },
  description: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  paragraph: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "#900505", //#f9beda
    alignItems: "center",
    justifyContent: "center",
  },
});
