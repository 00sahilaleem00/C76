import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  StyleSheet,
  Header,
  Alert,
} from "react-native";
import db from "../config.js";
import firebase from "firebase";
import LottieView from "lottie-react-native";

export default class SantaAnimation extends Component {
  render() {
    return (
      <LottieView
        source={require("../assets/4887-book.json")}
        style={{ width: "20%", height: "20%" }}
        autoPlay
        loop
      />
    );
  }
}
