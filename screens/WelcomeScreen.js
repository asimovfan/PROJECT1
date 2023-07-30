import axios from "axios";
import React from "react";

import { useContext, useEffect, useState } from "react";
import { ServerApiAddress } from "../util/ServerApi";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  FlatList,
  Alert,
} from "react-native";
import { AuthContext } from "../store/auth-context";
import OpenMaps from "./OpenMaps";
import * as Device from "expo-device";
import * as Network from "expo-network";
import NetInfo from "@react-native-community/netinfo";
import * as Linking from "expo-linking";

async function GetDataHook() {
  useEffect(() => {
    async function GetData() {
      const DutyDetails = await FetchData(token);
      console.log("Duty Details fetched on refresh:");
      console.log(DutyDetails);
      // setFetchedMesssage(DutyDetails);
    }
    GetData();
  }, []);
}
async function SendDeviceDetails(token, DeviceDetails, userid) {
  const backendurl = ServerApiAddress();
  console.log("Sending userid", userid);
  console.log("Sending Device details");
  //const response = "null";
  const url = backendurl + `/api/v1/mobile`;
  //const url = `https://23b1-223-190-94-140.ngrok-free.app/api/v1/mobile`;
  //const url = `https://dmsbackend.amprosystems.in/api/v1/mobile`;
  try {
    const response = await axios.post(
      url,
      {
        //connectionType: "abc",
        //deviceIp: "22",
        userId: userid,
        data: DeviceDetails,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("device details api response", response);
    return response;
  } catch (error) {
    console.log("Error Device details API:", error);
  }
}

async function FetchData(token) {
  const backendurl = ServerApiAddress();
  console.log("Duty Data req sent to server");
  const response = await axios.get(
    "https://lookbeforeubuybackend-default-rtdb.firebaseio.com/User1.json"
    //{ headers: { Authorization: `Bearer ${token}` } }
  );
  console.log(" \n\nUser Details received :\n");
  console.log(response.data, "\n\n");

  return response;
  //end of ESCORT Duty
}

function WelcomeScreen({ navigation }) {
  const [FetchedMesssage, setFetchedMesssage] = useState("empty");
  const [SelectedStation, setSelectedStation] = useState("empty");
  const [DutyStartEnd, setDutyStartEnd] = useState("empty");
  const [DutyId, setDutyId] = useState(0);
  const [UserPno, setUserPno] = useState(0);
  const authCtx = useContext(AuthContext);
  const token = authCtx.token;
  const fetchedpushtoken = authCtx.pushtoken;
  //const newArr = fetchedpushtoken.slice(23, 64);
  const [DeviceIPValue, setDeviceIPValue] = useState();
  const [DeviceConnectionType, setDeviceConnectionType] = useState();
  const [DeviceIsConnected, setDeviceIsConnected] = useState("empty");
  const [ConnectionDetails, setConnectionDetails] = useState("empty");
  const [Spaces, setSpaces] = useState("empty");
  const [Description, setDescription] = useState("empty");
  var userid = 2;
  //Alert.alert(newArr);
  let numberofspaces = 0;
  let tempListSpaces = new Array();
  let tempListDescription = new Array();
  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      async function GetData() {
        const DutyDetails = await FetchData(token);

        //setFetchedMesssage(DutyDetails);
        numberofspaces = DutyDetails.data.Number_of_Spaces;
        while (numberofspaces > 0) {
          if (DutyDetails.data.Spaces[numberofspaces] != null) {
            tempListSpaces = [
              ...tempListSpaces,
              DutyDetails.data.Spaces[numberofspaces],
            ];
          }
          if (DutyDetails.data.Description[numberofspaces] != null) {
            tempListDescription = [
              ...tempListDescription,
              DutyDetails.data.Description[numberofspaces],
            ];
          }
          numberofspaces = numberofspaces - 1;
        }
        setSpaces(tempListSpaces);
        setDescription(tempListDescription);
        console.log("\n\nURLS received are:\n");
        console.log(tempListSpaces);
        console.log("\n\n\n");
      }
      GetData();
    });

    return focusHandler;
  }, [navigation]);
  console.log("\n\n Constant URLS received are:\n");
  console.log(Description);
  console.log("\n\n\n");
  async function SendPushToken() {
    const response = await axios.put(
      "https://test-49947-default-rtdb.firebaseio.com/pushtoken.json?auth=" +
        token,
      fetchedpushtoken
    );
    console.log("Fetched push token from memory sent to server");
    console.log(fetchedpushtoken);
    return response;
  }

  //var DutyStationChosen = false;
  //console.log("Welcome page accessed");
  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "grey", marginHorizontal: 5 }}
      />
    );
  };
  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };

  const getItem = (name, index) => {
    //Alert.alert("Index Selected:", index);
    console.log("Index Selected:", index);
    Linking.openURL(Spaces[index]);

    setSelectedStation(name);
  };
  const getItem2 = (name) => {
    Alert.alert("Duty Selected:", name);
    setDutyStartEnd(name);
  };

  const renderGridItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => getItem(item, index)}
        style={styles.gridItem}
      >
        <Text style={styles.goalText}>{item}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.appContainer}>
      <View style={styles.listContainer}>
        <FlatList
          data={Description}
          renderItem={renderGridItem}
          keyExtractor={(item, index) => index.toString()}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <Text>No data found</Text>}
          numColumns={2} // Change this to the desired number of columns
        />
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    color: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  btn: {
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "#0893FC",
    padding: 5,
    borderRadius: 15,
    marginVertical: 10,
    //paddingHorizontal: -10,
    marginHorizontal: -15,
  },
  btn2: {
    /* width: 110,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
    borderRadius: 15,
    flexDirection: "row",
    marginBottom: 10,*/
    backgroundColor: "#4466ef",
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  buttonSpace: {
    width: 50, // Adjust the width as needed
  },
  buttontext: {
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    flexWrap: "wrap",
    flexGrow: 10,
    alignItems: "flex-start",
  },
  text: {
    color: "#000",
    fontSize: 17,
    fontWeight: "600",
    flexWrap: "wrap",
    flexGrow: 10,
    alignItems: "flex-start",
  },
  textlist: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 50,
    //alignItems: "stretch",
  },
  textlisthorizontal: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 3,
    //marginHorizontal: 5,
    //alignItems: "stretch",
  },
  textFaded: {
    color: "grey",
    fontSize: 25,

    fontWeight: "600",
  },
  selecttext: {
    color: "red",
    fontSize: 25,
    fontWeight: "600",
  },
  description: {
    fontSize: 18,
    // color: "gray",
    //textAlign: "center",
    //marginHorizontal: 20,
    //marginBottom: 50,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff"',
    alignItems: "center",
    justfyContent: "center",
  },

  appContainer: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    //alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 4,
    justifyContent: "space-evenly",
  },
  listContainer: {
    flex: 4,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  goalItem: {
    margin: 8,
    padding: 4,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  goalText: {
    fontSize: 16,
    color: "black",
  },
  gridItem: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "lightgray",
    height: 150,
    width: "50%",
  },
  separator: {
    height: 1,
    backgroundColor: "gray",
  },
});
