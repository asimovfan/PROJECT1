import { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import FlatButton from "../ui/FlatButton";
import AuthForm from "./AuthForm";
import EmergencyCall from "../../screens/EmergencyCall";
import { Colors } from "../../constants/styles";

import * as Linking from "expo-linking";

import React from "react";

//import Icon from "react-native-vector-icons/FontAwesome";

function AuthContent({ isLogin, onAuthenticate }) {
  const navigation = useNavigation();
  const url = `https://amprosystems.in`;

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  function switchAuthModeHandler() {
    if (isLogin) {
      navigation.replace("साइन अप करें");
    } else {
      navigation.replace("Login");
    }
  }

  function submitHandler(credentials) {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.length > 1;
    const passwordIsValid = password.length > 1;
    const emailsAreEqual = email === email;
    const passwordsAreEqual = password === confirmPassword;

    if (
      !emailIsValid ||
      !passwordIsValid ||
      (!isLogin && (!emailsAreEqual || !passwordsAreEqual))
    ) {
      Alert.alert("Error", "Entered Email and Password Don't match");
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }

    console.log("change credentials received in AuthContent:");
    console.log("P.No:", email);
    console.log("old password:", confirmEmail);
    console.log("new password:", password);
    onAuthenticate({ email, password, confirmEmail });
  }

  return (
    <View>
      <View style={styles.authContent}>
        <AuthForm
          isLogin={isLogin}
          onSubmit={submitHandler}
          credentialsInvalid={credentialsInvalid}
        />
        <View style={styles.textlink}>
          <FlatButton onPress={EmergencyCall}>{"Contact Us"}</FlatButton>
        </View>
      </View>
      <View>
        <Text style={styles.text}>
          {isLogin ? "© 2023 - VARAITECHSOLUTIONS" : ""}
        </Text>
        <Text style={styles.text}>{isLogin ? "All Rights Reserved" : ""}</Text>
      </View>
    </View>
  );
}

export default AuthContent;

const styles = StyleSheet.create({
  authContent: {
    marginTop: 30,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  buttons: {
    marginTop: 8,
    color: "#000",
  },
  imageContainer: {
    width: 160,
    height: 160,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: Colors.primary800,
    //overflow: "hidden",
    margin: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  image: {
    width: "180%",
    height: "180%",
    marginLeft: -60,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    color: "#000",
    fontSize: 20,
    fontWeight: "600",
    flexWrap: "wrap",
    flexGrow: 10,
    alignSelf: "center",
  },
  textlink: {
    marginTop: 10,
    color: "#a0a",
    fontSize: 20,
    fontWeight: "600",
    flexWrap: "wrap",
    flexGrow: 10,
    alignSelf: "center",
  },
});
